require('../sass/main.scss');
import React from 'react';
import { render } from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, Link, IndexRoute, IndexLink} from 'react-router';

// Firebase
import Rebase from 're-base';
var base = Rebase.createClass('https://magecado.firebaseio.com');

// Components
import Header from './components/Header/index';
import Footer from './components/Footer';
import NotFound from './components/404';
import SnippetList from './components/SnippetList/index';
import Snippet from './components/Snippet/index';

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  App Root
  @use <App/>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var App = React.createClass({
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
          <Header addSnippet={this.addSnippet}/>
            { React.cloneElement(this.props.children, { snippets: this.state.snippets }) }
          <Footer/>
        </div>
    )
  }
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Homepage aka Snippets Index
  @use <Snippets/>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// var Snippets = React.createClass({
//   render : function() {
//     return (
//         <div id="snippets">
//             <Results snippets={this.props.snippets}/>
//         </div>
//     )
//   }
// });

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
    var snippet;
    var snippetPager = {previous: null, next: null, random: null};

    if (this.state.snippetInfo.title !== null) {
      snippet = <Snippet info={this.state.snippetInfo} pagination={snippetPager} />;
    } else {
      snippet = 'No snippet found';
    }

    return (
      <div id="page-snippet">{snippet}</div>
    )
  }
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Results
  @use <Results/>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var Results = React.createClass({
  renderSnippets : function(key) {
    var snippetPager = {previous: null, next: null, random: null};
    return <SnippetList key={key} snippetId={key} snippetInfo={this.props.snippets[key]} pagination={snippetPager} />
  },
  render : function() {
    return (
      <section className="snippets">
        <div className="wrapper">
          <ul className="snippet__list">
            {Object.keys(this.props.snippets).map(this.renderSnippets)}
          </ul>
        </div>
      </section>
    )
  }
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ROUTES
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <IndexRoute component={Results}/>
      <Route path="/snippet/:snippetId" component={Page_Snippet}/>
    </Route>
    <Route path="*" component={NotFound}/>
  </Router>
)

render(routes, document.getElementById('root'));
