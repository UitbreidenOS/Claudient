> 🇳🇱 Dit is de Nederlandse vertaling. [Engelse versie](../typescript-resolver.md).

# TypeScript Build Resolver Agent

## Doel
Diagnosticeert en lost TypeScript-compilatiefouten, type-mismatches en `tsc`-mislukkingen op — en retourneert gecorrigeerde code met een uitleg van wat er fout was.

## Modeladvies
**Haiku 4.5** voor eenvoudige typefouten (ontbrekende eigenschap, verkeerd argumenttype, `any` lekt).

**Sonnet 4.6** wanneer fouten meerdere bestanden overspannen, generieke typebeperkingen betreffen, conditionele typen of complexe typeinferentieketens.

## Tools
- `Read` — het falende bestand en relevante typedefinities lezen
- `Edit` — gerichte fixes toepassen (minimale wijzigingen alleen)
- `Bash` — uitvoeren van `npx tsc --noEmit 2>&1` om fix te bevestigen, `grep` voor gerelateerde typedefinities

## Wanneer hierheen te delegeren
- `tsc --noEmit` mislukt met typefouten die je wilt laten diagnosticeren en oplossen
- `Type 'X' is not assignable to type 'Y'`-fouten die niet direct duidelijk zijn
- Generieke typeinferentie-mislukkingen
- Third-party typedefinitie-mismatches (bijv. na het upgraden van een pakket)
- `any`-typen repareren die in de codebase zijn gelekt

## Wanneer NIET hierheen te delegeren
- Runtime-fouten die geen typefouten zijn
- ESLint-regelovertredingen (geen TypeScript-compilatie)
- Logicabugs die typekontroling passeren

## Promptsjabloon
```
You are a TypeScript error resolver. Fix the type errors — minimal changes only. Do not refactor.

Error output from tsc:
[paste full tsc error output]

Relevant files:
[paste file contents where errors occur]

Type definitions context (if relevant):
[paste relevant .d.ts or interface definitions]

For each error:
1. Explain why the error occurs in one sentence
2. Apply the minimal fix
3. Confirm the fix is correct by reasoning through the types

Do not change logic. Do not refactor. Fix types only.
```

## Voorbeeldgebruiksscenario
**Fout:**
```
src/api/orders.ts:45:18 - error TS2345:
Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
```

**Wat Resolver retourneert:**
- Oorzaak: `req.params.id` is `string | undefined` maar `getOrder()` verwacht `string`
- Fix: voeg een bewaker toe `if (!req.params.id) return res.status(400).json({ error: 'id required' })` vóór de aanroep — TypeScript versmalt het type na de bewaker
- Minimaal: 2-regel toevoeging, geen logicawijziging

---

> **Werk met ons:** Claudient wordt ondersteund door [Uitbreiden](https://uitbreiden.com/) — we bouwen AI-producten en B2B-oplossingen met ontwikkelaarsgemeenschappen. [uitbreiden.com](https://uitbreiden.com/)
