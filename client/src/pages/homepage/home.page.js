import React from "react";
import "./home.styles.css";
import Logo from "../../assets/logo.png";
/*import Video from '../../assets/nashvilleflyover.mp4'

import CustomButton from '../../components/custom-button/custom-buttom.component'
import ContactForm from '../../components/contact-form/contact-form.component'
import Gallery from '../../components/gallery/gallery.component'
*/
import { Link as Anchor } from "react-scroll";

const HomePage = () => {
  const scrollOffset = -1 * window.innerHeight * 0.1;

  return (
    <div className="homepage">
      <div className="page" id="home">
        <div className="header">
          <img src={Logo} alt="Logo" width={100} height={100}></img>
          <h1>Recipedia</h1>
        </div>
        <h2>
          Join the fastest growing hub to upload, organize, and share your
          recipes{" "}
        </h2>
        <div className="btn-grp">
          <button id="main_btn">Register Now!</button>
          <button id="secondary_btn">Sign In </button>
        </div>

        <br />
      </div>
      <div className="page" id="upload">
        <div className="about-text">
          <h3>Upload Recipes Online or Manually </h3>
          <p>
            Use our patented Recipe Parser to automatically scrape information
            from your favorite websites or transcribe grandmothers hand-written
            notecards from the motherland
          </p>
        </div>
      </div>
      <div className="page" id="upload">
        <div className="about-text">
          <h3>Organize and Get Smart Suggestions</h3>
          <p>
            Have all of your week-night meals in a single spot and we’ll provide
            similar recipes using Machine Learning from other users{" "}
          </p>
        </div>
      </div>
      <div className="page" id="upload">
        <div className="about-text">
          <h3>Share Your Favorites With Friends</h3>
          <p>
            Post, Comment, and Re-post recipes with our Social Feed to see what
            your friends are cooking and put them onto your favroites!
          </p>
        </div>
      </div>
      <div className="btn-grp">
        <button id="main_btn">Register Now!</button>
      </div>

      <div className="page" id="contact"></div>
    </div>
  );
};

export default HomePage;
