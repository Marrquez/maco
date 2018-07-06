import React from 'react';
import ReactDOM from 'react-dom';
import Bill from './Bill';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Bill />, div);
  ReactDOM.unmountComponentAtNode(div);
});
