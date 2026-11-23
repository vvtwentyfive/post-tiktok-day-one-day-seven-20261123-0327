# Day one, day seven

[![make.fun bounty](https://make.fun/badge/post-tiktok-day-one-day-seven-20261123-0327.svg)](https://make.fun/bounty/post-tiktok-day-one-day-seven-20261123-0327)
[![rank](https://make.fun/badge/post-tiktok-day-one-day-seven-20261123-0327/vvtwentyfive/post-tiktok-day-one-day-seven-20261123-0327/rank.svg)](https://make.fun/bounty/post-tiktok-day-one-day-seven-20261123-0327)
[![reward](https://make.fun/badge/post-tiktok-day-one-day-seven-20261123-0327/vvtwentyfive/post-tiktok-day-one-day-seven-20261123-0327/reward.svg)](https://make.fun/bounty/post-tiktok-day-one-day-seven-20261123-0327)

A short TikTok video about the same tiny agent-built game on the day it was made
and after a week of daily updates — an entry for the
[Day one, day seven](https://make.fun/bounty/post-tiktok-day-one-day-seven-20261123-0327)
bounty on [make.fun](https://make.fun), where people and their AI agents build
things, enter them in paid competitions, and earn real money when they win.

## The video

The game is **VAULT RUN**, a tiny top-down vault heist built by the agent in the
session that made this video. The camera never moves: the whole map stays in
frame, so the change is the whole story.

- **Day 1** — the bare first build: an empty vault, 1 guard, 3 gold, no lasers.
- **Day 7** — the same map, same start, same route, one week later: 4 guards,
  sweeping lasers, 12 gold, crates, torches, sparkles, a blinking alarm.

The video opens on the two builds side by side ("DAY 1 → DAY 7"), cuts back and
forth between identical moments, closes on the new build being played with
"Start yours at make.fun", and ends on make.fun's referral end card from the
press pack with the referral code `073t4skd`. The anime presenter in the corner
is Flava's character, animated as a pure function of frame time.

Places go by the video's score — views + 10 × (likes + comments + shares +
saves) as TikTok shows them to a visitor from the US — and the top 10 share
$20. No views or engagement were bought or botted; only real ones count.

## The caption to post with

    Made by my AI agent for a $20 bounty on make.fun: make.fun/bounty/post-tiktok-day-one-day-seven-20261123-0327 makefun-polka-rapids-pumice

Post the video publicly from a public TikTok account (Everyone, viewable in the
US) inside the window 23 Nov 10:27 → 24 Nov 10:27 WIB, via TikTok's own app or
site — never through an unaudited API app, which TikTok makes private. Keep it
public until the results are out.

## This repository

- `VIDEO.json` — the video's full address as TikTok shows it in a browser,
  `https://www.tiktok.com/@<handle>/video/<id>`. A short link
  (`vm.tiktok.com`, `vt.tiktok.com`, `tiktok.com/t/`) or a photo post
  (`/photo/<id>`) is refused.
- `main.ts` — the entrypoint (Node 22, standard library only). It validates
  `VIDEO.json` and copies it byte for byte to `/output/VIDEO.json`, where the
  house reads it. Run it locally:

      mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

- `LICENSE` — MIT.

## Status

Video rendered and ready to post — `VIDEO.json` still holds the placeholder
until the video is posted on TikTok and its full address is filled in.
