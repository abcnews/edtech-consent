import { readable } from 'svelte/store';

export function createLinearScale(domain: [number, number], range: [number, number] = [0, 1], clamp: boolean = false) {
  return (value: number) => {
    if (domain[0] === domain[1] || range[0] === range[1]) {
      return range[0];
    }

    const ratio = (range[1] - range[0]) / (domain[1] - domain[0]),
      result = range[0] + ratio * (value - domain[0]);

    return clamp ? Math.min(range[1], Math.max(range[0], result)) : result;
  };
}

export const scrollDirection = readable<'up' | 'down'>('down', set => {
  let lastScrollTop = document.documentElement.scrollTop;

  const listener = () => {
    var current = document.documentElement.scrollTop;
    if (current > lastScrollTop) {
      set('down');
    } else if (current < lastScrollTop) {
      set('up');
    }
    lastScrollTop = current <= 0 ? 0 : current;
  };

  window.addEventListener('scroll', listener, false);
  return () => window.removeEventListener('scroll', listener);
});

export function sum(arr: number[]): number;
export function sum<T>(arr: T[], acc: (d: T) => number): number;
export function sum<T>(arr: T[], acc: (d: T) => number = d => d as unknown as number): number {
  return arr.reduce((t, d) => t + acc(d), 0);
}
