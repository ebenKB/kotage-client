import React from 'react';
import Input from '../input/input';
import { ReactComponent as Logo } from '../../../svg/plus.svg';
import { ReactComponent as Trash } from '../../../svg/bin.svg';

import './kt-docs.scss';

const KtDocs = () => {
  const handleClick = () => {

  }
  return (
	<div className="docs-group m-t-30">
		<div className="bold">Documents</div>
		<div className="docs-wrapper">
			<div className="docs-wrapper__header bold light-caption">
				<div className="">Name</div>
				<div className="">Description</div>
			</div>
			<div className="docs-wrapper__content m-t-20">
				<div>
					<Input
            type='text'
            placeholder='Document name'
          />
				</div>
				<div>
					<Input
            type='text'
            placeholder='Document Description'
            classes="fluid"
          />
				</div>
				<div>
					<Trash className="kt-logo__small"/>
				</div>
			</div>
			<div className="clickable m-t-20 kt-primary bold sm-caption" onClick={handleClick}>
				<Logo className="kt-logo__small kt-primary"/>
				<span>Request New Document</span>
			</div>
		</div>
	</div>
  )
}

export default KtDocs;
