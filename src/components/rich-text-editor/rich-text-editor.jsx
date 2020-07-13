import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import {
  convertToRaw,
  convertFromHTML,
  ContentState,
  EditorState,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './rich-text-editor.scss';

const RichTextEditor = ({ onChange, defaultValue }) => {
  const [editorState, setEditorState] = useState();
  const [htmlContent, setHtmlContent] = useState();
  const [hasInit, setHasInit] = useState(false);

  // set the default value to show in the rich text editor
  const prepareDefaultValue = () => {
    const blocksFromHTML = convertFromHTML(defaultValue);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );
    setEditorState(EditorState.createWithContent(state));
  };

  useEffect(() => {
    if (!hasInit && defaultValue && defaultValue !== '') {
      prepareDefaultValue();
      setHasInit(true);
    }
  }, [hasInit]);

  // listen to changes from the editor state
  const handleEditorChange = (e) => {
    setEditorState(() => e);
    setHtmlContent(() => draftToHtml(convertToRaw(e.getCurrentContent())));
    onChange(htmlContent);
  };

  // return false to inherit default editor behaviour
  const handlePastedText = () => false;

  const options = ['history', 'inline', 'list', 'textAlign', 'link', 'blockType'];

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
		handlePastedText={handlePastedText}
	/>
  );
};

RichTextEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
};

RichTextEditor.defaultProps = {
  defaultValue: null,
};
export default RichTextEditor;
