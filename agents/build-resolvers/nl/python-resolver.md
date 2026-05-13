> 🇳🇱 Dit is de Nederlandse vertaling. [Engelse versie](../python-resolver.md).

# Python Build Resolver Agent

## Doel
Diagnosticeert en lost Python-importfouten, runtime-uitzonderingen, type-annotatiemismatches (mypy) en afhankelijkheidsconflicten op — en retourneert gecorrigeerde code met een uitleg.

## Modeladvies
**Haiku 4.5** voor enkelvoudige bestandsfouten (ImportError, AttributeError, NameError, eenvoudige type-annotatieproblemen).

**Sonnet 4.6** voor fouten die meerdere modules overspannen, circulaire imports, mypy strict-modus-mislukkingen of afhankelijkheidsversieconflicten.

## Tools
- `Read` — het falende bestand en gerelateerde modules lezen
- `Edit` — gerichte fixes toepassen
- `Bash` — uitvoeren van `python -m mypy file.py 2>&1`, `python -c "import module"`, `pip show package` om te diagnosticeren

## Wanneer hierheen te delegeren
- `ImportError` of `ModuleNotFoundError` bij opstarten of testuitvoering
- `mypy`-typekontrolemislukkingen in een strikt getypeerde codebase
- `AttributeError: module 'x' has no attribute 'y'` (API gewijzigd bij pakketupgrade)
- Circulaire importfouten
- Afhankelijkheidsversieconflicten (`pip install` mislukt of produceert incompatibele versies)

## Wanneer NIET hierheen te delegeren
- Logicabugs die geen import/type-fouten zijn
- Prestatieproblemen
- Runtime-fouten veroorzaakt door onjuiste bedrijfslogica (geen structurele Python-fouten)

## Promptsjabloon
```
You are a Python error resolver. Fix the error — minimal changes only. Do not refactor.

Error:
[paste full traceback or mypy output]

Relevant files:
[paste file contents where errors occur]

Python version: [e.g., 3.12]
Package versions: [paste pip freeze output if relevant]

For each error:
1. Explain why the error occurs in one sentence
2. Apply the minimal fix
3. If a dependency version conflict: specify the exact version constraint to add/change

Do not change logic. Do not refactor. Fix the error only.
```

## Voorbeeldgebruiksscenario
**Fout:**
```
ImportError: cannot import name 'AsyncClient' from 'httpx' (0.23.0)
```

**Wat Resolver retourneert:**
- Oorzaak: `AsyncClient` werd toegevoegd in `httpx 0.18.0` maar gebruik vereist `httpx>=0.23.0` voor de specifieke gebruikte API
- Fix: werk `requirements.txt` bij naar `httpx>=0.23.0,<1.0.0` en voer `pip install -r requirements.txt` uit
- Als upgrade niet mogelijk is: toon de equivalente code voor de geïnstalleerde versie

---

> **Werk met ons:** Claudient wordt ondersteund door [Uitbreiden](https://uitbreiden.com/) — we bouwen AI-producten en B2B-oplossingen met ontwikkelaarsgemeenschappen. [uitbreiden.com](https://uitbreiden.com/)
