import React from "react";
import { Timeline } from "react-twitter-widgets";
import useAuth from "../../hooks/useAuth";

const TwitterTimeline = () => {
    const { auth, setAuth } = useAuth();

    return (
        <Timeline
            dataSource={{
                sourceType: "profile",
                screenName: auth.twitterHandle
                    ? auth.twitterHandle
                    : "GordonRamsay",
            }}
            options={{
                username: auth.twitterHandle,
                height: "600",
            }}
        />
    );
};

export default TwitterTimeline;
