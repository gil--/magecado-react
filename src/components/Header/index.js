import React from 'react';
import { render } from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, Link, IndexRoute, IndexLink} from 'react-router';
import InlineSvg from 'svg-inline-react';

// Components
import AddSnippet from '../AddSnippet';

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  GLOBAL Site Header
  @use <Header/>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var Header = React.createClass({
  render: function() {
    return (
      <header className="header">
        <div className="wrapper">
          <HeaderLogo beforeText="Mage" afterText="Cado" />
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li><a href="#">Login</a></li>
              <li><a href="#" className="link--register">Create Account</a></li>
            </ul>
          </nav>
        </div>
      </header>
      // <header className="header">
      //   <div className="wrapper">
      //     <div className="header__col header__menu-toggle">
      //       <svg className="nc-icon glyph" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16">
      //         <g>
      //           <path data-color="color-2" fill="#b5b5b5" d="M1,9h7c0.6,0,1-0.4,1-1S8.6,7,8,7H1C0.4,7,0,7.4,0,8S0.4,9,1,9z"></path>
      //           <path fill="#b5b5b5" d="M15,1H1C0.4,1,0,1.4,0,2s0.4,1,1,1h14c0.6,0,1-0.4,1-1S15.6,1,15,1z"></path>
      //           <path fill="#b5b5b5" d="M15,13H1c-0.6,0-1,0.4-1,1s0.4,1,1,1h14c0.6,0,1-0.4,1-1S15.6,13,15,13z"></path>
      //         </g>
      //       </svg>
      //       <span className="visuallyhidden">Menu</span>
      //     </div>
      //     <HeaderLogo beforeText="Mage" afterText="Cado" />
      //     <ul className="header__col header__user">
      //       <li>
      //         <button className="button">
      //           <svg className="nc-icon glyph" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24">
      //             <g>
      //               <path fill="#b5b5b5" d="M22,11h-9V2c0-0.6-0.4-1-1-1s-1,0.4-1,1v9H2c-0.6,0-1,0.4-1,1s0.4,1,1,1h9v9c0,0.6,0.4,1,1,1s1-0.4,1-1v-9h9 c0.6,0,1-0.4,1-1S22.6,11,22,11z"></path>
      //             </g>
      //           </svg>
      //           Submit Snippet
      //         </button>
      //       </li>
      //     </ul>
      //   </div>
      //
      //   <AddSnippet addSnippet={this.props.addSnippet}/>
      // </header>
    )
  }
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  HEADER:: Logo + Title
  @use <HeaderLogo/>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var HeaderLogo = React.createClass({
  render :  function() {
    return (
      <div className="header__logo">
        <IndexLink to="/">
          <span className="header__logo__mage">{this.props.beforeText}</span>
          <InlineSvg
            element="span"
            src={require('!svg-inline!./images/logo.svg')}
          />
          <span className="header__logo__cado">{this.props.afterText}</span>
        </IndexLink>
      </div>
    )
  }
});

export default Header;
