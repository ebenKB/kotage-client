/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Accordion, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../svg/home.svg';

import './navigation.scss';
import Can from '../can/can';

class AccordionStandard extends Component {
  constructor(props) {
    super(props);
    // set activeIndex to 0 to open the first item by default
    this.state = { activeIndex: props.accountType.toLowerCase() === 'buyer' ? -1 : 0 };
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    const { currentTenant, accountType } = this.props;
    return (
	<div className="nav-wrapper">
		<div className="m-l-16 m-b-15 content menu-option bold">
			<Link to="/">
				<Logo className="kt-logo__small" />
				Welcome
			</Link>
		</div>
		<Can
			accountType={accountType.toLowerCase()}
			roleType="user"
			perform="buyer:view_navigation"
			yes={() => (
				<>
					<Accordion as={Menu} vertical>
						<Menu.Item>
							<Accordion.Title
								active={activeIndex === 0}
								content="Source"
								index={0}
								onClick={this.handleClick}
								className="m-b-10"
							/>
							<Accordion.Content active={activeIndex === 0} className="menu-option">
								<Link to="/rfx">RFx</Link>
							</Accordion.Content>
							<Accordion.Content active={activeIndex === 0} className="menu-option">
								<Link to="/rfx/new">New Event</Link>
							</Accordion.Content>
							<Accordion.Content active={activeIndex === 0} className="menu-option">
								<Link to="/quotes/news">New Quote</Link>
							</Accordion.Content>
							<Accordion.Content active={activeIndex === 0} className="menu-option">
								<Link to="/vendors/new">Vendors</Link>
							</Accordion.Content>
						</Menu.Item>
					</Accordion>
					<Accordion as={Menu} vertical>
						<Menu.Item>
							<Accordion.Title
								active={activeIndex === 1}
								content="Procure"
								index={1}
								onClick={this.handleClick}
								className="m-b-10"
							/>
							{currentTenant && (
								<Accordion.Content active={activeIndex === 1} className="menu-option">
									<Link to={`/${currentTenant.account_id}/requisitions`}>Requisitions</Link>
								</Accordion.Content>
							)}
						</Menu.Item>
					</Accordion>
					<Accordion as={Menu} vertical>
						<Menu.Item>
							<Accordion.Title
								active={activeIndex === 2}
								content="Pay"
								index={0}
								onClick={this.handleClick}
								className="m-b-10"
							/>
						</Menu.Item>
					</Accordion>
					<Accordion as={Menu} vertical>
						<Menu.Item>
							<Accordion.Title
								active={activeIndex === 3}
								content="Reports"
								index={0}
								onClick={this.handleClick}
								className="m-b-10"
							/>
						</Menu.Item>
					</Accordion>
				</>
			)}
			no={() => null}
		/>
		<Can
			perform="supplier:view_navigation"
			accountType={accountType.toLowerCase()}
			roleType="user"
			yes={() => (
				<Accordion as={Menu} vertical>
					<Menu.Item>
						<Accordion.Title
							active={activeIndex === 0}
							content="Supplier"
							index={0}
							onClick={this.handleClick}
							className="m-b-10"
						/>
						<Accordion.Content active={activeIndex === 0} className="menu-option">
							<Link to="/supplier/events">View Bids</Link>
						</Accordion.Content>
					</Menu.Item>
				</Accordion>
			)}
			no={() => null}
		/>
	</div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    currentTenant: state.tenant.currentTenant,
    accountType: state.app.accountType,
  }
);

export default connect(mapStateToProps, null)(AccordionStandard);
