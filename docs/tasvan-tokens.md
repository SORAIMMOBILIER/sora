# Jetons Tasvan — relevé mesuré, pas interprété

Source : CSS inline complet de https://tasvanlombok.com, récupéré le 24/10/2026
(un seul `<style>` dans le `<head>`, 307 lignes, aucune feuille externe à part
Google Fonts). Valeurs copiées telles quelles depuis cette feuille — ce
document n'est PAS une estimation visuelle, c'est la source exacte. Capture
brute conservée dans `/private/tmp/.../scratchpad/tasvan.css` et
`tasvan.html` pour toute vérification ultérieure.

## Polices

```
Google Fonts : League+Spartan:wght@200;300;400 & Montserrat:wght@400;500;600
--display: "League Spartan","Futura","Avenir Next","Helvetica Neue",Arial,sans-serif;
--body:    "Montserrat","Helvetica Neue",Arial,sans-serif;
```

- **Display** (League Spartan) : tous les `h1,h2,h3`, les montants de prix,
  les gros chiffres, les questions FAQ, le nom de marque dans le header, les
  citations. Toujours en graisse **300** (`h1,h2,h3`), sauf hero `h1` en
  **200** et les très gros chiffres (`.numbers b`, `.mgmt .big`, `.pay .pct`)
  en **200**.
- **Body** (Montserrat) : tout le reste — paragraphes, kicker/surtitres,
  boutons, specs, labels.
- Sur cette branche : **pas d'Eightly, pas de Hanken, pas de doré** (accent
  taupe). Chargées via `next/font/google` (`League_Spartan`, `Montserrat`),
  poids exacts ci-dessus. Le logo SORA reste (texte, pas le monogramme
  Tasvan).

## Couleurs (mode clair — celui utilisé)

```
--ink:      #1f1f1e   texte principal / fond des boutons pleins / fond carte sombre alt
--paper:    #ffffff   fond de page
--stone:    #f1f0ed   fond des bandes "alt" (PAS une bande sombre — beige-gris clair)
--stone-2:  #e4e2dd   (peu utilisé, variante de stone)
--line:     #d6d4ce   tous les filets/bordures
--muted:    #65635e   texte secondaire (gris chaud)
--card:     #242423   fond des cartes sombres (tuile prix, carte duo "dark")
--card-ink: #ffffff   texte sur carte sombre
--card-muted: #b9b7b1 texte secondaire sur carte sombre
```

Le site a aussi un mode sombre (`prefers-color-scheme`/`data-theme`) avec des
valeurs inversées — **non reproduit sur cette branche** (le reste du site
SORA ne gère pas de bascule clair/sombre, et ce n'est pas demandé).

**Important, contredit volontairement la refonte précédente** : Tasvan
utilise des **coins arrondis** (`border-radius:18px` sur les tuiles prix,
cartes duo, cadre du plan de masse, `999px` sur les boutons-filtre et le
bouton WhatsApp) et des **cartes avec fond plein** (pas seulement des
filets). La règle "pas de carte, pas d'arrondi" du round précédent était
NOTRE adaptation libre, pas une propriété réelle de Tasvan — sur cette
branche, on la laisse de côté pour reproduire fidèlement.

## Base

```
body            { font: 400 16px/1.65 var(--body); color: var(--ink); background: var(--paper) }
h1,h2,h3        { font-family: var(--display); font-weight:300; letter-spacing:-.01em; line-height:1.08; margin:0 }
.kicker (surtitre) { font: 500 12px/normal var(--body); letter-spacing:.22em; text-transform:uppercase; color:var(--muted) }
.h2 (titre de bloc) { font-size: clamp(36px,5.4vw,64px); max-width:16ch }
container .wrap { max-width:1180px; margin:0 auto; padding:0 var(--pad) }
--pad           { clamp(20px,5vw,64px) }
section         { padding: clamp(72px,11vw,140px) 0 }  (vertical only — horizontal via .wrap)
.alt            { background: var(--stone) }  — bandes alternées (PAS sombres)
```

## Boutons

```
.btn (plein)  { inline-flex, min-height:48px, padding:15px 28px,
                font:500 12.5px var(--body), letter-spacing:.18em, uppercase,
                border:1px solid var(--ink), bg:var(--ink), color:var(--paper),
                radius:0, hover → bg transparent + color ink }
.btn.ghost    { bg transparent, color ink, border ink,
                hover → bg ink, color paper }
header .btn   { padding:11px 18px, font-size:11px }  (plus petit)
.hero .btn    { bg #fff, color #1f1f1e, border #fff ; hover → transparent + blanc }
.hero .btn.ghost { bg transparent, color #fff, border rgba(255,255,255,.85) }
```

## Header

```
.top    { sticky, height:68px, bg paper 92% + blur(10px), border-bottom 1px line }
.brand .word { display font 300, 19px, letter-spacing .42em, uppercase }
≤520px  { bouton caché, logo réduit à 17px/.36em }
```

## Hero (nous : disposition texte-gauche / vidéo-droite conservée, tailles Tasvan)

```
.hero h1   { clamp(46px,9vw,108px), weight 200, max-width 12ch, line-height .98 }
.hero .lede (sous-titre display) { display font 300, clamp(20px,2.6vw,28px),
             margin-top 26px, max-width 32ch, line-height 1.3 }
.hero .sub (texte courant)       { margin-top 14px, max-width 48ch,
             color rgba(255,255,255,.86), 15.5px }
.hero .kicker { color rgba(255,255,255,.88), margin-bottom 22px }
.hero .ctas   { flex, gap 14px, margin-top 34px }
```

## Lignes de prix — en réalité 3 CELLULES bordées (pas des lignes à filet)

```
.quick { grid-template-columns: repeat(3,1fr) ; border-bottom 1px line }
.q     { border-right 1px line (dernier: 0), padding 30px/32px/32px,
         hover bg stone }
.q .kicker { 11px }
.q .v (prix)  { display font 300, clamp(30px,3.4vw,42px), margin-top 10, line-height 1.1 }
.q small (spec) { color muted, 13px, margin-top 6 }
≤760px : empile en 1 colonne, chaque cellule devient une grille
         [kicker+spec | prix] (prix aligné à droite)
```

## Bloc villa (`.villa`)

```
.villa  { grid 1.25fr / 1fr, gap clamp(28px,5vw,64px), align-items start }
         ≤900px → 1 colonne
.vhead  { margin-bottom 24px }
.vhead h3 (nom modèle) { clamp(34px,4.4vw,50px) }
.vhead .spec            { color muted, margin-top 8, 14.5px }
.car (galerie glisser)  { flex, scroll-snap-x, figure flex-basis 100%, img aspect 3/2 object-cover }
.car figcaption          { flex justify-between, 13px muted, margin-top 10 } (légende ← / compteur →)
.swipe ("N PHOTOS · FAITES GLISSER") { 12px, letter-spacing .14em, uppercase, muted, margin-top 4 }
.plan   { margin-top 14px, bg #fff, border 1px line, padding 18px }
.plan img { margin auto, max-height 520px, width auto }

.prices { grid 1fr/1fr, gap 12px } — DEUX tuiles sombres côte à côte (pas une + une note)
.price  { bg card(#242423), color card-ink, radius 18px, padding 22px/22px/20px }
.price .amt (montant) { display font 300, clamp(30px,3.4vw,40px), line-height 1 }
.price .idr (pastille IDR) { non reproduit — pas de valeur Rp disponible }
.price .lab (légende)      { 11px, letter-spacing .16em, uppercase, color card-muted, margin-top 12 }

.roi (3 cellules chiffres) { grid 3 cols, border 1px line, radius 18px, margin-top 12,
                              cellules séparées par border-right interne (pas de grille de boîtes séparées) }
.roi b (chiffre) { display font 300, clamp(22px,6vw,30px), line-height 1.05, nowrap }
.roi span (libellé) { 12px, muted, line-height 1.35, margin-top 6 }
.note (démenti revenus) { 12.5px, muted, margin-top 14, line-height 1.55 }

.specs (tableau specs) { border-top 1px line }
.specs li { flex justify-between, padding 12px 0, border-bottom 1px line, 14.5px }
.specs li span:last-child { color MUTED (valeur grisée, PAS le libellé) }
  ⚠ inverse de notre LabelValueTable actuel (libellé gris / valeur foncée) :
    ici libellé en ink normal à gauche, VALEUR en gris à droite.

.villa .btn { margin-top 28px, width 100% }  (bouton plein pleine largeur)
```

## Plan de paiement (`.pay`) — remplace notre Timeline

```
.pay li { grid [minmax(128px,auto) / 1fr], gap 28, padding 26px 0, border-top 1px line
          (dernier élément : + border-bottom) }
.pay .pct (valeur, ex. "10 %") { display font 200, 52px, line-height .9, nowrap }
.pay h3 (titre étape)          { BODY font (Montserrat) 16px, weight 600 }
.pay .d (sous-label, ex. date) { 12px, letter-spacing .16em, uppercase, muted, margin-top 6 }
.pay p (description)           { muted, 14.5px, margin-top 8, max-width 60ch }
≤520px : colonne unique, .pct réduit à 44px
```

## Cartes "duo" (`.duo`) — modalité d'acquisition + gros chiffre garanti

```
.duo    { grid 1fr/1fr, gap 16, margin-top 48 ; ≤760px → 1 colonne }
.duo article      { border 1px line, radius 18px, padding 30px/28px }
.duo article.dark { bg card, color card-ink, border-color card }
.duo h3 (titre carte) { 32px display font (hérite h1-h3) }
.duo .when (sous-titre) { 12px, letter-spacing .16em, uppercase, margin-top 10, muted
                           (sur .dark : color card-muted) }
.duo p  { margin-top 18, 15px }
```

## Gestion locative (`.mgmt`, adapté : 3 cellules `.roi` au lieu d'1 gros chiffre, demandé explicitement)

```
.mgmt   { grid .9fr/1.1fr, align-items center ; ≤860px → 1 colonne }
.mgmt ul (lignes à filet) { grid 2 colonnes, gap 0/28 }
.mgmt li { padding 14px 0, border-bottom 1px line, 14.5px }
```
Nous : 3 cellules `.roi` au-dessus du titre+intro, PUIS la liste 2 colonnes
de 6 lignes (demande explicite du client, qui remplace le `.big` chiffre
unique par nos trois statistiques 10,2 % / 82 % / 93 %).

## FAQ (`.faq`)

```
.faq            { border-top 1px line, margin-top 44 }
.faq details    { border-bottom 1px line }
.faq summary    { padding 24px/44px/24px/0, DISPLAY font 300,
                   clamp(20px,2.3vw,25px), line-height 1.25 — pas du petit texte,
                   la question est à l'échelle d'un sous-titre }
"+ / ×"         { 14×14px, deux barres en dégradé (horizontale+verticale),
                   rotate(45deg) à l'ouverture }
.faq details p (réponse) { padding 0/0/26px, muted, max-width 70ch }
```

## Galerie (`.gallery`) — grille magazine asymétrique, 6 images

```
grid-template-columns: repeat(12,1fr); gap 16; margin-top 56
.g-a (pleine largeur, 21:9)  — span 12
.g-b (span 7) + .g-c (span 5, aspect auto, height calc(100% - 34px))
.g-d / .g-e / .g-f (span 4 chacune — 3 égales)
figcaption { 13.5px, muted, margin-top 12 }
≤760px : empile en colonne simple, g-a/g-c repassent en 3:2
```

## Équipe (`.team`)

```
img        { aspect 16/8, object-cover, margin-top 48 }
blockquote { display font 300, clamp(22px,2.8vw,32px), line-height 1.35,
             max-width 36ch, margin-top 40 }
cite       { body font normal, 13px, letter-spacing .16em, uppercase, muted,
             margin-top 22 }
```

## Contact (`.contact`)

```
fond sombre plein écran avec photo (opacity .55) + dégradé ; texte blanc
.wrap { grid 1fr/1fr, gap clamp(32,6vw,80) ; ≤860px → 1 colonne }
h2    { clamp(38px,5.4vw,64px) }
.side p   { margin-top 20, color rgba(255,255,255,.85), max-width 44ch }
.direct   { margin-top 30, 14px, rgba(255,255,255,.85) }
.direct a { display font 300, 28px, blanc }  (téléphone direct)

.formcard { bg paper, color ink, padding clamp(24,4vw,40) }
.formcard h3  { 30px }
.formcard .hint { muted, 14px, margin-top 8 }
.field span (label de champ) { 11.5px, letter-spacing .14em, uppercase, muted }
.field input/select { min-height 52px, border 1px line, radius 0, font-size 16px }
.formcard .legal { 12px, muted, margin-top 14, line-height 1.5 }
```
Nous : pas de formulaire GoHighLevel inline disponible dans ce bac à sable —
on garde `EntretienEmbed` (même composant qu'avant) dans la colonne droite,
habillé avec `.formcard`.

## Pied de page

```
footer       { padding 56px/0/calc(110px+safe-area), border-top 1px line,
               13.5px, muted }
footer .wrap { grid 1.2fr/1fr/1fr, gap 32 ; ≤760px → 1 colonne }
footer b (titre colonne) { display block, color ink, weight 500,
               margin-bottom 10, 12px, letter-spacing .16em, uppercase }
footer .disc (démenti)   { grid-column 1/-1, 12px, line-height 1.6,
               border-top 1px line, padding-top 24 }
```

## Ordre des blocs (mesuré sur le DOM réel, 18 `<section>`/`<header>`/`<footer>`)

```
0  header .top            — logo + bouton plein
1  #villas .product        — 3 cellules prix (.quick) + blocs villa (.villa ×3)
5  .alt                    — Plan de paiement (.pay)
6  (plain)                 — Modalité d'acquisition (.duo)
7  .alt                    — Gestion locative (gros chiffre + liste)
8  #unites                 — plan de masse interactif  → remplacé chez nous
                              par "Vos garanties" (demande explicite)
9  (plain)                 — FAQ (.faq)
10 .alt                    — "Une adresse entre collines et océan" (.intro-grid)
11 (plain)                 — Galerie photo (.gallery)
12 .alt                    — Art de vivre & équipements (.amen)
13 (plain)                 — Emplacement (.intro-grid + .scroller)
14 .team.alt               — Équipe
15 .video-section           — vidéos  → remplacé chez nous par nos 3 vraies
                              vidéos témoignages (même composant que l'autre branche)
16 #contact .contact        — contact (texte + formulaire)
17 footer                   — 3 colonnes + démenti
```
Alternance stricte blanc / `.stone` à chaque section, sauf hero et contact
(fond sombre avec photo).

## Plans

Les 8 WebP existants (`public/seseh/plans/<modele>/{rdc,etage}.webp`) sont
dupliqués sur cette branche en **niveaux de gris, contraste légèrement
renforcé** (`public/seseh/plans/<modele>/{rdc,etage}-gray.webp`), pour
coller au traitement noir-sur-blanc de `.plan` chez Tasvan (leurs plans sont
déjà en lignes noires sur fond blanc, sans la texture verte "paysage" qu'on
a sur les nôtres).

## Ce qui ne sera pas reproduit à l'identique (annoncé à l'avance)

- **Mode sombre** (`prefers-color-scheme`/`data-theme`) : non géré sur cette
  branche, comme sur le reste du site SORA.
- **Pastille IDR** sur les tuiles prix : aucune valeur en Rupiah dans notre
  contenu — tuile sans pastille plutôt qu'une valeur inventée.
- **Plan de masse interactif cliquable** (`#unites`, points sur un plan
  SVG/PNG avec filtre par type) : remplacé par "Vos garanties" sur demande
  explicite, pas une impossibilité technique.
- **Formulaire de contact inline** (GoHighLevel) : pas de code d'intégration
  disponible dans ce bac à sable ; on garde notre `EntretienEmbed` existant
  dans le même emplacement visuel (`.formcard`).
- **Bulle WhatsApp flottante** et **carrousel plein écran en fond de hero**
  (`.reel`, 5 images en fondu) : hors périmètre (on garde notre hero
  vidéo existant, avec les styles Tasvan dessus) — non demandé non plus.
- **Taille du titre h1 du hero** : mesurée à `clamp(46px,9vw,108px)`, mais
  réduite à `clamp(34px,4.6vw,58px)` dans notre implémentation. Chez
  Tasvan ce titre tient en 3-4 mots sur un hero plein écran ; le nôtre est
  une phrase de 16 mots dans une colonne de 5/12 — à la taille mesurée, il
  aurait produit 9 lignes très courtes avant même d'atteindre la vidéo.
  Seule taille réduite de toute la page ; tout le reste (h2, kicker,
  boutons, specs, FAQ, etc.) utilise la valeur mesurée sans arrondi.
