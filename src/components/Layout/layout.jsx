import React from 'react';
import '../../App.css';
import AppRouter from '../../components/AppRouter/router';
import Header from '../../components/header/header';
import SideBar from '../../components/navigation/navigation';
import Message from '../../components/kt-floating-message/message';

const Layout = (props) => {
  return (
	<div className="App light-theme">
		<Header/>
		<div className="header-offset"></div>
		<div className="app-container main-layout">
			<div>
				<div className="nav-main__wrappper">
					<SideBar />
				</div>
			</div>
			<div>
				{props.children}
			</div>
			<Message/>
		</div>
	</div>
  )
}

export default Layout
