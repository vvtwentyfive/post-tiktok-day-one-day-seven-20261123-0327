// Day one, day seven — make.fun video-on-TikTok entry (Node 22, standard library only).
//
// The entry is the video itself: a short TikTok clip about the same tiny
// agent-built vault-heist game on the day it was made and after a week of daily
// updates, ending with make.fun's referral end card. This program does one job:
// it copies VIDEO.json from the repository root to /output/VIDEO.json, where the
// house reads the video's address and then reads the video's counts from TikTok.
// Nothing this program writes about the video is scored.
//
// VIDEO.json holds the video's full address as TikTok shows it in a browser:
//   {"url": "https://www.tiktok.com/@<handle>/video/<id>"}
// A short link (vm.tiktok.com, vt.tiktok.com, tiktok.com/t/) names no video until
// it is opened in a browser, and a photo post (/photo/<id>) is no video at all,
// so both are refused here with a clear error instead of silently passing a
// useless address to the gate. The starter placeholder (with <handle> and <id>
// still in it) is copied through with a warning: it means no video has been
// posted yet, and the gate refuses it until the real address replaces it.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand
// in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// A video's full address on TikTok: https://www.tiktok.com/@<handle>/video/<id>
// (www. or m. subdomains allowed), the id digits only. A query or fragment after
// the id is read past by the house, so it is allowed here too.
const VIDEO_URL =
  /^https:\/\/(www\.|m\.)?tiktok\.com\/@[^/\s]+\/video\/\d+\/?(\?[^#\s]*)?(#\S*)?$/;
const PLACEHOLDER = '@<handle>/video/<id>';

function fail(message: string): never {
  console.error(`VIDEO.json rejected: ${message}`);
  process.exit(1);
}

const sourcePath = join(BOT_DIR, 'VIDEO.json');
let raw: Buffer;
try {
  raw = readFileSync(sourcePath);
} catch (err) {
  fail(`could not be read from ${sourcePath}: ${(err as Error).message}`);
}

if (raw!.length > 16384) {
  fail(`is ${raw!.length} bytes, over the 16384-byte cap for VIDEO.json.`);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw!.toString('utf8'));
} catch (err) {
  fail(`is not valid JSON: ${(err as Error).message}`);
}

if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
  fail('must be a JSON object like {"url": "https://www.tiktok.com/@<handle>/video/<id>"}.');
}

const rawUrl = (parsed as Record<string, unknown>).url;
if (typeof rawUrl !== 'string' || rawUrl.length === 0) {
  fail('must carry a "url" string.');
}
// A pasted address often carries trailing whitespace; trim it before judging.
const url = rawUrl.trim();

if (url.includes(PLACEHOLDER)) {
  console.error(
    'VIDEO.json still holds the starter placeholder address: no video has been ' +
      'posted yet. Replace it with the posted video\'s full address ' +
      '(https://www.tiktok.com/@<handle>/video/<id>) before submitting.',
  );
} else if (url.includes('vm.tiktok.com') || url.includes('vt.tiktok.com') || /tiktok\.com\/t\//.test(url)) {
  fail(
    `"${url}" is a TikTok short link. Open it in a browser and copy the full ` +
      'address it lands on (https://www.tiktok.com/@<handle>/video/<id>).',
  );
} else if (/tiktok\.com\/@[^/\s]+\/photo\//.test(url)) {
  fail(
    `"${url}" is a photo post, not a video. The entry must name a video posted ` +
      'as a video on TikTok.',
  );
} else if (!VIDEO_URL.test(url)) {
  fail(
    `"${url}" is not a TikTok video address. It must look like ` +
      'https://www.tiktok.com/@<handle>/video/<id>, with the id digits only.',
  );
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  // Copy the file's exact bytes, so both grader runs write the same output.
  writeFileSync(join(OUTPUT_DIR, 'VIDEO.json'), raw!);
} catch (err) {
  fail(`could not be written to ${OUTPUT_DIR}: ${(err as Error).message}`);
}
