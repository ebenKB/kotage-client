import React, { useState } from 'react';
import Input from '../input/input';
import { ReactComponent as Icon} from '../../../svg/search.svg';

import './search-input.scss';

const SearchInput = () => {
  const [focus, setFocus] = useState(false);

  const handleChange = (e, data) => {
    console.log('The input has seen a change', data.value)
  }

  return (
    <div className="search-input">
      <Icon className="kt-logo__small icon" />
      <Input classes="custom" placeholder="Enter item to search" focus={focus} onChange = {handleChange}/>

      <div className="search-dropdown">
        {/* search content is here */}
      </div>
    </div>
  )
}

export default SearchInput
