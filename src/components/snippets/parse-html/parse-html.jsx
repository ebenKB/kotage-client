/* eslint-disable react/no-danger */
import React from 'react';
import { PropTypes } from 'prop-types';

const ParseHtml = ({ content }) => (
	<div dangerouslySetInnerHTML={{ __html: content }} />
);

ParseHtml.propTypes = {
  content: PropTypes.string.isRequired,
};
export default ParseHtml;
