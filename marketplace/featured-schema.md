# featured.json — Featured Stacks Index

## Overview

`featured.json` indexes stacks that should be prominently displayed in the marketplace UI. Featured stacks appear on:

- Marketplace homepage (featured banner/carousel)
- Category pages (top of each category section)
- Search results (when no specific query filters results)

## Schema

Each entry has:

```json
{
  "id": "string - stack ID from catalog.json",
  "name": "string - display name",
  "reason": "string - why featured (new|popular|trending|high-quality)",
  "description": "string - brief description",
  "category": "string - category ID",
  "certified": "boolean - whether stack is certified"
}
```

## Certification Priority

Certified stacks are automatically prioritized in featured lists. The marketplace ranking algorithm considers:

1. **Certification tier:** gold > silver > bronze > uncertified
2. **Recency:** "reason": "new" gets 90-day boost in prominence
3. **Adoption:** trending, popular, high-quality based on install metrics
4. **Category diversity:** ensure different domains are represented

## Reasons

| Reason | Meaning | Duration | Prominence |
|--------|---------|----------|------------|
| new | Newly published or recently certified | 90 days | Highest |
| popular | High adoption over time | Ongoing | High |
| trending | Rapidly growing adoption | Ongoing | High |
| high-quality | High ratings and positive reviews | Ongoing | Medium |

## Managing Featured List

### Adding Stacks

Certified stacks with "new" reason are automatically featured for 90 days after publishing.

Other stacks can be manually added by:
1. Marketplace core team (admin access)
2. Using marketplace admin tools (authenticated users)

### Removal

Stacks are automatically removed from featured if:
- Certification expires and is not renewed
- Average rating drops below 3.5
- More than 5 critical unresolved issues
- Code of conduct violation

Stacks can be manually removed by core team if:
- Author requests removal
- Stack is being reorganized/updated
- Better alternatives exist

### Rotation

Featured lists are updated weekly. The algorithm balances:
- New stacks (90-day boost)
- Top-performing certified stacks
- Trending stacks (velocity-based)
- Category representation (ensure diversity)

## Related Files

- **catalog.json** — Complete stack registry with certification metadata
- **CERTIFICATION.md** — Certification tier definitions and criteria
- **certified/README.md** — Index of all certified stacks by tier
- **VETTING.md** — Quality standards and review process

---

**Last updated:** June 15, 2026
