import { getArticles } from "./articles";

async function verify() {
  const ja = getArticles("ja");
  const en = getArticles("en");
  const es = getArticles("es"); // Should fallback to en

  console.log(`JA Articles: ${ja.length}`);
  console.log(`EN Articles: ${en.length}`);

  if (ja.length !== 15) throw new Error("JA articles count mismatch");
  if (en.length !== 15) throw new Error("EN articles count mismatch");
  if (es !== en) throw new Error("Fallback logic failed");

  for (let i = 0; i < ja.length; i++) {
    const j = ja[i];
    const e = en[i];

    if (j.id !== e.id)
      throw new Error(`ID mismatch at index ${i}: ${j.id} vs ${e.id}`);
    if (j.slug !== e.slug)
      throw new Error(`Slug mismatch at index ${i}: ${j.slug} vs ${e.slug}`);

    // Check for unique content
    if (j.title === e.title)
      console.warn(`Warning: Title might not be translated for ${j.id}`);
    if (j.description === e.description)
      console.warn(`Warning: Description might not be translated for ${j.id}`);
    if (j.content === e.content)
      console.warn(`Warning: Content might not be translated for ${j.id}`);

    // Check images match
    if (j.imageUrl !== e.imageUrl)
      throw new Error(`Image mismatch for ${j.id}`);
  }

  console.log("Verification Passed!");
}

verify().catch((e) => {
  console.error(e);
  process.exit(1);
});
