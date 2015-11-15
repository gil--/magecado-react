import '../css/main.css';
import React from 'react';
import { render } from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, Link } from 'react-router';

import Rebase from 're-base';
var base = Rebase.createClass('https://magecado.firebaseio.com');

//import { App } from './App';

//render(<App />, document.getElementById('root'));

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Homepage
  @use <Homepage/>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var Homepage = React.createClass({
  getInitialState : function() {
    return {
      snippets : {}
    }
  },
  componentDidMount : function() {
    base.syncState('/snippet', {
      context : this,
      state : 'snippets'
    });
  },
  addSnippet : function(snippet) {
    var timestamp = (new Date()).getTime();
    this.state.snippets[timestamp] = snippet;
    this.setState({ snippets : this.state.snippets });
  },
  render : function() {
    return (
        <div id="homepage">
          <Header/>
          <div className="wrapper">
            <Search/>
            <Results snippets={this.state.snippets}/>
          </div>
          <Footer addSnippet={this.addSnippet}/>
        </div>
    )
  }
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Page - Snippet
  @use <Page_Snippet/>
  @url /snippet/:id
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var Page_Snippet = React.createClass({
  getInitialState : function() {
    return {
      snippetInfo : {}
    }
  },
  componentDidMount : function() {
    base.syncState('/snippet/' + this.props.params.snippetId, {
      context : this,
      state : 'snippetInfo'
    });

    //var snippetViews = this.state.snippets.views + 1;
    //this.setState({ snippets : snippetViews });
  },
  render : function() {
    var snippetInfo;
    if (this.state.snippetInfo.title) {
      snippetInfo = <Snippet id={this.props.params.snippetId} snippetInfo={this.state.snippetInfo}/>;
    } else {
      snippetInfo = 'No snippet found';
    }
    return (
        <div id="page-snippet">
          <Header/>
          <div className="wrapper">
            <Search/>
            {snippetInfo}
          </div>
          <Footer />
        </div>
    )
  }
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Snippet
  @use <Snippet/>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var Snippet = React.createClass({
  render : function() {
    var snippet = this.props.snippetInfo;
    return (
      <div className="snippet">
        <h2>{snippet.title}</h2>
        <p>{snippet.desc}</p>
        <p>Views: {snippet.views}</p>
        <p>{snippet.magentoVersion}</p>
        <pre>{snippet.snippetCode}</pre>
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
        <Link to={'/'}>
          <span className="header__logo__mage">{this.props.beforeText}</span>

          <svg width="84px" height="132px" viewBox="0 0 84 132">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
                <path d="M41.6875,128.876953 C63.2266052,128.876953 81,110.433356 81,78.953125 C81,47.4728943 61.0625427,3 39.5234375,3 C17.9843323,3 3,47.4728943 3,78.953125 C3,110.433356 20.1483948,128.876953 41.6875,128.876953 Z" id="Oval-1" stroke="#42B983" strokeWidth="6"></path>
                <circle id="Oval-2" fill="#EF682F" cx="42" cy="86" r="24"></circle>
            </g>
          </svg>
          <span className="header__logo__cado">{this.props.afterText}</span>
        </Link>
      </div>
    )
  }
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Results
  @use <Results/>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var Results = React.createClass({
  renderSnippets : function(key) {
    return <SnippetResult id={key} snippetInfo={this.props.snippets[key]} />
  },
  render :  function() {
    //var snippets = this.props.snippets).map( ()
    return (
      <section className="results">
        <ul>
            {Object.keys(this.props.snippets).map(this.renderSnippets)}
        </ul>
      </section>
    )
  }
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Snippet (shortform in results)
  @use <SnippetResult/>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var SnippetResult = React.createClass({
  render :  function() {
    var snippetInfo = this.props.snippetInfo;
    return (
      <article className="snippet-item">
        <div className="snippet-item__favorite">
          <div><a href="#like"><svg className="nc-icon glyph" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16"><g> <path fill="#e6e6e6" d="M13.3,6H9V2c0-1.5-0.8-2-2-2C6.7,0,6.4,0.2,6.4,0.5C6.4,0.5,4.1,8,4,8v8h8.6c1.3,0,2.4-1,2.6-2.3L16,9.1 c0.1-0.8-0.1-1.6-0.6-2.1C14.9,6.3,14.1,6,13.3,6z"></path> <rect data-color="color-2" y="8" fill="#cccccc" width="2" height="8"></rect> </g></svg></a></div>
        </div>
        <div className="snippet-item__content">
          <Link to={`/snippet/${this.props.id}`} className="snippet-item__link">
            <header className=""><h2 className="snippet-item__title">{snippetInfo.title}</h2></header>
            <p className="snippet-item__desc">{snippetInfo.desc}</p>
            <img src="https://ph-avatars.imgix.net/79/original?auto=format&fit=crop&crop=faces&w=60&h=60" className="snippet-item__avatar" />
          </Link>
          <footer className="snippet-item__meta">
            <ul>
              <ul className="snippet-item__meta--version">
                <li><svg className="nc-icon glyph" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16"><g> <path fill="#cccccc" d="M15.4,3.1l-7-3C8.1,0,7.9,0,7.6,0.1l-7,3C0.2,3.2,0,3.6,0,4v8c0,0.4,0.2,0.8,0.6,0.9l7,3C7.7,16,7.9,16,8,16 s0.3,0,0.4-0.1l7-3c0.4-0.2,0.6-0.5,0.6-0.9V4C16,3.6,15.8,3.2,15.4,3.1z M8,2.1L12.5,4L8,5.9L3.5,4L8,2.1z M2,5.5l5,2.1v5.8l-5-2.1 V5.5z M9,13.5V7.7l5-2.1v5.8L9,13.5z"></path> </g></svg></li>
                <li>Magento {snippetInfo.magentoVersion}</li>
              </ul>
              <ul>
                <li><svg className="nc-icon glyph" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16"><g><path fill="#cccccc" d="M15.7,8.3l-8-8C7.5,0.1,7.3,0,7,0H1C0.4,0,0,0.4,0,1v6c0,0.3,0.1,0.5,0.3,0.7l8,8C8.5,15.9,8.7,16,9,16 s0.5-0.1,0.7-0.3l6-6C16.1,9.3,16.1,8.7,15.7,8.3z M4,5C3.4,5,3,4.6,3,4s0.4-1,1-1c0.6,0,1,0.4,1,1S4.6,5,4,5z"></path></g></svg></li>
                <li><a href="#layout">Layout</a></li>
                <li><a href="#observer">Observer</a></li>
              </ul>
            </ul>
          </footer>
        </div>
      </article>
    )
  }
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Search
  @use <Search/>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var Search = React.createClass({
    handleSearch : function (event) {
      event.preventDefault();
      var searchQuery = this.refs.searchQuery.value;

      // algolia api or firebase api query
    },
    render : function() {
      return (
        <section className="search--main">
          <form onChange={this.handleSearch} onSubmit={this.handleSearch}><input type="search" ref="searchQuery" placeholder="Search..." /></form>
        </section>
      )
    }
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Add Snippet Form
  @use <AddSnippet/>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var AddSnippet = React.createClass({
    submitSnippet : function (event) {
      event.preventDefault();

      var snippet = {
        title : this.refs.snippetTitle.value,
        desc : this.refs.snippetDesc.value,
        magentoVersion : this.refs.mageVer.value,
        snippetCode : this.refs.snippetCode.value,
      }

      this.props.addSnippet(snippet);
      this.refs.snippetForm.reset();
    },
    render : function() {
      return (
        <div className="modal">
          <div className="modal_content">
            <h2>Submit Your Magento Snippet</h2>
            <form ref="snippetForm" onSubmit={this.submitSnippet}>
              <ul className="form-fields">
                <li>
                  <label>Snippet Title</label>
                  <input type="text" ref="snippetTitle" required/>
                </li>
                <li>
                  <label>Snippet Description (250char max)</label>
                  <textarea ref="snippetDesc" required></textarea>
                </li>
                <li>
                  <label>Select Magento Version</label>
                  <select ref="mageVer" required>
                    <option>Magento 1</option>
                    <option>Magento 2</option>
                  </select>
                </li>
                <li>
                  <label>Snippet Code (Markdown)</label>
                  <textarea ref="snippetCode" required></textarea>
                </li>
              </ul>
              <button type="submit">Submit Snippet</button>
            </form>
          </div>
        </div>
      )
    }
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Global Footer
  @use <Footer/>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var Footer = React.createClass({
    render : function() {
      return (
        <footer className="footer">
          <div className="wrapper">
            <p>Magecado</p>
            <AddSnippet addSnippet={this.props.addSnippet}/>
          </div>
        </footer>
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
    <Route path="/snippet/:snippetId" component={Page_Snippet}/>
    <Route path="*" component={NotFound}/>
  </Router>
)

render(routes, document.getElementById('root'));
