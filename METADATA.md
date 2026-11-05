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

## Generation

Generated locally by `gen_metadata.py` (kept in the preview source folder,
not in this repo). Re-running it regenerates identical files.
