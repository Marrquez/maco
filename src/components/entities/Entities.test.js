import React from 'react';
import ReactDOM from 'react-dom';
import Profiles from './Entities';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Entities />, div);
  ReactDOM.unmountComponentAtNode(div);
});
