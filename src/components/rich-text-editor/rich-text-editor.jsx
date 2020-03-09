import React, { useState } from 'react';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './rich-text-editor.scss';

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState();
  const [htmlContent, setHtmlContent] = useState();

  const handleEditorChange = (e) => {
    setEditorState(() => e);
    setHtmlContent(() => draftToHtml(convertToRaw(e.getCurrentContent())));
    console.log('The editor has changes', htmlContent);
  };

  const options = ['inline', 'list', 'textAlign', 'link', 'blockType', 'history'];

  const toolbarOptions = {
    options,
    inline: {
      inDropdown: false,
      options: ['bold', 'italic', 'underline'],
    },
    list: {
      inDropdown: false,
      options: ['unordered', 'ordered'],
    },
    textAlign: { inDropdown: false },
    link: { inDropdown: false },
    blockType: {
      inDropdown: true,
      options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
      className: 'kt-block',
    },
  };
  return (
	<Editor
		wrapperClassName="kt-toolbar-wrapper"
		editorClassName="kt-editor"
		toolbarClassName="kt-toolbar"
		editorState={editorState}
		onEditorStateChange={handleEditorChange}
		toolbar={toolbarOptions}
	/>
  );
};

export default RichTextEditor;
