import React from 'react';
import { render } from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, Link, IndexRoute, IndexLink} from 'react-router';
import InlineSvg from 'svg-inline-react';

// Componenets
import AddSnippet from '../AddSnippet';

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Snippet (shortform in results)
  @use <SnippetResult/>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var SnippetList = React.createClass({
  render :  function() {
    var snippetInfo = this.props.snippetInfo;

    var snippetTags = null;

    if(snippetInfo.tags) {
      snippetTags = snippetInfo.tags.map(function(tag, tagIndex) {
        return <li key={tagIndex}>{tag}</li>;
      });
    }

    return (
      <li className="snippet__list-item">
        <h2 className="snippet__title"><Link to={`/snippet/${this.props.snippetId}`}>{snippetInfo.title}</Link></h2>
        <p className="snippet__desc">{snippetInfo.desc}</p>
        <div className="snippet__meta">
          <span className="snippet__mage-version">
            <InlineSvg
              element="span"
              src={require('!svg-inline!./images/version.svg')}
            />
            {snippetInfo.magentoVersion}
          </span>
          <InlineSvg
            element="span"
            src={require('!svg-inline!./images/tag.svg')}
          />
          <ul className="snippet__tags">
            {snippetTags}
          </ul>
        </div>
      </li>
    )
  }
});

export default SnippetList;


// <article className="snippet-item">
//   <div className="snippet-item__favorite">
//     <div><a href="#like"><svg className="nc-icon glyph" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16"><g> <path fill="#e6e6e6" d="M13.3,6H9V2c0-1.5-0.8-2-2-2C6.7,0,6.4,0.2,6.4,0.5C6.4,0.5,4.1,8,4,8v8h8.6c1.3,0,2.4-1,2.6-2.3L16,9.1 c0.1-0.8-0.1-1.6-0.6-2.1C14.9,6.3,14.1,6,13.3,6z"></path> <rect data-color="color-2" y="8" fill="#cccccc" width="2" height="8"></rect> </g></svg></a></div>
//   </div>
//   <div className="snippet-item__content">
//     <Link to={`/snippet/${this.props.id}`} className="snippet-item__link">
//       <header className=""><h2 className="snippet-item__title">{snippetInfo.title}</h2></header>
//       <p className="snippet-item__desc">{snippetInfo.desc}</p>
//       <img src="https://ph-avatars.imgix.net/79/original?auto=format&fit=crop&crop=faces&w=60&h=60" className="snippet-item__avatar" />
//     </Link>
//     <footer className="snippet-item__meta">
//       <ul>
//         <ul className="snippet-item__meta--version">
//           <li><svg className="nc-icon glyph" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16"><g> <path fill="#cccccc" d="M15.4,3.1l-7-3C8.1,0,7.9,0,7.6,0.1l-7,3C0.2,3.2,0,3.6,0,4v8c0,0.4,0.2,0.8,0.6,0.9l7,3C7.7,16,7.9,16,8,16 s0.3,0,0.4-0.1l7-3c0.4-0.2,0.6-0.5,0.6-0.9V4C16,3.6,15.8,3.2,15.4,3.1z M8,2.1L12.5,4L8,5.9L3.5,4L8,2.1z M2,5.5l5,2.1v5.8l-5-2.1 V5.5z M9,13.5V7.7l5-2.1v5.8L9,13.5z"></path> </g></svg></li>
//           <li>Magento {snippetInfo.magentoVersion}</li>
//         </ul>
//         <ul>
//           <li><svg className="nc-icon glyph" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16"><g><path fill="#cccccc" d="M15.7,8.3l-8-8C7.5,0.1,7.3,0,7,0H1C0.4,0,0,0.4,0,1v6c0,0.3,0.1,0.5,0.3,0.7l8,8C8.5,15.9,8.7,16,9,16 s0.5-0.1,0.7-0.3l6-6C16.1,9.3,16.1,8.7,15.7,8.3z M4,5C3.4,5,3,4.6,3,4s0.4-1,1-1c0.6,0,1,0.4,1,1S4.6,5,4,5z"></path></g></svg></li>
//           <li><a href="#layout">Layout</a></li>
//           <li><a href="#observer">Observer</a></li>
//         </ul>
//       </ul>
//     </footer>
//   </div>
// </article>
