import React, { Component } from 'react';

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Add Snippet Form
  @use <AddSnippet/>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var AddSnippet = React.createClass({
    submitSnippet : function (event) {
      event.preventDefault();

      var snippet = {
        title : this.refs.snippetTitle.value,
        desc : this.refs.snippetDesc.value,
        magentoVersion : this.refs.mageVer.value,
        snippetCode : this.refs.snippetCode.value,
      }

      this.props.addSnippet(snippet);
      this.refs.snippetForm.reset();
    },
    render : function() {
      return (
        <div className="modal">
          <div className="modal_content">
            <h2>Submit Your Magento Snippet</h2>
            <form ref="snippetForm" onSubmit={this.submitSnippet}>
              <ul className="form-fields">
                <li>
                  <label>Snippet Title</label>
                  <input type="text" ref="snippetTitle" required/>
                </li>
                <li>
                  <label>Snippet Description (250char max)</label>
                  <textarea ref="snippetDesc" required></textarea>
                </li>
                <li>
                  <label>Select Magento Version</label>
                  <select ref="mageVer" required>
                    <option>Magento 1</option>
                    <option>Magento 2</option>
                  </select>
                </li>
                <li>
                  <label>Snippet Code (Markdown)</label>
                  <textarea ref="snippetCode" required></textarea>
                </li>
              </ul>
              <button className="button" type="submit">Submit Snippet</button>
            </form>
          </div>
        </div>
      )
    }
});

export default AddSnippet;
