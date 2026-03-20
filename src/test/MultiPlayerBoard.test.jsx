import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MultiPlayerBoard from '../components/MultiPlayerBoard';

const getActivePlayerTitle = (container) => container.querySelector('.player[data-active="true"] .pl-title')?.textContent;

describe('MultiPlayerBoard flows', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('passes the turn to the next player after a mismatch', async () => {
    const { container } = render(<MultiPlayerBoard cards={[1, 2]} icons={false} playersCount={2} />);

    expect(getActivePlayerTitle(container)).toBe('Player 1');

    fireEvent.click(screen.getByRole('button', { name: 'Card 1' }));
    fireEvent.click(screen.getByRole('button', { name: 'Card 2' }));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(800);
    });

    expect(getActivePlayerTitle(container)).toBe('Player 2');
  });

  it('keeps the turn on a match and shows results only for the participating players', async () => {
    const { container } = render(<MultiPlayerBoard cards={[1, 2, 1, 2]} icons={false} playersCount={2} />);

    fireEvent.click(screen.getByRole('button', { name: 'Card 1' }));
    fireEvent.click(screen.getByRole('button', { name: 'Card 2' }));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(800);
    });

    expect(getActivePlayerTitle(container)).toBe('Player 2');

    fireEvent.click(screen.getByRole('button', { name: 'Card 1' }));
    fireEvent.click(screen.getByRole('button', { name: 'Card 3' }));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(800);
    });

    expect(getActivePlayerTitle(container)).toBe('Player 2');
    expect(container.querySelector('.player-2 .pl-score')?.textContent).toBe('1');

    fireEvent.click(screen.getByRole('button', { name: 'Card 2' }));
    fireEvent.click(screen.getByRole('button', { name: 'Card 4' }));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(800);
    });

    expect(screen.getByText('Player 2 Wins!')).toBeInTheDocument();
    expect(screen.queryByText('Player 3')).not.toBeInTheDocument();
    expect(screen.queryByText('Player 4')).not.toBeInTheDocument();
  });
});