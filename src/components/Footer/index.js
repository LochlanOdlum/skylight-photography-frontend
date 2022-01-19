import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer-content'>
        <div className='footer-content-left'>
          <img src='/images/logo.png' alt='skylight-photography-logo' />
          <div className='footer-left-text'>
            It is a long established fact that a reader will be distracted by the readable content
          </div>
          <div className='footer-left-logos'>
            <img src='/images/linked-in-logo-footer.png' alt='linked-in-logo' />
            <img src='/images/twitter-logo-footer.png' alt='twitter-logo' />
            <img src='/images/facebook-logo-footer.png' alt='facebook-logo' />
          </div>
        </div>
        <div className='footer-content-right'>
          <div className='footer-right-column'>
            <div className='footer-right-header'>About</div>
            <Link className='footer-right-column-subtext' to='/'>
              Home
            </Link>
            <Link className='footer-right-column-subtext' to='/shop'>
              Shop
            </Link>
          </div>
          <div className='footer-right-column'>
            <div className='footer-right-header'>Information</div>
            <Link to='/myaccount' className='footer-right-column-subtext'>
              Account
            </Link>
            <Link to='/myphotos' className='footer-right-column-subtext'>
              My Photos
            </Link>
            <div className='footer-right-column-subtext'>Newsletter</div>
          </div>
          <div className='footer-right-column'>
            <div className='footer-right-header'>Get In Touch</div>
            <div className='get-in-touch-row footer-right-column-subtext'>
              <div>Telephone:</div>
              <div className='get-in-touch-value'>07585 952895</div>
            </div>
            <div className='get-in-touch-row footer-right-column-subtext'>
              <div>E-mail:</div>
              <div className='get-in-touch-value'>skylightphotography@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
      <div className='footer-copyright'>© 2021 All Rights Reserved</div>
    </div>
  );
};

export default Footer;
