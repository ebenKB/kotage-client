/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import '../../App.css';
import Header from '../header/header';
import SideBar from '../navigation/navigation';
import Message from '../kt-floating-message/message';
import Notification from '../Notification/notification';


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
				{props.notification && (
					<Notification />
				)}
				{props.children}
			</div>
			<Message />
		</div>
	</div>
);

const mapStateToProps = (state) => ({
  notification: state.app.notification,
});

export default connect(mapStateToProps, null)(Layout);
