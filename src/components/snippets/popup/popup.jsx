import React from 'react'
import { Button, Popup } from 'semantic-ui-react'

const PopupDropdown = () => (
	<React.Fragment>
		<Popup
      trigger={<span>Click me</span>}
      on='click'
      hideOnScroll
    >
			<div>
				<ul className="custom">
					<li>item one</li>
					<li>item option 2</li>
					<li>item option 3</li>
					<li>item option 4</li>
				</ul>
			</div>
		</Popup>
	</React.Fragment>
)

export default PopupDropdown