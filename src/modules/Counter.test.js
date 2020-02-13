import React from 'react';
import { render } from '@testing-library/react';
import Counter from './Counter';

test('renders Counter title', () => {
  const { getByText } = render(<Counter />);
  const titleElement = getByText(/Counter/i);
  expect(titleElement).toBeInTheDocument();
});
