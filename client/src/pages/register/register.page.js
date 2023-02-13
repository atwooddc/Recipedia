import React from "react";
import "./register.styles.css";
import Logo from "../../assets/download.png";
/*import Video from '../../assets/nashvilleflyover.mp4'

import CustomButton from '../../components/custom-button/custom-buttom.component'
import ContactForm from '../../components/contact-form/contact-form.component'
import Gallery from '../../components/gallery/gallery.component'
*/
import { Link as Anchor } from "react-scroll";

const Register = () => {
  const scrollOffset = -1 * window.innerHeight * 0.1;

  return (
    <div className="homepage">
      <div className="page" id="home">
        <div className="header">
          <img src={Logo} alt="Logo" width={100} height={100}></img>
          <h1>Recipedia</h1>
        </div>
        <h2>Welcome to your new recipe box, Chef</h2>
        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
        </form>{" "}
        <div className="btn-grp">
          <button id="main_btn">Register Now!</button>
        </div>
        <br />
      </div>

      <div className="page" id="contact"></div>
    </div>
  );
};

export default Register;
