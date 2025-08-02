import { render, screen } from '@testing-library/react';
import App from './App';

test('renders travel buddy app', () => {
  render(<App />);
  const linkElement = screen.getByText(/travel buddy/i);
  expect(linkElement).toBeInTheDocument();
});
