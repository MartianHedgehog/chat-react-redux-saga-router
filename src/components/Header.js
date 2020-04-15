import React from 'react';

import '../assets/css/argon-design-system-react.css';
import { Container } from 'reactstrap';

import './Header.css';

const Header = () => {
  return (
    <div className="header position-relative">
      <section className="section section-lg section-shaped">
        <div className="shape shape-style-1 shape-default">
          <span className="span-150" />
          <span className="span-50" />
          <span className="span-50" />
          <span className="span-75" />
          <span className="span-100" />
          <span className="span-75" />
          <span className="span-50" />
          <span className="span-100" />
          <span className="span-50" />
          <span className="span-100" />
          <Container className="header py-lg-md d-flex">
            <h1 className="h1 display-3 text-white">AMAZING CHAT</h1>
          </Container>
        </div>
        <div className="separator separator-bottom separator-skew zindex-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon className="fill-white" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </section>
    </div>
  );
};

export default Header;
