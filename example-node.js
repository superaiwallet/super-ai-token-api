// Super AI — token reading API
// Plain Node, no dependencies. Needs Node 18+ (built-in fetch).
//
//   node example-node.js 0x514910771AF9Ca656af840dff83E8264EcF986CA

const API = 'https://analyse.superaiwallet.com/api/';

async function lire(adresse) {
  const r = await fetch(API + adresse, {
    headers: { accept: 'application/json' }
  });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  return r.json();
}

function afficher(t) {
  console.log(`\n${t.nom} (${t.symbole}) — ${t.reseau}`);
  console.log(`${t.points.renseignes} of ${t.points.total} points answered`);
  console.log('-'.repeat(60));

  let famille = null;
  for (const l of t.lignes) {
    if (l.famille !== famille) {
      famille = l.famille;
      console.log(`\n[${famille}]`);
    }
    const marque = { ok: '+', voir: '!', inconnu: '?', info: ' ' }[l.etat] || ' ';
    console.log(`  ${marque} ${l.libelle.padEnd(26)} ${l.valeur}   (${l.source})`);
  }

  console.log(`\nFull reading: ${t.fiche}`);
}

const adresse = process.argv[2];
if (!adresse) {
  console.error('usage: node example-node.js <token address>');
  process.exit(1);
}

lire(adresse).then(afficher).catch(e => {
  console.error('could not read that address:', e.message);
  process.exit(1);
});
