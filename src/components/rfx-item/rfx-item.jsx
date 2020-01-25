import React from 'react'

const RfxItem = (props) => {
  return (
	<>
		<div className="content">
			{props.children}
			<div className="m-t-20 m-b-20 bold light-caption text-center">{props.title}</div>
		</div>
	</>
  )
}

export default RfxItem;
