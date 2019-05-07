import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-i18next';

import style from './style.less';

const NavBar = () => (
  <I18n ns="common">
    <div>
      <ul>
        <li>
          <a>
            <span>close menu</span>
            <span className="fas fa-times" />
          </a>
        </li>
        <li>
          <a>
            <span>Login/ Create Account</span>
            <span className="fas fa-angle-right" />
          </a>
        </li>
        <li>
          <a>
            <span>Language</span>
            <span className="fas fa-angle-right" />
          </a>
        </li>
        <li>
          <a>Currency</a>
        </li>
        <li>
          <a>Cities</a>
        </li>
        <li>
          <a>Discover</a>
        </li>
        <li>
          <a>Lifestyle blog</a>
        </li>
        <li>
          <a>About Us</a>
        </li>
        <li>
          <a>Contact Us</a>
        </li>
      </ul>
    </div>
  </I18n>
);

class Header extends Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);

    this.state = {
      clickSearch: false,
      collapse: false,
    };
  }

  search = () => {
    this.textInput.focus();
    this.setState({
      clickSearch: true,
    });
  };

  collapse = () => {
    this.setState({
      collapse: !this.state.collapse,
    });
  };

  render() {
    const logoTextStyle = {
      cls1: { fill: '#22bd81' },
      cls2: { fill: '#353435' },
    };
    const { currencies } = this.props;
    return (
      <header className={style.header}>
        <nav>
          <div className={style.logo_container}>
            <a alt="logo" to="/">
              <svg
                className={style.logo_image}
                data-name="Layer 1"
                id="Layer_2"
                viewBox="0 0 38.8 33.91"
                width="200px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="cls-1"
                  d="M33.81,20.22c.68-.85,6.6-8.36,4.57-12.62C37.54,5.85,35.66,5,32.8,5a11.54,11.54,0,0,0-3.21.49A16.91,16.91,0,0,0,17.15,0h-.23A17,17,0,1,0,33.78,20.24ZM10.7,19.46,17.07,4.59,19.81,11A86.91,86.91,0,0,0,10.7,19.46ZM22,9.33,19.27,2.86A14.21,14.21,0,0,1,26.83,6.5,32.58,32.58,0,0,0,22,9.33ZM5.39,25A14.25,14.25,0,0,1,14.87,2.88ZM20.91,13.54l5.9,13.77a.36.36,0,0,0,0,.09,14.25,14.25,0,0,1-19.46-.06A104.07,104.07,0,0,1,20.91,13.54Zm2.2-1.7A27.74,27.74,0,0,1,28.69,8.6a14.19,14.19,0,0,1,.12,16.54ZM31.4,7.78a8.58,8.58,0,0,1,1.4-.13c1.73,0,2.79.38,3.14,1.11.62,1.29-.47,4-1.93,6.42A16.76,16.76,0,0,0,31.4,7.78Z"
                  style={logoTextStyle.cls1}
                />
              </svg>
            </a>
          </div>
          <div className={style.search}>
            <div className={style.form_group}>
              <input
                ref={input => {
                  this.textInput = input;
                }}
                className={!this.state.clickSearch ? style.hide : ''}
                placeholder="Search here"
                type="text"
              />
              <div className={style.search_btn}>
                <button onClick={this.search} type="button">
                  <span className={`fas fa-search ${style.search}`} />
                </button>
                <button type="button">
                  <span className={`fas fa-microphone ${style.microphone}`} />
                </button>
              </div>
            </div>
          </div>
          <div className={style.nav_collapse}>
            <button onClick={this.collapse} type="button">
              <span className="fas fa-bars" />
            </button>
            <div className={`${style.navbar} ${this.state.collapse ? style.collapse : ''}`}>
              <NavBar currencies={currencies} />
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object),
};

Header.defaultProps = {
  currencies: [],
};

export default Header;
