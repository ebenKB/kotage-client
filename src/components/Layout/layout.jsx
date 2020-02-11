/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import '../../App.css';
import Header from '../header/header';
import SideBar from '../navigation/navigation';
import Message from '../kt-floating-message/message';

const Layout = (props) => (
	<div className="App light-theme">
		<Header />
		<div className="header-offset" />
		<div className="app-container main-layout">
			<div>
				<div className="nav-main__wrappper">
					<SideBar />
				</div>
			</div>
			<div>
				{props.children}
			</div>
			<Message />
		</div>
	</div>
);

export default Layout;
