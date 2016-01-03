import React from 'react';
import { render } from 'react-dom';

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  NotFound (404)
  @use <NotFound/>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var NotFound = React.createClass({
  render : function() {
    return (
      <div className="page-404">
        <h2>Opps!!!!!</h2>
        <p>Page not found.</p>
        <p>😱😁</p>
      </div>);
  }
});

export default NotFound;
