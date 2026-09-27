// Super AI — drop-in for a Telegram bot
//
// Paste this into your own bot and it will answer any token address
// that anyone writes in a chat or a group. No command needed.
//
// Works with node-telegram-bot-api, telegraf, grammY — the only thing
// that changes is how you hook it up at the bottom.

const API = 'https://analyse.superaiwallet.com/api/';

// Ethereum / BNB Chain style, Tron style, Solana style.
const ADRESSE = /\b(0x[a-fA-F0-9]{40}|T[1-9A-HJ-NP-Za-km-z]{33}|[1-9A-HJ-NP-Za-km-z]{32,44})\b/;

// Don't answer the same address twice within a few minutes.
const vus = new Map();
const FROID = 5 * 60 * 1000;

function dejaVu(chatId, adresse) {
  const cle = chatId + '|' + adresse;
  const t = vus.get(cle);
  const now = Date.now();
  if (t && now - t < FROID) return true;
  vus.set(cle, now);
  if (vus.size > 5000) vus.clear();
  return false;
}

async function lecture(adresse) {
  const r = await fetch(API + adresse, { headers: { accept: 'application/json' } });
  if (!r.ok) return null;
  return r.json();
}

function enTexte(t) {
  const lignes = [
    `*${t.nom}* (${t.symbole}) · ${t.reseau}`,
    `${t.points.renseignes} of ${t.points.total} points answered`,
    ''
  ];

  for (const l of t.lignes) {
    // four states: ok, info, voir (worth a close look), inconnu (nobody knew)
    const marque = { ok: '✓', voir: '❗', inconnu: '·', info: '–' }[l.etat] || '–';
    lignes.push(`${marque} ${l.libelle}: ${l.valeur}  _(${l.source})_`);
  }

  lignes.push('', `[Full reading](${t.fiche}) · [Super AI](https://analyse.superaiwallet.com)`);
  return lignes.join('\n');
}

/**
 * Give it the text of a message; get back what to send, or null.
 * This is the only function you really need.
 */
async function repondreA(texte, chatId) {
  const m = texte && texte.match(ADRESSE);
  if (!m) return null;

  const adresse = m[1];
  if (dejaVu(chatId, adresse)) return null;

  const t = await lecture(adresse);
  if (!t) return null;

  return enTexte(t);
}

// ---------------------------------------------------------------
// Hooking it up — node-telegram-bot-api
// ---------------------------------------------------------------
//
// const TelegramBot = require('node-telegram-bot-api');
// const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
//
// bot.on('message', async (msg) => {
//   const reponse = await repondreA(msg.text, msg.chat.id);
//   if (reponse) {
//     bot.sendMessage(msg.chat.id, reponse, {
//       parse_mode: 'Markdown',
//       disable_web_page_preview: true,
//       reply_to_message_id: msg.message_id
//     });
//   }
// });
//
// ---------------------------------------------------------------
// Hooking it up — grammY
// ---------------------------------------------------------------
//
// bot.on('message:text', async (ctx) => {
//   const reponse = await repondreA(ctx.message.text, ctx.chat.id);
//   if (reponse) await ctx.reply(reponse, { parse_mode: 'Markdown' });
// });

module.exports = { repondreA, lecture, enTexte, ADRESSE };
