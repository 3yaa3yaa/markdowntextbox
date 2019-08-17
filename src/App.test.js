import React from 'react';
import ReactDOM from 'react-dom';
import MarkdownTextBox from './MarkdownTextBox';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MarkdownTextBox />, div);
  ReactDOM.unmountComponentAtNode(div);
});
