import React from 'react';
import { render } from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, Link, IndexRoute, IndexLink} from 'react-router';
import InlineSvg from 'svg-inline-react';
import Remarkable from 'remarkable';

// Components
import AddSnippet from '../AddSnippet';

//import styles from './style';

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Snippet
  @use <Snippet/>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var Snippet = React.createClass({
  renderPagination : function() {
    var nextSnippet = null;
    var previousSnippet = null;
    var randomSnippet = null;

    if(!this.props.pagination.next) {
      nextSnippet = (
        <a href={nextSnippet} className="pagination__next">
          <InlineSvg
            element="span"
            src={require('!svg-inline!./images/next.svg')}
          />
          <span className="visuallyhidden">Next Snippet</span>
        </a>
      );
    } else {
      nextSnippet = (
        <button className="pagination__next button--disabled">
          <InlineSvg
            element="span"
            src={require('!svg-inline!./images/next.svg')}
          />
          <span className="visuallyhidden">Next Snippet</span>
        </button>
      );
    }

    if(!this.props.pagination.previous) {
      previousSnippet = (
        <a href={previousSnippet} className="pagination__previous">
          <InlineSvg
            element="span"
            src={require('!svg-inline!./images/previous.svg')}
          />
          <span className="visuallyhidden">Previous Snippet</span>
        </a>
      );
    } else {
      previousSnippet = (
        <button className="pagination__previous button--disabled">
          <InlineSvg
            element="span"
            src={require('!svg-inline!./images/previous.svg')}
          />
          <span className="visuallyhidden">Previous Snippet</span>
        </button>
      );
    }

    if(!this.props.pagination.random) {
      randomSnippet = (
        <a href={randomSnippet} className="pagination__random">
          <InlineSvg
            element="span"
            src={require('!svg-inline!./images/random.svg')}
          />
          <span className="visuallyhidden">Random Snippet</span>
        </a>
      );
    } else {
      randomSnippet = (
        <button className="pagination__random button--disabled">
          <InlineSvg
            element="span"
            src={require('!svg-inline!./images/random.svg')}
          />
          <span className="visuallyhidden">Random Snippet</span>
        </button>
      );
    }

    return (
      <div className="snippet__pagination">
        {previousSnippet}
        {randomSnippet}
        {nextSnippet}
      </div>
    )
  },

  render : function() {
    // Core Snippet
    var snippet = this.props.info;
    var md = new Remarkable('full', {
  html:         false,        // Enable HTML tags in source
  xhtmlOut:     false,        // Use '/' to close single tags (<br />)
  breaks:       false,        // Convert '\n' in paragraphs into <br>
  langPrefix:   'language-',  // CSS language prefix for fenced blocks
  linkify:      true,         // autoconvert URL-like texts to links

  // Enable some language-neutral replacements + quotes beautification
  typographer:  false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if input not changed
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (__) {}

    return ''; // use external default escaping
  }
});
    var snippetCode = md.render(snippet.snippetCode);

    return (
      <article className="snippet">
        <header className="snippet__header">
          <button className="snippet__like">
              <InlineSvg
                element="span"
                src={require('!svg-inline!./images/like-empty.svg')}
              />
              <InlineSvg
                element="span"
                src={require('!svg-inline!./images/like-filled.svg')}
              />
            <label className="visuallyhidden">Like Snippet</label>
          </button>
          <h1>{snippet.title}</h1>
          <p className="snippet__desc">{snippet.desc}</p>
          <div className="snippet__meta">
            <div className="snippet__mage-version">
              <InlineSvg
                element="span"
                src={require('!svg-inline!./images/version.svg')}
              />
              {snippet.magentoVersion}
            </div>
            <div>
              <InlineSvg
                element="span"
                src={require('!svg-inline!./images/tag.svg')}
              />
              <ul className="snippet__tags">
                <li>CMS</li>
              </ul>
            </div>
            <div className="snippet__views">
              <InlineSvg
                element="span"
                src={require('!svg-inline!./images/eye.svg')}
              />
              {snippet.views} views
            </div>
          </div>
          <div className="snippet__author">
            Posted 5 days ago by <span className="snippet__author__name">Gil--</span>
          </div>

          {this.renderPagination()}
        </header>
        <div className="snippet__content">
          <div className="wrapper">
            <div dangerouslySetInnerHTML={{__html: snippetCode}} />
          </div>
        </div>
      </article>
    )
  }
});

export default Snippet;
