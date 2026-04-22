import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import Root from './components/Root';
import Home from './components/Home';

describe('app smoke', () => {
  it('renders home inside root layout', () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          Component: Root,
          children: [{ index: true, Component: Home }],
        },
      ],
      { initialEntries: ['/'] }
    );

    render(<RouterProvider router={router} />);

    expect(screen.getByRole('link', { name: /^bl$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /brandon liu/i })).toBeInTheDocument();
  });
});
