import React, { Component } from 'react'
import { Accordion, Icon, Menu } from 'semantic-ui-react'

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
          <div className="logo m-b-20">logo</div>
          <Accordion as={Menu} vertical>
            <Menu.Item>
              <Accordion.Title
                active={activeIndex === 0}
                content='Option-1'
                index={0}
                onClick={this.handleClick}
              />
              <Accordion.Content active={activeIndex === 0} content="one"  className="menu-option"/>
            </Menu.Item>
            <Menu.Item>
              <Accordion.Title
                active={activeIndex === 1}
                content='Colors'
                index={1}
                onClick={this.handleClick}
              />
              <Accordion.Content active={activeIndex === 1} content="sub-1"  className="menu-option"/>
            </Menu.Item>
          </Accordion>
        </div>
    );
  }
}