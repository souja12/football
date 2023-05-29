import React from 'react';
import './App.css';

const Footer = () => {
  return (
    <div>
      <footer className="footer-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="widget mb-3">
                <h3>News</h3>
                <ul className="list-unstyled links">
                  <li>All</li>
                  <li>Club News</li>
                  <li>Media Center</li>
                  <li>Video</li>
                  <li>RSS</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="widget mb-3">
                <h3>Tickets</h3>
                <ul className="list-unstyled links">
                  <li>Online Ticket</li>
                  <li>Payment and Prices</li>
                  <li>Contact &amp; Booking</li>
                  <li>Tickets</li>
                  <li>Coupon</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="widget mb-3">
                <h3>Matches</h3>
                <ul className="list-unstyled links">
                  <li>Standings</li>
                  <li>World Cup</li>
                  <li>La Lega</li>
                  <li>Hyper Cup</li>
                  <li>World League</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="widget mb-3">
                <h3>Social</h3>
                <ul className="list-unstyled links">
                  <li>Twitter</li>
                  <li>Facebook</li>
                  <li>Instagram</li>
                  <li>Youtube</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row text-center">
            <div className="col-md-12">
              <div className="pt-5">
                <p>
                  {' '}
                  &copy;
                  <script>{`document.write(new Date().getFullYear());`}</script> All rights reserved | This template is
                  made with <i className="icon-heart" aria-hidden="true"></i> by{' '}
                  <span>Colorlib</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
