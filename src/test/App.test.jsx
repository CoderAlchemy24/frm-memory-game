import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from '../App';

describe('App start flow', () => {
  it('starts a solo 4x4 game from settings', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Numbers' }));
    await user.click(screen.getByRole('button', { name: 'Start Game' }));

    expect(screen.queryByText('Select Theme:')).not.toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Card \d+/ })).toHaveLength(16);
    expect(screen.getByRole('button', { name: 'Restart' })).toBeInTheDocument();
  });
});