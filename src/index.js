require('../sass/main.scss');
import React from 'react';
import { render } from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, Link, IndexRoute, IndexLink} from 'react-router';

// Firebase
import Rebase from 're-base';
var base = Rebase.createClass('https://magecado.firebaseio.com');

// Components
import App from './components/app';
import Header from './components/Header/index';
import Footer from './components/Footer';
import NotFound from './components/404';
import SnippetList from './components/SnippetList/index';
import Snippet from './components/Snippet/index';
import AddSnippet from './components/AddSnippet';

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Page - Snippet
  @use <Page_Snippet/>
  @url /snippet/:id
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var Page_Snippet = React.createClass({
  getInitialState : function() {
    return {
      snippetInfo : {},
      didUpdateViews: false
    }
  },
  componentWillMount : function() {
    var snippetViews;

    this.ref = base.syncState('/snippet/' + this.props.params.snippetId, {
      context : this,
      state: 'snippetInfo',
      then() {
        snippetViews = this.state.snippetInfo.views;
        if(!this.state.didUpdateViews) {
          this.updateViews(snippetViews);
        }
     }
    });
  },
  updateViews : function(snippetViews) {
    this.state.didUpdateViews = true;

    if(typeof snippetViews !== 'undefined') {
      base.post('/snippet/' + this.props.params.snippetId + '/views', {
        data: snippetViews + 1
      });
    }
  },
  componentWillUnmount() {
    base.removeBinding(this.ref);
  },
  render : function() {
    var snippet;
    var snippetPager = {previous: null, next: null, random: null};

    if (Object.keys(this.state.snippetInfo).length > 0) {
      snippet = <Snippet info={this.state.snippetInfo} pagination={snippetPager} />;
    } else {
      return (
        <div className="page-404">No snippet found...</div>
      )
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
    return <SnippetList key={key} snippetId={key} snippetInfo={this.props.snippets[key]} />
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
      <Route path="/submit" component={AddSnippet}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
)

render(routes, document.getElementById('root'));
