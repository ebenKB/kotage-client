import React, { Component } from 'react'
import { Accordion, Menu } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from '../../svg/home.svg';

import './navigation.scss';

export default class AccordionStandard extends Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }
  render() {
    const { activeIndex } = this.state
    return (
      <div className="nav-wrapper">
        <div className="m-l-16 m-b-15 content menu-option bold">
          <Link to="/">
            <Logo className="kt-logo__small"/>
            Home
          </Link>
        </div>
        <Accordion as={Menu} vertical>
          <Menu.Item>
            <Accordion.Title
              active={activeIndex === 0}
              content='Sourcing'
              index={0}
              onClick={this.handleClick}
              className="m-b-10 bold"
            />
            <Accordion.Content active={activeIndex === 0}  className="menu-option">
              <Link to="/requisitions">Requistions</Link>
            </Accordion.Content>
            <Accordion.Content active={activeIndex === 0}  className="menu-option">
              <Link to="/quotes/new">RFX</Link>
            </Accordion.Content>
            <Accordion.Content active={activeIndex === 0} className="menu-option">
              <Link to="/dddd">Vendors</Link>
            </Accordion.Content>
          </Menu.Item>
        </Accordion>
        <Accordion as={Menu} vertical>
          <Menu.Item>
            <Accordion.Title
              active={activeIndex === 1}
              content='Orders'
              index={0}
              onClick={this.handleClick}
              className="m-b-10 bold"
            />
          </Menu.Item>
        </Accordion>
        <Accordion as={Menu} vertical>
          <Menu.Item>
            <Accordion.Title
              active={activeIndex === 2}
              content='Finance'
              index={0}
              onClick={this.handleClick}
              className="m-b-10 bold"
            />
          </Menu.Item>
        </Accordion>
        <Accordion as={Menu} vertical>
          <Menu.Item>
            <Accordion.Title
              active={activeIndex === 3}
              content='Reports'
              index={0}
              onClick={this.handleClick}
              className="m-b-10 bold"
            />
          </Menu.Item>
        </Accordion>
      </div>
    );
  }
}