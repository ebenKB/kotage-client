import React from 'react';
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouterasRouter as Router} from 'react-router-dom';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

it('renders without crashing', () => {
  const div = document.createElement('div');
  const render = () => {
    return(
    <Router>
      {div}
    </Router>
    )
  }
  ReactDOM.render(<App /> , render());
});