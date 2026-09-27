# Super AI — token reading API

**Read any token in seconds. No account, no key, no sign-up.**

One HTTP call returns up to 21 points about a token — and every single point names
the source it came from, with a link back to it.

21 points on Ethereum, BNB Chain and Tron; 18 on Solana, where some of the
contract questions do not apply.

<img src="https://analyse.superaiwallet.com/badge/0x514910771AF9Ca656af840dff83E8264EcF986CA.svg" alt="Super AI reading for LINK">

*(that badge above is live — it is the API answering right now)*

---

## Quick start

```
https://analyse.superaiwallet.com/api/<TOKEN_ADDRESS>
```

That's it. No key to request, no header to set, no registration form.

```bash
curl https://analyse.superaiwallet.com/api/0x514910771AF9Ca656af840dff83E8264EcF986CA
```

Works on **Ethereum, BNB Chain, Solana and Tron**. The chain is detected from the
address — you don't pass it.

---

## Three ways to use it

### 1. The raw answer, for your own bot

```
https://analyse.superaiwallet.com/api/<TOKEN_ADDRESS>
```

Plain JSON, so your bot can say it in its own words.

### 2. A badge on your page

```html
<img src="https://analyse.superaiwallet.com/badge/<TOKEN_ADDRESS>.svg" alt="Super AI">
```

An SVG that updates by itself. Shows how many of the points came back with an answer.

### 3. The full reading, embedded

```html
<iframe src="https://analyse.superaiwallet.com/j/<TOKEN_ADDRESS>"
        width="100%" height="900" style="border:0" loading="lazy"></iframe>
```

A whole page inside yours, in **eighteen languages**.

---

## What comes back

```jsonc
{
  "adresse": "0x514910771AF9Ca656af840dff83E8264EcF986CA",
  "reseau":  "ethereum",
  "nom":     "ChainLink Token",
  "symbole": "LINK",
  "points":  { "renseignes": 20, "total": 21 },
  "lu_le":   "2026-09-27T16:14:41.134Z",
  "lignes": [
    {
      "famille":     "contrat",
      "libelle":     "Sale simulation",
      "valeur":      "Passed",
      "etat":        "ok",
      "source":      "Honeypot.is",
      "lien_source": "https://honeypot.is/ethereum?address=0x5149..."
    }
    // ... 20 more
  ],
  "fiche": "https://analyse.superaiwallet.com/j/0x5149...",
  "badge": "https://analyse.superaiwallet.com/badge/0x5149....svg",
  "robot": "https://t.me/SuperAIAnalyse_bot",
  "par":   "Super AI · analyse.superaiwallet.com"
}
```

### Top level

| Field | Meaning |
|---|---|
| `adresse` | the token address you asked about |
| `reseau` | `ethereum`, `bsc`, `solana` or `tron` — detected, not supplied |
| `nom` / `symbole` | token name and ticker |
| `points.renseignes` | how many of the points came back with an answer |
| `points.total` | how many points were looked for |
| `lu_le` | when the reading was taken (ISO 8601, UTC) |
| `lignes` | the points themselves — see below |
| `fiche` | human-readable page for this token |
| `badge` | the SVG for this token |
| `robot` | the Telegram bot |

### Each line in `lignes`

| Field | Meaning |
|---|---|
| `famille` | `contrat`, `marche`, `offre`, `porteurs` or `projet` |
| `libelle` | what was looked at, in plain words |
| `valeur` | what was found, already formatted for reading |
| `etat` | `ok`, `info` or `inconnu` |
| `source` | who said it — GoPlus, Honeypot.is, DexScreener, CoinGecko, Jupiter, GitHub — or `null` when the point does not apply on that chain |
| `lien_source` | link to that source, so anyone can check |

`etat` is deliberately not a verdict. It has four values:

- `ok` — the point came back with a settled answer
- `info` — a figure or a fact, neither good nor bad on its own
- `voir` — the answer came back, and it is one the reader will want to look at closely
- `inconnu` — nobody had the answer, or the point does not apply on that chain

Handle all four. `voir` is not an error and not a warning — it simply marks the
lines a reader should not skip.

---

## The points

**Contract** — code published · sale simulation · buy / sell tax · owner ·
more can be created · code can be replaced · transfers can be paused ·
addresses can be blocked

**Market** — liquidity · traded in 24 h · pools · first pool

**Supply** — total supply · in circulation · maximum supply

**Holders** — holders · held by the 10 largest

**Project** — website · white paper · social accounts · code repository

On Solana, the three contract questions that have no meaning there are left out,
which is why the total reads 18 instead of 21.

---

## Three rules this API keeps

1. **Every line names its source.** Nothing is asserted without saying who said it
   and linking to them.
2. **What is not found is written `inconnu`** — never a zero in its place.
   A missing answer and a zero are not the same thing, and confusing them is how
   readings get misread.
3. **No score out of 100, no advice.** Super AI describes; the reader decides.

---

## Examples

- [`example-node.js`](example-node.js) — plain Node, no dependencies
- [`example-python.py`](example-python.py) — plain Python, standard library only
- [`example-telegram-bot.js`](example-telegram-bot.js) — drop-in: answer any address pasted in a chat

---

## Rather not call it yourself?

The Telegram bot does the same reading, in eighteen languages:
**[@SuperAIAnalyse_bot](https://t.me/SuperAIAnalyse_bot)**

Add it to a group and it answers any token address pasted there — no command needed.

---

## Languages

The embedded page (`/j/`) and the bot speak eighteen languages:
English, français, español, português (BR), português (PT), Deutsch, italiano,
Nederlands, русский, Türkçe, العربية, עברית, 中文, 日本語, 한국어, हिन्दी,
Tiếng Việt, Bahasa Indonesia.

---

## Fair use

Open to everyone, no key. Please cache what you can and be reasonable —
keeping it keyless only works if nobody hammers it.

---

## Who

Built by **Guan Way Limited** (冠威股份有限公司), Hong Kong.

- Reading page — <https://analyse.superaiwallet.com>
- How to plug it in — <https://analyse.superaiwallet.com/brancher>
- Super AI Wallet — <https://superaiwallet.com>

## Licence

The examples in this repository are MIT — see [LICENSE](LICENSE).
Use them, change them, ship them.
