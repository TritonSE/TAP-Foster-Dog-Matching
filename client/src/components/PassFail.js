/**
 * PassFail Component that has Rich Text Editor
 *
 * @summary     Pass/Fail Component that has RICH text editor to send messages
 * @author      Jacob Au
 * 
 * Props:
 * -status: used as title, and the type of message to send ex: 'Pass', 'Fail'
 * -initialMessage: starter message you want to send, must be a function (that takes a name arg) that returns html as a string
 * -onConfirm: function that will be called when the user clicks the confirm button (takes content arg with the content of the editor)  
 * 
 * Ex)
 * <PassFail 
        status = 'Pass'
        initialMessage = (name) => '<p>Hi ${name}. Test Message, I love food!</p>'
      />
 */

import React from "react";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import x from "../images/X.png";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../css/passFail.css";
import ApplicationContext from "../contexts/ApplicationContext";

function PassFail({ visible, setVisible, status, onConfirm, initialMessage }) {
  const { applicationState } = React.useContext(ApplicationContext);

  const [editorState, setEditorState] = React.useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(initialMessage(applicationState.firstName)))
    )
  );

  const onChange = (change) => {
    setEditorState(change);
  };

  const handleConfirm = () => {
    const content = editorState.getCurrentContent().getPlainText();
    onConfirm(content);
    setVisible(false);
  };

  const onClose = () => {
    setVisible(false);
  };

  if (visible)
    return (
      <div className="pass-fail-transparent-container">
        <div className="pass-fail-wrapper">
          <button type="button" className="x-button" onClick={onClose}>
            <img src={x} alt="loading circle" />
          </button>
          <div className="title">
            <h3>{status}</h3>
          </div>
          <div className="editor-message">
            <h3>Message to the foster</h3>
          </div>

          <div className="editor-container">
            <Editor
              editorState={editorState}
              onEditorStateChange={onChange}
              toolbarClassName="toolbar-class"
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
            />
          </div>

          <button type="button" className="button" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    );
  return null;
}

export default PassFail;
