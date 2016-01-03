import React from 'react';
import { render } from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, Link, IndexRoute, IndexLink} from 'react-router';
import InlineSvg from 'svg-inline-react';

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
              <li className="link--submit"><Link to={'/submit'}>+ Submit Snippet</Link></li>
              <li className="link--login"><a href="#">Login with Github</a></li>
            </ul>
          </nav>
        </div>
      </header>
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
