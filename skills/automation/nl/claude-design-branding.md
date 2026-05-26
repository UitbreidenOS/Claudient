# Claude Design Brand-systeem Setup

## Wanneer activeren

- Eerste keer configuratie van Claude Design voor een project of bedrijf — geen voorafgaand ontwerpsysteem bestaat in het gereedschap
- Een nieuw clientproject starten in Claude Design waarbij de client een bestaand merk heeft
- Design-output van Claude Design stemt niet overeen met bedrijfsmerk (kleuren zijn af, typografie is verkeerd, afstand voelt inconsistent)
- Team-leden krijgen inconsistente resultaten over sessies omdat er geen gemeenschappelijk startpunt is

## Wanneer NIET gebruiken

- One-off prototype dat niet zal worden hergebruikt of doorgegeven — setup-kosten overschrijden de waarde
- Verkennen van een gloednieuw visueel identiteit waarbij geen bestaand merk bestaat — u definieert het merk, vertaalt het niet
- Snelle wegwerp-mockup voor eenmalige validatie — sla setup over en prompt rechtstreeks

## Instructies

### Stap 1: Merk-Basis

Voordat u kleuren of typografie aanraakt, geef Claude de context die alle visuele beslissingen bepaalt.

Geven:

- Bedrijfsnaam en industrie
- Doelgroep (wees specifiek — « ondernemingsaankoopmanagers van 35-55 jaar » is nuttiger dan « B2B »)
- Drie merkpersoonlijkheidsadjectieven (bijv. « nauwkeurig, toegankelijk, modern » of « brutaal, speels, energiek »)
- Toon-beschrijving: professioneel / Casual / speels / gezaghebbend
- Alle bestaande merkverklaringen of positieringslijn

Claude gebruikt dit om fundamentele visuele principes te genereren — de reasoning laag die achter elke kleur- en afstandskeuze zit. Wanneer u later vraagt « ziet dit er goed uit », beoordeelt Claude dit tegen deze principes, niet gokken.

Documenteer de uitvoer. Plak het boven aan elke nieuwe sessie als onderdeel van uw sessieprimer.

### Stap 2: Kleursysteem

Definieer alle kleuurrollen expliciet. Laat Claude de palet niet afleiden uit een enkele primaire kleur — noem alle rollen.

**Primaire palet:**
- Primair: de dominante actie-kleur (knoppen, links, sleutelmarkeringen)
- Primaire hover: 10-15% donkerder voor interactiestatussen
- Primaire subtle: 85-90% lichter voor achtergronden en tinten

**Secundaire palet:**
- Secundair: ondersteunende accentkleur
- Secundaire hover
- Secundaire subtle

**Neutraal palet:**
- Neutraal 50 tot Neutraal 950 (of gelijkwaardige schaal) — gebruikt voor oppervlakken, randen, tekst

**Semantische kleuren** — geef altijd hexwaarden op, vertrouw niet op standaardwaarden:
- Succes: meestal groen (#16A34A als referentiepunt)
- Waarschuwing: meestal amber (#D97706)
- Fout: meestal rood (#DC2626)
- Info: meestal blauw (#2563EB)

Elke semantische kleur heeft een voorgrondenset nodig — de tekstkleur die erop zit en de WCAG AA contrast passeert (4.5:1 voor lichaamstext, 3:1 voor grote tekst).

**Oppervlakte-kleuren:**
- Achtergrond: achtergrond op paginaniveau
- Oppervlak: kaart- en paneelachtergrond
- Oppervlak verheven: verheven componenten (modalen, dropdowns)
- Overlay: Scrim achter modalen

**Tekstkleuren:**
- Tekst primair: lichaamstext op lichte oppervlakken
- Tekst secundair: ondersteunende tekst, labels
- Tekst uitgeschakeld: gedempt, niet-interactieve tekst
- Tekst omgekeerd: tekst op donkere of gekleurde achtergronden

Inclusief expliciete WCAG AA-validatie voor elke tekst/achtergrondcombinatie die u definieert. Claude zal fouten markeren als u vraagt, maar het is sneller om bij definitietijd te valideren dan contrastproblemen te ontdekken bij componentgeneratie.

### Stap 3: Typografieschaal

Geef lettertypekoppeling op die overeenkomt met merkpersoonlijkheid — de koppelingskeuze geeft meer signaal over merkenkarakter dan elke andere enkele beslissing.

Veelvoorkomende koppelingpatronen:

- Gezaghebbend/Enterprise: geometrisch sans voor koppen (Inter, DM Sans) + humanistisch sans voor body (Source Sans Pro)
- Redactioneel/Premium: serif voor weergave (Playfair Display, Libre Baskerville) + sans voor body (Inter)
- Technisch/Ontwikkelaar: mono voor code-accent (JetBrains Mono) + neutraal sans voor alles anders (Inter)
- Speels/Consument: afgerond sans voor koppen (Nunito, Poppins) + neutraal sans voor body

Definieer de volledige schaal met semantische namen, niet getallen:

**Koppen:**

| Token | Grootte | Gewicht | Lijnhoogte | Gebruik |
|---|---|---|---|---|
| display | 3rem | 700 | 1.1 | Hero-kopschriften, splash-schermen |
| h1 | 2.25rem | 700 | 1.2 | Paginatitels |
| h2 | 1.875rem | 600 | 1.25 | Sectiekoppen |
| h3 | 1.5rem | 600 | 1.3 | Subsectiekoppen |
| h4 | 1.25rem | 600 | 1.35 | Kaartkoppen, zijbalkstitels |

**Body:**

| Token | Grootte | Gewicht | Lijnhoogte | Gebruik |
|---|---|---|---|---|
| body-large | 1.125rem | 400 | 1.6 | Loodparagrafen, introducties |
| body | 1rem | 400 | 1.6 | Standaard alineatekst |
| body-small | 0.875rem | 400 | 1.5 | Ondersteunende tekst, metagegevens |
| caption | 0.75rem | 400 | 1.4 | Afbeeldingsonderschriften, kleine letters |

**Utility:**

| Token | Grootte | Gewicht | Lijnhoogte | Gebruik |
|---|---|---|---|---|
| label | 0.875rem | 500 | 1.2 | Formuierlabels, tabelkopteksten |
| overline | 0.75rem | 600 | 1.2 | Categorielabels, sectiemarkringen — altijd hoofdletters |
| code | 0.875rem | 400 | 1.6 | Inlinecode, codeblokken |

Claude Design past deze tokens automatisch toe op elk gegenereerd element zodra het systeem is ingesteld. U hoeft grootten niet per prompt opnieuw op te geven.

### Stap 4: Logorichtlijnen

Geef Claude de beperkingen die het in elke uitvoer moet respecteren. Dit voorkomt dat Claude met uw logo improviseert op manieren die merkstandaarden schenden.

Geef op:

- **Beschikbare varianten:** primair (volledig logo), omgekeerd (witte/lichte versie voor donkere achtergronden), alleen pictogram (merk zonder letterwoord)
- **Goedgekeurde kleurcombinaties:** primair logo op wit, omgekeerd logo op primaire kleurachtergrond, enz.
- **Duidelijke ruimteregel:** minimale duidelijke ruimte aan alle zijden, uitgedrukt als veelvoud van een logo-eenheid (meestal de hoogte van de x-hoogte of hoofdletterteksel van het teken)
- **Minimumformaten:** minimale breedte in pixels voor digitaal gebruik, minimale breedte in millimeters voor afdruk
- **Verboden wijzigingen:** geen kleurwijziging, geen rotatie, geen uitrekking, geen dropshadows, geen omlijnstreken

Als u een merkrichtlijn-PDF met logospecificaties hebt, laadt u deze tijdens Sessie 0. Claude leest en respecteert deze beperkingen in volgende uitvoeren zonder dat u deze per sessie opnieuw hoeft op te geven.

### Stap 5: Componentenbibliotheek — Begin met vaak gebruikte componenten

Bouw eerst de componenten die Claude het vaakst zal gebruiken. Veel gebruikte componenten verschijnen op bijna elk scherm; ze goed maken elimineert de grootste bron van merkdrift.

Prioriteitsvolgorde:

**Knoppen** — definieer vier basisvarianten:
- Primair: gevuld, gebruikt `color-primary`, witte tekst
- Secundair: outlined, `color-primary` grens en tekst, transparante achtergrond
- Ghost: geen grens, `color-primary` tekst, transparante achtergrond
- Destructief: gevuld, gebruikt `color-error`, witte tekst

Voor elke variant: geef hoogte, horizontale vulling, borderradius, fonttoken op, en alle interactiestatussen (standaard, hover, actief, focus-zichtbaar, uitgeschakeld). Uitgeschakelde status moet verminderde dekking of een specifieke dempingkleur gebruiken — verwijder het element nooit uit de indeling.

**Formulierinvoeren** — definieer: tekstinvoer, textarea, selecteren, checkbox, radioknop. Voor elk: hoogte (invoeren), randkleur (standaard, focus, fout, uitgeschakeld), labelpositie, helperstekstpositie, foutberichtenstijl.

**Kaarten** — definieer varianten per inhoudstype:
- Inhoudskaart: afbeelding + titel + body + optionele CTA
- Lijstkaart: pictogram of avatar + titel + secundaire tekst + optionele actie
- Statkaart: metrische waarde + label + optionele trendindicator

Inclusief hover-status (elevatiewijziging of randhighlighting) voor interactieve kaarten.

**Navigatie** — definieer: primaire koptekst (logo + nav-links + CTA + mobiele menu-trigger), zijbalknavigatife (gegroepeerde links + actieve status + geneste links), breadcrumb.

Voor elke component: geef exacte afstand op (gebruik uw afstandschaaltoken, geen pixelwaarden), kleuren (gebruik uw kleurentokens), borderradius (consistent met uw globale radiustoken), typografietokens en alle interactiestatussen.

### Stap 6: Documentatielaag

Schrijf voor elke component in uw bibliotheek een compact gebruikscontract. Dit is de laag die misbruik voorkomt en maakt het systeem zelf-onderwijs voor teamleden.

Voor elke componentdocumentatie:

**Wanneer gebruiken** — specifieke scenario's waarin deze component de juiste keuze is. « Gebruik primaire knop voor de actie met de hoogste prioriteit op een pagina of modal. »

**Wanneer NIET gebruiken** — antipatronen. « Gebruik niet primaire knop voor meer dan één actie per scherm. Gebruik het niet voor navigatie — gebruik in plaats daarvan een link. »

**Gerelateerde componenten** — navigatiegids. « Als u een secundaire actie nodig hebt, gebruikt u secundaire knop of ghostknop. Als u inlinenavigatie nodig hebt, gebruikt u een tekstlink. »

**Toegankelijkheidsopmerkingen** — minimumvereisten:
- Focusstatus: zichtbare focusring (2px offset, `color-primary` of gelijkwaardige high-contrast ring)
- ARIA-rol: geef voor niet-native elementen op
- Kleuronafhankelijkheid: vermijd status alleen via kleur (voeg pictogram of tekstlabel naast kleur toe)
- Minimum aanraakdoel: 44x44px voor interactieve elementen

### Stap 7: Exporteren en onderhouden

Voer uw compleet ontwerpsysteem gelijktijdig in drie indelingen uit, zodat het door elke downstreamtoolchain kan worden verbruikt.

```css
/* CSS aangepaste eigenschappen — plak in :root in globaal stylesheet */
:root {
  /* Color — primary */
  --color-primary: #2563EB;
  --color-primary-hover: #1D4ED8;
  --color-primary-subtle: #EFF6FF;

  /* Color — semantic */
  --color-success: #16A34A;
  --color-warning: #D97706;
  --color-error: #DC2626;
  --color-info: #2563EB;

  /* Color — surface */
  --color-background: #FFFFFF;
  --color-surface: #F9FAFB;
  --color-surface-raised: #FFFFFF;

  /* Color — text */
  --color-text-primary: #111827;
  --color-text-secondary: #6B7280;
  --color-text-disabled: #D1D5DB;
  --color-text-inverse: #FFFFFF;

  /* Typography */
  --font-display: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-full: 9999px;
}
```

```json
{
  "color": {
    "primary": { "value": "#2563EB" },
    "primary-hover": { "value": "#1D4ED8" },
    "primary-subtle": { "value": "#EFF6FF" },
    "success": { "value": "#16A34A" },
    "warning": { "value": "#D97706" },
    "error": { "value": "#DC2626" },
    "info": { "value": "#2563EB" },
    "background": { "value": "#FFFFFF" },
    "surface": { "value": "#F9FAFB" },
    "text-primary": { "value": "#111827" },
    "text-secondary": { "value": "#6B7280" },
    "text-disabled": { "value": "#D1D5DB" },
    "text-inverse": { "value": "#FFFFFF" }
  },
  "spacing": {
    "1": { "value": "0.25rem" },
    "2": { "value": "0.5rem" },
    "4": { "value": "1rem" },
    "6": { "value": "1.5rem" },
    "8": { "value": "2rem" }
  },
  "radius": {
    "sm": { "value": "0.25rem" },
    "md": { "value": "0.5rem" },
    "lg": { "value": "0.75rem" },
    "full": { "value": "9999px" }
  }
}
```

```js
// tailwind.config.js — extend theme with brand tokens
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          subtle: '#EFF6FF',
        },
        success: '#16A34A',
        warning: '#D97706',
        error: '#DC2626',
        info: '#2563EB',
        surface: '#F9FAFB',
        'text-primary': '#111827',
        'text-secondary': '#6B7280',
        'text-disabled': '#D1D5DB',
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
      },
    },
  },
}
```

Versiecontrole het tokens JSON-bestand. Behandel het als waarheidsgebron — de CSS en Tailwind configs zijn ervan afgeleid. Wanneer het merk zich ontwikkelt, werk eerst de tokens JSON bij, genereer vervolgens de andere indelingen opnieuw.

### Validatiestap

Voordat u het systeem op een echt project gebruikt, voer een validatiecontrole uit. Genereer één testcomponent — een knoppengroep met primaire, secundaire, ghost- en destructieve varianten — en controleer:

- Kleuren komen exact overeen met uw gedefinieerde hexwaarden
- Typografietokens worden toegepast (niet Claude-standaardwaarden)
- Afstand en borderradius zijn consistent met uw schaal
- Hover-statussen zijn aanwezig en correct

Als de uitvoer in één dimensie er verkeerd uitziet, laadt u uw afgewerkte productschermafbeeldingen en sessieprimer opnieuw, genereer vervolgens opnieuw. Uitlijningsfout op validatietijd wordt bijna altijd veroorzaakt door onvolledige context in Sessie 0, niet Claude Design-drift.

Repareer het voordat u echte schermen bouwt. Merkdrift over 12 gegenereerde schermen corrigeren is duur. Corrigeren op het knoppengroupstadium kost één prompt.

## Voorbeeld

Een agentschap stelt een client e-commerce merk in — sportkleding, direct-to-consumer, doelgroep 25-40 actieve stedelijke professionals.

**Sessie 0 kleursysteempromppt:**

```
Define the complete color system for Velo, a sportswear brand.
Personality: bold, energetic, precise.
Primary: #E11D48 (rose-600). Compute primary-hover at 15% darker, primary-subtle at 90% lighter.
Secondary: #0EA5E9 (sky-500). Same derivation.
Neutral scale: use slate (slate-50 through slate-950).
Semantic: success #16A34A, warning #D97706, error #DC2626, info #0EA5E9.
Surface: background white, surface slate-50, surface-raised white.
Text: primary slate-900, secondary slate-500, disabled slate-300, inverse white.
Output as CSS custom properties, design tokens JSON, and Tailwind config extension.
Validate WCAG AA contrast for all text/background pairs and flag failures.
```

**Verwachte uitvoer:** compleet tokenset in alle drie indelingen, met een contrastvalidatietabel die eventuele fouten opmerkt (witte tekst op primair-subtle zal mislukken — Claude moet dit markeren en slate-900 of primair als de juiste voorgrondfkleur voorstellen).

**Latere sessiegebruik:** plak de 150-woord-sessieprimer (merkpersoonlijkheid, primaire kleur, typografiekoppeling) aan het begin van elke nieuwe sessie. Claude past de volledige tokenset toe zonder bestanden opnieuw te uploaden. Productpagina, cart-lade, checkoutflow — alle gegenereerd met consistente merktoepassing over sessies.
