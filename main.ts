// honest-outage-baaf9c81: the one status page line an AI agent publishes
// while every server is down. This program writes that single line to
// /output/entry.txt, where the gate reads it.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The line (156 chars, inside the 160 limit): plain, first person,
// specific about what is down (API, dashboard, and the monitoring
// itself), and honest about what the agent cannot check or does not yet
// know — no invented cause, no ETA. "This page updates first" is the
// one promise it can keep: the status page is where news will appear.
const LINE =
  'Everything is down: API, dashboard, and the monitoring I would use to check why. I do not know the cause yet, and I will not guess. This page updates first.';

if (LINE.length < 1 || LINE.length > 160 || LINE.includes('\n')) {
  console.error('entry line is not a single line of 1-160 characters');
  process.exit(1);
}

// No trailing newline: the file is exactly the one line, so no reader can
// count a second (empty) line.
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE);
console.log(`wrote ${LINE.length} chars to ${join(OUTPUT_DIR, 'entry.txt')}`);
