# HATCHIEggy — Metadata

- Collection: HATCHIEggy — "Every Egg Holds a Legend"
- Chain: BNB Chain (BSC), BEP-721 (contract not yet deployed — preview only)
- Supply: 4,444 tokens, sequential IDs 1–4444
- Base URI (planned): `https://www.hatchieggy.fun/metadata/`
- Files: `metadata/1` … `metadata/4444` (extensionless JSON)
- Image: every token uses the same single supplied artwork
  `https://www.hatchieggy.fun/assets/hero.jpg` (golden-purple cracked crystal egg).
  No variant images were supplied; traits are descriptive only and do not
  change the artwork. Do not invent variant images.
- Traits (7 layers, deterministic from token ID via SHA-256):
  Shell / Crystal / Gold Trim / Glow / Base / Aura / Rarity
- Name format: `HATCHIEggy #<id>`

## Rarity distribution (sums to 4,444)

| Tier | ID range | Count |
|------|----------|-------|
| Common | 1–2222 | 2,222 |
| Rare | 2223–3333 | 1,111 |
| Epic | 3334–3999 | 666 |
| Legendary | 4000–4332 | 333 |
| Mythic | 4333–4444 | 112 |
| **Total** | | **4,444** |

Verified: local file count 4,444; per-tier counts match the ranges above;
sample files 1, 2222, 2223, 3333, 3334, 3999, 4000, 4332, 4333, 4444 checked
(valid JSON, correct name, image URL, and 7 traits).

## Spec (preview — no contract deployed yet)

- First mint free, then 0.001 BNB, max 10/wallet, agent-only mint,
  +120,000 HATCH per paid mint. NFT name HATCHIEggy, symbol HATCHIEGGY.
- Official X: https://x.com/HATCHIEggy
- Canonical domain: https://www.hatchieggy.fun/
- Old HATCHIE (3,333, contract 0x28918c8DA0836dC984057a04865b17A5820398fb)
  is a separate project on https://hatchie.vercel.app/ — do not touch it.

## Hosting status (2026-11-06 ~03:35 WIB)

- GitHub repo: https://github.com/sangfariz16-gif/HATCHIEggy (`main`)
  - Batch 1: `56b9d4a0a853fc1f7bab48f72b6f2634604ec4c3` — site files + metadata 1–1497
  - Batch 2: `9d9bff2de966dfc44e4ca710c90e0f40f7811463` — metadata 1498–2997
  - Batch 3: `9e6748c99dcd90f22e976cd7d495dcbb7c2068c0` — metadata 2998–4444
  - All 4,444 metadata files + `index.html` + `app.js` + `README.md` verified in repo.
- **BLOCKED — `assets/hero.jpg` is NOT in the repo yet.** The GitHub MCP
  string channel cannot carry binary files (verified 2026-11-06: a round-trip
  test came back UTF-8-mangled, 21 bytes vs 17 original; test file deleted,
  head now `3c03474d2df0d56dcd1d1092b30ab8bc8d457fb8`). `push_files` also
  rejects non-UTF-8 content. Add `assets/hero.jpg` (88,864 B, local copy at
  `~/workspace/hatchie/covenant-preview/assets/hero.jpg`) via the GitHub web
  upload UI, then deploy with `deploy_git.py` — do NOT deploy the git version
  before that, or the preview hero and every metadata `image` URL 404s.
- Vercel deploy (NOT run yet): `python3 deploy_git.py [sha]` creates a
  production deployment on project `hatchie-covenant-preview`
  (`prj_zAPIiCxrVa47kVm760hcNjlwLELN`) from the repo commit. After deploy,
  verify `https://www.hatchieggy.fun/metadata/1`, tier boundaries
  (2222/2223, 3333/3334, 3999/4000, 4332/4333), `/metadata/4444`, and
  `/assets/hero.jpg` all return 200. Only then is baseURI
  `https://www.hatchieggy.fun/metadata/` live.

## Generation

Generated locally by `gen_metadata.py` (kept in the preview source folder,
not in this repo). Re-running it regenerates identical files.
