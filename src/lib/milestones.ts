/** Momentum milestones for the "help us reach our first N" header. */
const MILESTONES = [
  100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000,
];

/** The smallest milestone strictly greater than the current count. */
export function nextMilestone(count: number): number {
  for (const m of MILESTONES) {
    if (count < m) return m;
  }
  // Past the last fixed milestone — round up to the next 100k.
  return Math.ceil((count + 1) / 100000) * 100000;
}
