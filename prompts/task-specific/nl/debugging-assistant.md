# Prompt: Debugging Assistant

Een gestructureerd prompt voor systematisch debuggen — leidt Claude door root cause analyse in plaats van trial-and-error fixes.

## Prompt template

```
I have a bug I need to debug systematically. Help me find the root cause, not just a workaround.

**What I observe:**
[Describe the symptom — what you see, not what you think is wrong]

**What I expect:**
[What should happen instead]

**When it happens:**
[Always / intermittently / only in certain conditions]

**Environment:**
[Framework, language, database, browser/OS if relevant]

**What I've already tried:**
[List anything you've already attempted — saves time]

**Relevant code or error:**
[Paste the error message, stack trace, or the relevant code section]

---

Please:
1. Identify the most likely root causes (ranked by probability)
2. Suggest the minimum diagnostic steps to confirm which cause it is
3. Once confirmed, suggest the minimal fix — not a refactor
4. Explain how to verify the fix worked
```

## Usage

Plak deze sjabloon in Claude Code wanneer je een bug hebt. Vul elk onderdeel in voordat je verstuurt — de discipline van het invullen van de onderdelen brengt vaak de root cause aan het licht voordat Claude zelfs reageert.

## Example filled-in prompt

```
I have a bug I need to debug systematically.

**What I observe:**
Users get a 500 error on the checkout page, but only after adding a discount code

**What I expect:**
The discount code should be applied and the order total updated

**When it happens:**
Only when a discount code is used. Checkout without discount codes works fine.

**Environment:**
Next.js 15, Node.js 20, PostgreSQL via Prisma, deployed on Railway

**What I've already tried:**
- Checked that the discount code exists in the database ✓
- Confirmed the API route is being called ✓
- The error happens before the response is sent back

**Relevant error:**
PrismaClientKnownRequestError: 
  Invalid `prisma.order.update()` invocation
  Foreign key constraint failed on the field: `discount_id`
```

## Tips

- Hoe specifieker je bent over "wanneer het gebeurt," hoe sneller je het vindt
- Voeg het volledige stack trace in, niet alleen de laatste regel
- "Het werkt niet" is geen symptoom — beschrijf waarneembaar gedrag
- Als de bug intermitterend is: beschrijf de frequentie en eventuele patronen
