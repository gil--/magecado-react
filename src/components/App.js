import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import InlineSvg from 'svg-inline-react';
import TagsInput from 'react-tagsinput'
var moment = require('moment'); // For dates

// Firebaseio
import Rebase from 're-base';
var base = Rebase.createClass('https://magecado.firebaseio.com');

// Componenets
import Header from './Header/index';
import Footer from './Footer';
//import AddSnippet from './AddSnippet';

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
  componentWillMount : function() {
    base.syncState('/snippet', {
      context : this,
      state : 'snippets',
      queries: {
        limitToLast: 15,
        orderByKey: false
      }
    });
  },
  addSnippet : function(snippet) {
    var timestamp = (new Date()).getTime();
    this.state.snippets[timestamp] = snippet;
    this.setState({ snippets : this.state.snippets });
    //browserHistory.pushState({}, '/snippet/${timestamp}');
  },
  render : function() {
    return (
        <div id="homepage">
          <Header />
            { React.cloneElement(this.props.children, { snippets: this.state.snippets, addSnippet: this.addSnippet}) }
          <Footer/>
        </div>
    )
  }
});

export default App;
