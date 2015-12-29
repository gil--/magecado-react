import React from 'react';
import { render } from 'react-dom';

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  NotFound (404)
  @use <NotFound/>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var NotFound = React.createClass({
  render : function() {
    return <div>Opps. Page not found.</div>
  }
});

export default NotFound;
