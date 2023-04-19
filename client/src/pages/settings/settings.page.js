import { React, useState, useEffect } from "react";
import "./settings.styles.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import useAuth from "../../hooks/useAuth";
import Alert from "@mui/material/Alert";
import bcrypt from "bcryptjs";

import { addBaseUrlClient } from "../../utils/getBaseClientUrl";

const SettingsPage = () => {
    const { auth, setAuth } = useAuth();
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        let timer;
        if (showSuccess) {
            timer = setTimeout(() => {
                setShowSuccess(false);
                setSuccessMessage("");
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [showSuccess]);

    useEffect(() => {
        let timer;
        if (showError) {
            timer = setTimeout(() => {
                setShowError(false);
                setErrorMessage("");
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [showError]);

    const handleBasicsSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let json_data = JSON.stringify({
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            email: data.get("email"),
        });
        console.log(json_data);
        try {
            // Send data to the backend via PUT
            fetch(addBaseUrlClient("users"), {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: json_data, // body data type must match "Content-Type" header
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    const user = data;
                    setAuth(user);
                    setShowSuccess(true);
                    setSuccessMessage("Basic Information update successful!");
                })
                .catch((error) => {
                    console.error(error);
                    setShowError(true);
                    setErrorMessage(error);
                });
        } catch (err) {
            console.error(err);
            setShowError(true);
            setErrorMessage(err);
        }
    };

    const handlePasswordSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let json_string = JSON.stringify({
            oldPassword: data.get("old-password"),
            newPassword: data.get("new-password"),
            confirmPassword: data.get("confirm-password"),
        });
        console.log(json_string);
        let data_obj = JSON.parse(json_string);
        //console.log(data_obj);

        //console.log(id);
        //console.log(data_obj.oldPassword, auth.password);

        const isMatch = await bcrypt.compare(
            data_obj.oldPassword,
            auth.password
        );
        if (
            data_obj.oldPassword.trim() === "" ||
            data_obj.newPassword.trim() === "" ||
            data_obj.oldPassword.trim() === ""
        ) {
            setShowError(true);
            setErrorMessage("Password cannot be blank");
            return;
        }
        if (!isMatch) {
            setShowError(true);
            setErrorMessage("Old password is incorrect");
            return;
        }
        if (data_obj.confirmPassword !== data_obj.newPassword) {
            setShowError(true);
            setErrorMessage("Passwords do not match");
            return;
        } else if (data_obj.oldPassword === data_obj.newPassword) {
            setShowError(true);
            setErrorMessage("Cannot use the same password again");
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.get("new-password"), salt);
        let relevant_data = JSON.stringify({
            password: hash,
        });
        try {
            // Send data to the backend via PUT
            fetch(addBaseUrlClient("users"), {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: relevant_data, // body data type must match "Content-Type" header
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    const user = data;
                    setAuth(user);
                    setShowSuccess(true);
                    setSuccessMessage("Password changed successfully!");
                })
                .catch((error) => {
                    console.error(error);
                    setShowError(true);
                    setErrorMessage(error);
                });
            //TODO ADD A REFRESH HERE?
        } catch (err) {
            console.error(err);
            setShowError(true);
            setErrorMessage(err);
        }
    };

    const handleAdvancedSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let json_data = JSON.stringify({
            location: data.get("location"),
            birthday: data.get("birthday"),
            phoneNumber: data.get("phone-number"),
            imgUrl: data.get("imgUrl"),
            bio: data.get("bio"),
            twitterHandle: data.get("twitterHandle"),
        });
        console.log(json_data);

        try {
            // Send data to the backend via PUT
            fetch(addBaseUrlClient("users"), {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: json_data, // body data type must match "Content-Type" header
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    const user = data;
                    setAuth(user);
                    setShowSuccess(true);
                    setSuccessMessage(
                        "Advanced information updated successfully!"
                    );
                })
                .catch((error) => {
                    console.error(error);
                    setShowError(true);
                    setErrorMessage(error);
                });
        } catch (err) {
            console.error(err);
            setShowError(true);
            setErrorMessage(err);
        }
    };

    const handleDeleteAccount = (event) => {
        event.preventDefault();
        const confirmed = window.confirm(
            "Are you sure you want to delete your account? Your information will be lost forever"
        );
        if (confirmed) {
            const id = auth._id;
            console.log(id);
            try {
                // Send data to the backend via PUT
                fetch(addBaseUrlClient(`users/${id}`), {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                })
                    .then((response) => {
                        console.log(response);
                        console.log("DELETED");
                        setAuth(undefined);
                        window.location.href = addBaseUrlClient("auth/logout");
                    })
                    .catch((error) => {
                        console.error(error);
                        setShowError(true);
                        setErrorMessage(error);
                    });
            } catch (err) {
                console.error(err);
                setShowError(true);
                setErrorMessage(err);
            }
        }
    };

    //TODO TEST AFTER RECIPES ARE PROPERLY ADDED
    const handleResetAccount = (event) => {
        event.preventDefault();
        const confirmed = window.confirm(
            "Are you sure you want to reset your account? Your information can always be updated again"
        );
        if (confirmed) {
            try {
                // Send data to the backend via PUT
                fetch(addBaseUrlClient("users/reset"), {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        const user = data;
                        setAuth(user);
                        setShowSuccess(true);
                        setSuccessMessage("Account Reset successfully!");
                    })
                    .catch((error) => {
                        console.error(error);
                        setShowError(true);
                        setErrorMessage(error);
                    });
            } catch (err) {
                console.error(err);
                setShowError(true);
                setErrorMessage(err);
            }
        }
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: "#F26969",
            },
        },
    });

    var time = new Date().getHours();
    var greeting =
        "Good " + (time < 12 ? "morning" : time < 18 ? "afternoon" : "evening");

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />

                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            {/* Header */}
                            <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    <Avatar
                                        alt={auth.firstName}
                                        src={auth.imgUrl}
                                        sx={{ width: 80, height: 80 }}
                                    />
                                    <Box
                                        sx={{
                                            p: 1,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Typography
                                            variant="h5"
                                            color="common.black"
                                            fontWeight="bold"
                                        >
                                            {greeting}, {auth.firstName}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            color="#909090"
                                        >
                                            Member since 2023
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            {showSuccess && (
                                <Alert
                                    sx={{ ml: 10, m: 2, width: "95%" }}
                                    severity="success"
                                >
                                    {successMessage}
                                </Alert>
                            )}
                            {showError && (
                                <Alert
                                    sx={{ ml: 10, m: 2, width: "95%" }}
                                    severity="error"
                                >
                                    {errorMessage}
                                </Alert>
                            )}

                            {/* The Basics */}
                            <Grid item xs={12} md={8} lg={6}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        color="common.black"
                                        fontWeight="bold"
                                    >
                                        {" "}
                                        The Basics
                                    </Typography>
                                    <Box
                                        component="form"
                                        noValidate
                                        onSubmit={handleBasicsSubmit}
                                        sx={{ mt: 3 }}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    autoComplete="given-name"
                                                    name="firstName"
                                                    fullWidth
                                                    id="firstName"
                                                    label="First Name"
                                                    autoFocus
                                                    defaultValue={
                                                        auth.firstName
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    id="lastName"
                                                    label="Last Name"
                                                    name="lastName"
                                                    autoComplete="family-name"
                                                    defaultValue={auth.lastName}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    id="email"
                                                    label="Email Address"
                                                    name="email"
                                                    autoComplete="email"
                                                    defaultValue={auth.email}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Box
                                            m={1}
                                            //margin
                                            display="flex"
                                            justifyContent="flex-end"
                                            alignItems="flex-end"
                                        >
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                Save Changes
                                            </Button>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            {/* Reset Password */}
                            <Grid item xs={12} md={8} lg={6}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        color="common.black"
                                        fontWeight="bold"
                                    >
                                        {" "}
                                        Reset Password{" "}
                                    </Typography>
                                    <Box
                                        component="form"
                                        noValidate
                                        onSubmit={handlePasswordSubmit}
                                        sx={{ mt: 3 }}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="old-password"
                                                    label="Old Password"
                                                    type="password"
                                                    id="old-password"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="new-password"
                                                    label="New Password (6 characters)"
                                                    type="password"
                                                    id="new-password"
                                                    autoComplete="new-password"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="confirm-password"
                                                    label="Confirm Password"
                                                    type="password"
                                                    id="confirm-password"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Box
                                            m={1}
                                            //margin
                                            display="flex"
                                            justifyContent="flex-end"
                                            alignItems="flex-end"
                                        >
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                Save Changes
                                            </Button>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            {/* Advanced */}
                            <Grid item xs={12} md={8} lg={6}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        color="common.black"
                                        fontWeight="bold"
                                    >
                                        {" "}
                                        Advanced{" "}
                                    </Typography>
                                    <Box
                                        component="form"
                                        noValidate
                                        onSubmit={handleAdvancedSubmit}
                                        sx={{ mt: 3 }}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="location"
                                                    label="Location"
                                                    type="location"
                                                    id="location"
                                                    defaultValue={auth.location}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="birthday"
                                                    label="Birthday"
                                                    type="birthday"
                                                    id="birthday"
                                                    defaultValue={auth.birthday}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="phone-number"
                                                    label="Phone Number"
                                                    type="phone-number"
                                                    id="phone-nunmber"
                                                    defaultValue={
                                                        auth.phoneNumber
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="imgUrl"
                                                    label="Profile Image URL"
                                                    type="imgUrl"
                                                    id="imgUrl"
                                                    defaultValue={auth.imgUrl}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="bio"
                                                    label="Bio"
                                                    type="bio"
                                                    id="bio"
                                                    defaultValue={auth.bio}
                                                    multiline
                                                    rows={4}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="twitterHandle"
                                                    label="Twitter Handle"
                                                    type="twitterHandle"
                                                    id="twitterHandle"
                                                    defaultValue={
                                                        auth.twitterHandle
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                        <Box
                                            m={1}
                                            //margin
                                            display="flex"
                                            justifyContent="flex-end"
                                            alignItems="flex-end"
                                        >
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                Save Changes
                                            </Button>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            {/* Account*/}
                            <Grid item xs={12} md={8} lg={6}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        color="common.black"
                                        fontWeight="bold"
                                    >
                                        {" "}
                                        Account{" "}
                                    </Typography>

                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography
                                                variant="subtitle2"
                                                color="common.black"
                                                fontWeight="bold"
                                            >
                                                {" "}
                                                Reset Account{" "}
                                            </Typography>
                                            <Box
                                                m={1}
                                                //margin
                                                display="flex"
                                                justifyContent="flex-start"
                                                alignItems="flex-start"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    color="common.black"
                                                >
                                                    {" "}
                                                    Delete all current recipes
                                                    and social information while
                                                    maintaining basic account{" "}
                                                </Typography>
                                            </Box>
                                            <Box
                                                m={1}
                                                //margin
                                                display="flex"
                                                justifyContent="flex-end"
                                                alignItems="flex-end"
                                            >
                                                <Button
                                                    type="submit"
                                                    variant="outlined"
                                                    sx={{ mt: 3, mb: 2 }}
                                                    onClick={handleResetAccount}
                                                >
                                                    Reset Account
                                                </Button>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography
                                                variant="subtitle2"
                                                color="common.black"
                                                fontWeight="bold"
                                            >
                                                {" "}
                                                Delete Account{" "}
                                            </Typography>
                                            <Box
                                                m={1}
                                                //margin
                                                display="flex"
                                                justifyContent="flex-start"
                                                alignItems="flex-start"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    color="common.black"
                                                >
                                                    {" "}
                                                    Deletes all history, removes
                                                    email and account records
                                                    from our application{" "}
                                                </Typography>
                                            </Box>
                                            <Box
                                                m={1}
                                                //margin
                                                display="flex"
                                                justifyContent="flex-end"
                                                alignItems="flex-end"
                                            >
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="error"
                                                    sx={{ mt: 3, mb: 2 }}
                                                    onClick={
                                                        handleDeleteAccount
                                                    }
                                                >
                                                    Delete Account
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default SettingsPage;
