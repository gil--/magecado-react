import React from 'react';
import { render } from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, Link, IndexRoute, IndexLink} from 'react-router';
import InlineSvg from 'svg-inline-react';

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

export default Header;
