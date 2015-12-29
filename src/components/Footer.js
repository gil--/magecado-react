import React, { Component } from 'react';

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Global Footer
  @use <Footer/>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var Footer = React.createClass({
    render : function() {
      return (
        <footer className="footer">
          <p>Made in NYC with <span className="footer__heart">&hearts;</span> by <a href="http://gilgreenberg.com" target="_blank">Gil Greenberg</a></p>
          <div className="footer__copyright">Magecado is not affiliated with Magento!</div>
        </footer>
      )
    }
});

export default Footer;
