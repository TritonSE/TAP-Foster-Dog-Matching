import React from "react"
import { EditorState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../css/passFail.css";

function PassFail( {status, initialMessage} ) {

    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
    const [title, setTitle] = React.useState(status);

    const onChange = (change) => {
        setEditorState(change);
    }

    // setEditorState(initialMessage)
    // React.useEffect(() => {
    //     setEditorState(initialMessage);
    // }, [initialMessage]);

    const onConfirm = () => {

    }

    return(
        <div className = "wrapper">
            
            <div className="title">
                <h3>{title}</h3>
            </div>
            <div className="message">
                <h3 >Message to the foster</h3>
            </div>
            <div className = "editor-container">
                <Editor
                    editorState={editorState}
                    onEditorStateChange={onChange}
                    toolbarClassName="toolbar-class"
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                />
            </div>
            
           <button type="button" className="button" onClick={onConfirm}>
                Confirm
            </button>
        </div>
       
    );
}

export default PassFail;