import React from 'react';
import ReactDOM from 'react-dom';
import Trolley from './Trolley';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Trolley />, div);
  ReactDOM.unmountComponentAtNode(div);
});
