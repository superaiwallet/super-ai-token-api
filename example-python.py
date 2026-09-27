"""Super AI - token reading API

Plain Python, standard library only.

    python example-python.py 0x514910771AF9Ca656af840dff83E8264EcF986CA
"""

import json
import sys
import urllib.request

API = "https://analyse.superaiwallet.com/api/"


def lire(adresse: str) -> dict:
    req = urllib.request.Request(
        API + adresse,
        headers={"Accept": "application/json", "User-Agent": "super-ai-example/1.0"},
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))


def afficher(t: dict) -> None:
    print(f"\n{t['nom']} ({t['symbole']}) - {t['reseau']}")
    print(f"{t['points']['renseignes']} of {t['points']['total']} points answered")
    print("-" * 60)

    famille = None
    for l in t["lignes"]:
        if l["famille"] != famille:
            famille = l["famille"]
            print(f"\n[{famille}]")
        marque = {"ok": "+", "voir": "!", "inconnu": "?", "info": " "}.get(l["etat"], " ")
        print(f"  {marque} {l['libelle']:<26} {l['valeur']}   ({l['source']})")

    print(f"\nFull reading: {t['fiche']}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit("usage: python example-python.py <token address>")
    try:
        afficher(lire(sys.argv[1]))
    except Exception as e:
        sys.exit(f"could not read that address: {e}")
