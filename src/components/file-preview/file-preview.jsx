/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import './pdf-preview.scss';
import { Button } from 'semantic-ui-react';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DownloadIcon from '@material-ui/icons/GetApp';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MinusIcon from '@material-ui/icons/IndeterminateCheckBox';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import Input from '../form-fields/input/input';
// import MessageHeaderCaption from '../snippets/message-header-caption/message-header-caption';
import { getFileNameAndExtension } from '../../utils/app/file';
import FileHandlerContext from '../../context/file-handler.context';

const FilePreview = ({
  type, fileObject, user, handleCloseAction, details, children, ...rest
}) => {
  const showAdvancedControls = () => {
    if (type === 'pdf') {
      return true;
    } return false;
  };

  return (
	<div className="file-preview__wrapper">
		<div className="file-preview__backdrop" />
		<div className="file-preview__content">
			<div className={`file-preview-header kt-bg-shadow ${showAdvancedControls() ? 'advanced-controls' : 'basic-controls'}`}>
				<div className="file-preview-header__controls-wrapper">
					{type === 'pdf' && (
						<div className="file-preview-header__controls">
							{rest.pages && (
								<span className="flex-center">
									{' ('}
									{rest.pages}
									{' )'}
									pages
								</span>
							)}
							<Button
								draggable
								default
								size="tiny"
								className="kt-transparent flex-center"
								content=""
								icon={<AddBoxIcon className="big logo dark" />}
								onClick={rest.handleZoomOut}
							/>
							<Button
								draggable
								default
								size="tiny"
								className="kt-transparent flex-center"
								content=""
								icon={<MinusIcon className="big logo dark" />}
								onClick={rest.handleZoomIn}
							/>
							<Button
								draggable
								default
								size="tiny"
								className="kt-transparent flex-center"
								content=""
								icon={<FullscreenIcon className="big logo dark" />}
								onClick={rest.handleFitScreen}
							/>
							<Input
								type="text"
								value={`${Math.round(rest.scale * 100)} %`}
								classes="file-preview__input"
							/>
						</div>
					)}
				</div>
				<div className="text-right flex-center file-preview-header__cta">
					{fileObject && (
						<a
							href={fileObject.staticUrl}
							download={getFileNameAndExtension(fileObject.remoteUrl)}
							className="kt-transparent flex-center float-r m-r-20 kt-item__cta-tool-tip"
							attr-data="Download"
						>
							<DownloadIcon className="medium logo dark auto-height" />
						</a>
					)}
					<div
						className="kt-item__cta-tool-tip"
						attr-data="Close"
					>
						<Button
							draggable
							default
							size="tiny"
							icon={<CancelOutlinedIcon className="big logo dark" />}
							className="kt-transparent flex-center"
							content=""
							onClick={handleCloseAction}
						/>
					</div>
				</div>
			</div>
			<div className="file-preview-content__body">
				<div className="file-preview">
					{children}
				</div>
				<div className="kt-bg-shadow preview-controls">
					<FileHandlerContext.Consumer>
						{(value) => value}
					</FileHandlerContext.Consumer>
				</div>
			</div>
		</div>
	</div>
  );
};

FilePreview.propTypes = {
  fileObject: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleCloseAction: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default FilePreview;
