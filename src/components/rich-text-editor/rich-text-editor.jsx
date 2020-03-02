import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './rich-text-editor.scss';

const RichTextEditor = () => {
  const handleEditorChange = () => {
    console.log('The editor has changes');
  };

  const options = ['inline', 'list', 'textAlign', 'link', 'history', 'blockType'];

  const toolbarOptions = {
    options,
    inline: { inDropdown: false },
    list: { inDropdown: false },
    textAlign: { inDropdown: false },
    link: { inDropdown: false },
    blockType: {
      inDropdown: false,
      options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
      className: 'kt-block',
      component: undefined,
    },
  };
  return (
	<Editor
		toolbarClassName=""
		wrapperClassName="kt-toolbar-wrapper"
		editorClassName="kt-toolbar"
		onEditorStateChange={handleEditorChange}
		toolbar={toolbarOptions}
	/>
  );
};

export default RichTextEditor;
