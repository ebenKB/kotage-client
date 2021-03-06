/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Button } from 'semantic-ui-react';
import './notification.scss';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/HighlightOff';
import { clearNotification } from '../../redux/actions/appActions';
import { pretifyMessage } from '../../utils/app/index';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const { clearAppNotification } = this.props;
      clearAppNotification();
    }, 10000);
  }

 clearNotification = () => {
   const { clearAppNotification } = this.props;
   clearAppNotification();
 }

  getNotification = () => {
    const { type } = this.props;
    const { appError } = this.props;
    return (
	<div
		className={`${type !== 'minimal' ? 'notification' : 'minimal'} 
    ${appError.type === 'error' ? 'kt-danger' : 'kt-success'} slide-in`}
	>
		<span>
			{ pretifyMessage(appError.message) }
		</span>
		{type !== 'minimal' && (
			<Button size="tiny" onClick={this.clearNotification} className="kt-transparent">
				{/* <Icon className="small logo" /> */}
				<CloseIcon className="logo" />
			</Button>
		)}
	</div>
    );
  };

  disAbleNotification = () => {
    setTimeout(() => { this.setState({ isActive: false }); }, 4000);
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
  appError: state.app.notification,
});

const mapDispatchToProps = {
  clearAppNotification: clearNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
