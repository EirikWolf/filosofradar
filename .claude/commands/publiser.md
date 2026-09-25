---
description: Bygg, test og publiser – forhåndsvisning først, produksjon etter OK
---

Publiser appen. $ARGUMENTS

1. `git status` må være ren; foreslå commit hvis ikke.
2. `npm run check`. Stopp ved feil.
3. `npm run build`. Rapporter størrelsen på bygget og antall filosofer.
4. `firebase hosting:channel:deploy preview --expires 7d`. Gi lenken og en testliste:
   radaren på mobil, tidsmaskinen, et filosofkort, quizen, listevisningen, rolig modus.
5. **Stopp og vent** på «live».
6. `firebase deploy --only hosting`. Vis produksjons-URL.
7. Foreslå en versjonstag (`git tag vX.Y.Z`), oppdater PLAN.md, og forklar kort hvordan man ruller tilbake
   i Firebase-konsollet (Hosting → tidligere versjon → Rull tilbake).
