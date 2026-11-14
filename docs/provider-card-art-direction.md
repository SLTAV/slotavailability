# Provider card art direction — approved reference

The user approved the six detailed provider illustrations on 14 November 2026 as the visual reference for future provider cards. Keep this direction for any new providers. The user subsequently requested integration. All ten current providers now use the detailed art direction in the shared illustrated ProviderCard component on Home, Providers and Search. Production images are in public/illustrations/providers-detailed/{slug}.webp, 600 × 800, cropped from the top of the portrait source exactly like the approved board.

## Reference files

Comparison board: docs/references/provider-cards-approved.png (relative to the app root).
Individual previews: .preview/provider-artwork-v2/{slug}.webp.
Original image source mapping: docs/provider-detailed-card-sources.json.

## Style to preserve

- Rich vintage adventure expedition poster illustrations, detailed engraved black ink linework with painterly color and subtle aged-paper grain.
- Original characters and scenery; no official provider logos or reproductions of official game characters.
- Bold expressive portrait, detailed face or animal features, costume and scenery; retain enough contrast to read as a small card. This direction replaces the flat silhouette look as the future reference.
- Each provider has its own restrained palette and landscape, while the whole collection shares lighting, grain, rendering and visual density.
- Original source artwork in 2:3 portrait format, composed to work as a 3:4 site card. Keep essential head/hat details in frame; lower area fades into dark ink for actual HTML text.
- Full-bleed art, subtle rounded corners and discreet warm edge treatment. Provider name appears once near the bottom in readable plain text. Small availability action at bottom. Do not embed brand lettering in generated artwork.

## Six approved archetypes

| Provider       | Original subject                                       | Palette and setting                                          |
| -------------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| Hacksaw Gaming | Raccoon explorer with broad hat and expedition goggles | Ivory, honey amber and brass; mountain ruins and pine forest |
| Pragmatic Play | Laurel-crowned expedition leader in cloak              | Burnt orange and copper; sunlit temple and mountains         |
| Nolimit City   | Bald urban explorer with high-collar travel jacket     | Acid yellow, charcoal and olive; abandoned industrial city   |
| Relax Gaming   | Mysterious top-hat traveler with goggles               | Teal, forest and brass; jungle temple and waterfall          |
| Push Gaming    | Shark emerging from jungle river                       | Lime, dark green and olive; mossy ruins and foliage          |
| Play’n GO      | Archaeologist in expedition hat                        | Blue, navy and pale parchment; ancient ruins and mountains   |

## Prompt template

Create one portrait 2:3 provider-card illustration for a premium adventure information database, part of a cohesive collection. Subject: [original character]. Palette and environment: [palette and scene]. Richly illustrated vintage adventure expedition poster, black ink engraved linework with detailed painterly color, bold dark shadows, tactile subtly aged paper, cinematic rim lighting. Detailed expressive character occupying upper 75%, scenery visible around shoulders, readable at 150px wide. Lower 22% fades to near-black for a real HTML name overlay. Straight full-bleed rectangular artwork, no border, frame, text, letters, logos, UI or watermark. Original character and artwork; do not reproduce existing game characters or official brand lettering. Match the approved six-card reference in material, lighting, detail and composition.

## Additional integrated cards

Evolution: silver/slate expedition scholar in an observatory. BGaming: crimson/magenta bison in prairie ruins. ELK Studios: olive/gold elk in a Nordic forest. Thunderkick: amethyst/gold hooded theatrical explorer. Generated using the same built-in image workflow and prompt template, full-bleed portrait illustrations with no embedded names or logos. Original source image IDs: {"evolution":"d0203630-c09c-4589-aa2b-11229b35f865","bgaming":"7dd62a2a-0dcd-48c4-8c62-58bcd0fc9ca0","elk-studios":"df9b71ff-9984-411e-9f20-90dbacf5891d","thunderkick":"2fce9e9c-51b5-401a-8274-072507139963"}.
