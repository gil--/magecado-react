import React, { Component } from 'react';;
import InlineSvg from 'svg-inline-react';
import TagsInput from 'react-tagsinput'
var moment = require('moment'); // For dates

// Firebaseio
import Firebase from 'firebase';
const ref = new Firebase('https://magecado.firebaseio.com');

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Add Snippet Form
  @use <AddSnippet/>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var AddSnippet = React.createClass({
    getInitialState() {
      uid: '' //for github/firebase auth
    },
    componentWillMount() {
      var token = localStorage.getItem('token');

      if(token) {
        ref.authWithCustomToken('token', this.authHandler);
      }
    },
    authenticate(provider) {
      ref.authWithOAuthPopup(provider, this.authHandler);
    },
    authHandler(err, authData) {
      if(err) {
        console.log(err);
        return;
      }

      //save auth token in localstorage
      localStorage.setItem('token', authData.token);

      // update our state to reflect the current store owner and user
      this.setState({
        uid : authData.uid,
        username : authData.github.username
      });
    },
    authLogout() {
      console.log('logout just got called');
      ref.unauth();
      localStorage.removeItem('token');
      this.setState({
        uid: null
      });
    },
    renderLogin() {
      return (
        <div className="auth--login">
          <button className="github" onClick={this.authenticate.bind(this, 'github')}>Login with Github</button>
        </div>
      )
    },
    getInitialState : function() {
      return {
        tags : []
      }
    },
    handleChange(tags) {
      this.setState({tags})
    },
    submitSnippet : function (event) {
      event.preventDefault();

      var now = moment().format();

      var snippet = {
        title : this.refs.snippetTitle.value,
        desc : this.refs.snippetDesc.value,
        magentoVersion : this.refs.mageVer.value,
        snippetCode : this.refs.snippetCode.value,
        views: 0,
        date: now, //today's date
        tags: this.state.tags, //array of tags
        updated: null, // when snippet is edited we add this field or update,
        user_id : this.state.uid,
        username : this.state.username,
      }

      this.props.addSnippet(snippet);
      this.refs.snippetForm.reset();
      this.setState({tags: []});
    },
    render : function() {
      let logoutButton = <button onClick={this.authLogout}>Log out!</button>;

      // check if user is logged in
      if(!this.state.uid) {
        return (
          <div>
            {this.renderLogin()}
          </div>
        )
      }
      // elseif(this.state.uid !== this.state.owner) {
      //   return (
      //     <div>
      //       <p>Sorry, you are not the original submitter</p>
      //       {logoutButton}
      //     </div>
      //   )
      // }

      return (
        <div className="modal">
          <div className="modal__header">
            <div className="wrapper">
              <h2>Submit Your Magento Snippet</h2>
              {logoutButton}
            </div>
          </div>
          <div className="modal__content">
            <form ref="snippetForm" onSubmit={this.submitSnippet}>
              <div className="wrapper">
                <ul className="form-fields">
                  <li>
                    <label htmlFor="title">Snippet Title</label>
                    <input id="title" type="text" ref="snippetTitle" required/>
                  </li>
                  <li>
                    <label htmlFor="desc">Snippet Description <span className="label__info">(250char max)</span></label>
                    <textarea id="desc" ref="snippetDesc" required></textarea>
                  </li>
                  <li>
                    <label htmlFor="magentoVersion">Select Magento Version</label>
                    <select id="magentoVersion" ref="mageVer" required>
                      <option>Magento 1 CE</option>
                      <option>Magento 1 EE</option>
                      <option>Magento 2 CE</option>
                      <option>Magento 2 EE</option>
                    </select>
                  </li>
                  <li>
                    <label htmlFor="code">Snippet Code <span className="label__info">(Markdown)</span></label>
                    <textarea id="code" ref="snippetCode" className="superTall" required></textarea>
                  </li>
                  <li>
                    <label>Snippet Tags - up to 4 <span className="label__info">(Press `tab` to add another tag)</span></label>
                    <TagsInput value={this.state.tags} onChange={this.handleChange} required />
                  </li>
                </ul>
                <button className="button" type="submit">Submit Your Snippet</button>
              </div>
            </form>
          </div>
        </div>
      )
    }
});

export default AddSnippet;
