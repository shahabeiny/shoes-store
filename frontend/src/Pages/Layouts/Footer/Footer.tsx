import React from "react";
import { BsInstagram, BsYoutube, BsTwitter } from "react-icons/bs";
import { ImFacebook } from "react-icons/im";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className={`footer`}>
      <div className="container">
        <div className="footer__wrapper">
          <p className="footer__copy-right">
            {" "}
            © 2023 - تمام حقوق متعلق به فروشگاه شهاب است
          </p>
          <div className="social">
            <a href="#" className="social__link">
              <ImFacebook className="social__icon" />
            </a>
            <a href="#" className="social__link">
              <BsTwitter className="social__icon" />
            </a>
            <a href="#" className="social__link">
              <BsInstagram className="social__icon" />
            </a>
            <a href="#" className="social__link">
              <BsYoutube className="social__icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
