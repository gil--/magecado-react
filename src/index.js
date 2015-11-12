import '../css/main.css';
import React from 'react';
import { render } from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, Link } from 'react-router';

//import { App } from './App';

//render(<App />, document.getElementById('root'));

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Homepage
  @use <Homepage/>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var Homepage = React.createClass({

  render : function() {
    return (
        <div>
          <Header/>
        </div>
    )
  }
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  GLOBAL Site Header
  @use <Header/>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var Header = React.createClass({

  render: function() {
    return (
      <header className="header">
        <div className="wrapper">
          <div className="header__col header__menu-toggle">
            = Menu
          </div>
          <HeaderLogo beforeText="Mage" afterText="Cado" />
          <ul className="header__col header__user">
            <li>
              <a href="">+ Submit Snippet</a>
            </li>
          </ul>
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
      <div className="header__col header__logo">
        <a href="/">
          <span className="header__logo__mage">{this.props.beforeText}</span>

          <svg width="84px" height="132px" viewBox="0 0 84 132">
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
                  <path d="M41.6875,128.876953 C63.2266052,128.876953 81,110.433356 81,78.953125 C81,47.4728943 61.0625427,3 39.5234375,3 C17.9843323,3 3,47.4728943 3,78.953125 C3,110.433356 20.1483948,128.876953 41.6875,128.876953 Z" id="Oval-1" stroke="#42B983" strokeWidth="6"></path>
                  <path d="M43.8452148,104 C52.9579132,104 56.2133789,96.6126984 56.2133789,87.5 C56.2133789,78.3873016 52.9579132,71 43.8452148,71 C34.7325165,71 32,78.3873016 32,87.5 C32,96.6126984 34.7325165,104 43.8452148,104 Z" id="Oval-2"></path>
                  <circle id="Oval-3" fill="#42B983" cx="25" cy="55" r="7"></circle>
                  <circle id="Oval-4" fill="#42B983" cx="59" cy="50" r="7"></circle>
                  <path d="M42,108.823097 C55.8071187,108.823097 67,92.7881859 67,82.2947756 C67,71.8013654 55.8071187,83.8377444 42,83.8377444 C35.5176647,83.8377444 17,76.7279402 17,82.2947756 C17,92.7881859 28.1928813,108.823097 42,108.823097 Z" id="Oval-5" fill="#EF682F"></path>
              </g>
          </svg>
          <span className="header__logo__cado">{this.props.afterText}</span>
        </a>
      </div>
    )
  }
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Snippet
  @use <Snippet/>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var Snippet = React.createClass({

  render :  function() {
    return (
      <div>Snippet here...</div>
    )
  }
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  NotFound (404)
  @use <NotFound/>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var NotFound = React.createClass({

  render : function() {
    return <div>Opps. Page not found.</div>
  }
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ROUTES
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={Homepage}/>
    <Route path="/snippet/:snippetId" component={Snippet}/>
    <Route path="*" component={NotFound}/>
  </Router>
)

render(routes, document.getElementById('root'));
