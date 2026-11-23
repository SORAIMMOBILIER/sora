# Instructions pour Claude Code (ou toute autre IA) sur ce dépôt

## Compte partagé — règle d'attribution des commits

Ce dépôt (et les comptes GitHub `SORAIMMOBILIER` / Vercel `sora-immobilier`) peuvent être
utilisés par plusieurs personnes différentes avec les mêmes identifiants de connexion
(ex : Steven, Gabriel, ou toute autre personne à l'avenir). Le fait que la connexion soit
partagée ne doit JAMAIS empêcher de savoir qui a réellement demandé ou fait une modification.

**Règle obligatoire, avant le premier commit d'une session :**

1. Demander explicitement à la personne qui est devant le clavier : *« Qui es-tu ? »*
   (si ce n'est pas déjà clair dans la conversation).
2. Utiliser son vrai nom (et son vrai email si elle le donne) comme auteur du commit,
   par exemple :
   - `git commit --author="Steven <steven@sora-immobilier.com>"`
   - `git commit --author="Gabriel <email-de-gabriel>"`
3. Ne jamais attribuer un commit à un nom générique (ex : `SORAIMMOBILIER`, `contact@...`,
   `admin`, etc.). Chaque commit doit refléter la vraie personne humaine à l'origine de la
   demande, même si la session tourne sous un compte partagé.
4. Cette règle s'applique **à vie**, pour tout le monde, pas seulement pour les personnes
   citées ci-dessus. Si une nouvelle personne utilise ce compte un jour, lui demander son
   nom aussi et faire pareil.

But : garder une trace fiable de qui a fait quoi dans l'historique git, même quand l'accès
technique (GitHub, Vercel, Claude) est partagé entre plusieurs personnes.

## Travail à plusieurs sur le code — règles obligatoires

Gabriel, Steven et leurs sessions Claude travaillent en parallèle sur ce dépôt. Pour ne
jamais écraser le travail de l'autre ni casser le site en ligne :

1. **Ne jamais pousser directement sur `main`.** `main` = le site en ligne.
2. **Toujours partir de la dernière version de `main`** (`git fetch` puis branche depuis
   `origin/main`) avant de commencer un changement.
3. **Une branche par sujet**, nommée `<prénom>/<sujet>` (ex. `steven/securite-formulaires`),
   fusionnée vite (dans la journée ou les deux jours).
4. **Publier = pull request** → aperçu Vercel testé → accord explicite de Gabriel → fusion.
   Une seule pull request fusionnée à la fois ; vérifier le site en ligne avant la suivante.
5. **Conflit à la fusion** : ne jamais forcer (`git push --force` interdit sur `main`),
   ne jamais écraser la version de l'autre ; résoudre en gardant les deux changements
   et le signaler à la personne concernée.
6. **Avant toute publication, Claude rappelle ces règles** et vérifie : branche à jour avec
   `main`, aperçu testé, accord de Gabriel obtenu, aucune autre pull request en cours de fusion.

### Réglages hors code (pas d'historique, le dernier qui enregistre gagne)

Variables d'environnement et domaines Vercel, réglages GoHighLevel, Meta, Google Drive :
un seul responsable par outil (Steven pendant la mission sécurité). Toute personne qui doit
y toucher prévient d'abord dans le groupe WhatsApp, et annonce chaque changement fait.
