import React from 'react';
import './kt-wrapper.scss';
import { Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const KtWrapper = (props) => {
  let {link, linkName, header} = props;

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

  return (
    <div className="kt-wrapper">
      <div className="kt-wrapper__header bold">
        <h2>{header}</h2>
        <div>
          <div>
            <Dropdown placeholder="Filter records" selection options={options} onChange={handleChange} className="m-r-20 "/>
            <Link to={link} className="action-link green ui large button">
              {linkName}
            </Link>
          </div>
        </div>
      </div>
      <div className="kt-wrapper__content">
        {props.children}
      </div>
    </div>
  )
}
export default KtWrapper;
