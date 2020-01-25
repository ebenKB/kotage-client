import React from 'react';
import {Button} from 'semantic-ui-react';
import './kt-wrapper.scss';
import { Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import SearcFilter from '../search-filter/filter';

class KtWrapper extends React.Component {
  render() {
    let { link='', linkName='', header, canFilter, canPerform, handleAction } = this.props;

    // check if there are no defaults
    if(link == null) {
      link = '/';
    }
  
    if(linkName == null) {
      linkName = 'New'
    }
  
    const options = [
      {
        text: "Sort A-Z",
        key:1,
        value: 1,
      },
      {
        text: "Sort Z-A",
        key: 2,
        value: 2,
      }
    ]
  
    const handleChange =(e, data) => {
      console.log('The selection has chnaged', data)
    }
  
    const performAction =(e) => {
      console.log('we want to perform an action', this.props.footer);
    }

    return (
      <div className="kt-wrapper">
        <div className="kt-wrapper__header bold">
          <h2>{header}</h2>
          <div>
              {
                canFilter && <div>
                <Dropdown placeholder="Filter records" selection options={options} onChange={handleChange} className="m-r-20 "/>
                  <Link to={link} className="action-link green ui button">
                    {linkName}
                  </Link>
                </div>
              }
          </div>
        </div>
          <div className="kt-wrapper__body">
            { canFilter && <SearcFilter /> }
            <div className="kt-wrapper__content">
              {this.props.children}
            </div>
          </div>
          {
            canPerform && (
            <div className="kt-wrapper__footer text-right">
              <div className="content">
                <Button content="Cancel" className="default"/>
                <Button type="submit" content="Save" className="green" onClick={handleAction}/>
              </div>
            </div>
            )
          }
      </div>
    )
  }
}

export default KtWrapper;
