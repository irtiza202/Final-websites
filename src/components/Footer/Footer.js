import React from "react";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

export default function Footer() {
  return (
    <footer className="footer mt-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-3 d-flex align-items-center">
            {/* Image removed */}
          </div>
          <div className="col-md-9">
            <div className="row justify-content-center">
              <div className="col-md-4 mb-4 text-center">
                <h5>About Us</h5>
                <p>
                  Welcome to our world of stylish elegance! At Fashion Store, we believe that a bag is more than just an accessory; it’s an essential part of your identity.
                </p>
              </div>
              <div className="col-md-4 mb-4 text-center">
                <h5>Quick Links</h5>
                <ul className="list-unstyled">
                  <li><a href="/">Home</a></li>
                  <li><a href="/">Products</a></li>
                  <li><a href="/">About Us</a></li>
                  <li><a href="/">Contact Us</a></li>
                </ul>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12 text-center">
                <a href="/" className="social-icon"><FacebookOutlined /></a>
                <a href="/" className="social-icon"><TwitterOutlined /></a>
                <a href="/" className="social-icon"><InstagramOutlined /></a>
                <a href="/" className="social-icon"><LinkedinOutlined /></a>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12 text-center mt-3">
                <p>&copy;All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
