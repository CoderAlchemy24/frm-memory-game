import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SoloPlayerBoard from '../components/SoloPlayerBoard';

describe('SoloPlayerBoard flows', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('counts a move and flips mismatched cards back after the resolve delay', async () => {
    const { container } = render(<SoloPlayerBoard cards={[1, 2]} icons={false} />);

    const card1 = screen.getByRole('button', { name: 'Card 1' });
    const card2 = screen.getByRole('button', { name: 'Card 2' });

    fireEvent.click(card1);
    fireEvent.click(card2);

    expect(card1).toHaveAttribute('data-state', 'flipped');
    expect(card2).toHaveAttribute('data-state', 'flipped');
    expect(container.querySelector('.result-moves .result')?.textContent).toBe('1');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(800);
    });

    expect(card1).toHaveAttribute('data-state', 'hidden');
    expect(card2).toHaveAttribute('data-state', 'hidden');
  });

  it('shows the result modal and stops the timer once the board is complete', async () => {
    const { container } = render(<SoloPlayerBoard cards={[1, 1]} icons={false} />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    fireEvent.click(screen.getByRole('button', { name: 'Card 1' }));
    fireEvent.click(screen.getByRole('button', { name: 'Card 2' }));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(800);
    });

    expect(screen.getByText('You did it!')).toBeInTheDocument();
    expect(container.querySelector('.solo-results .result-time .result')?.textContent).toBe('00:01');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });

    expect(container.querySelector('.solo-results .result-time .result')?.textContent).toBe('00:01');
  });
});