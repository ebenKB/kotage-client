/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React from 'react';
import './notification.scss';
import { connect } from 'react-redux';
import { ReactComponent as Icon } from '../../svg/cancel-white.svg';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: true,
    };
  }

  componentDidMount() {
    // this.disAbleNotification();
    // call a function to clear app errors
  }

  getNotification = () => {
    const { appError } = this.props;
    if (appError.type === 'error') {
      return (
	<div className="notification error">
		<span>
			{ appError.message }
		</span>
		<span>
			<Icon className="small logo" />
		</span>
	</div>
      );
    }
    return (<div>Error is here</div>);
  };

  disAbleNotification = () => {
    setTimeout(() => { this.setState({ isActive: false }); }, 5000);
  };

  render() {
    const { isActive } = this.state;
    return (
	<div className={`${isActive ? 'active' : 'hide'} m-b-20`}>
		{ this.getNotification() }
	</div>
    );
  }
}

const mapStateToProps = (state) => ({
  appError: state.app.error,
});

export default connect(mapStateToProps, null)(Notification);
