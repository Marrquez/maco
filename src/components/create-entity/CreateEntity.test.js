import React from 'react';
import ReactDOM from 'react-dom';
import CreateEntity from './CreateEntity';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateEntity />, div);
  ReactDOM.unmountComponentAtNode(div);
});
