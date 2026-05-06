import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders backend message', async () => {
    const fakeMessage = 'Hello from the backend! the secret value is test-secret';

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: fakeMessage }),
      })
    );

    render(<App />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(fakeMessage)).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/api/message');
  });
});

