import React from 'react';
import { render, getByTestId } from '@testing-library/react';
import App from './App';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import data from './data.json';
import User from './components/User';

jest.setTimeout(30000);

test('renders User Component', async () => {
  let user = await render(<User item={data.students[0]} />);
  let result = await user.findAllByText('Ingaberg Orton');
  expect(user).toBeTruthy();
  expect(result[0].tagName).toBe('H2');

  let button = await user.findAllByText("+");
  button[0].click();
  let minus = await user.findAllByText("-");
  expect(minus[0].tagName).toBe('DIV');
  let test = await user.findAllByText(/Test*/);
  expect(test[0].tagName).toBe('SPAN');
});
