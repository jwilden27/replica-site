// Downloads a curated set of Pexels stock photos for the Milkos template.
// Pexels License permits free use including commercial without attribution.
// https://www.pexels.com/license/
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = "public/images";

const photos = [
  { id: 6945546, w: 1920, file: "hero.jpg" },
  { id: 7479804, w: 1200, file: "service-1.jpg" },
  { id: 3985325, w: 1200, file: "service-2.jpg" },
  { id: 30809943, w: 1200, file: "service-3.jpg" },
  { id: 9774655, w: 1200, file: "service-4.jpg" },
];

for (const p of photos) {
  const url = `https://images.pexels.com/photos/${p.id}/pexels-photo-${p.id}.jpeg?auto=compress&cs=tinysrgb&w=${p.w}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`FAILED ${p.file}: ${res.status}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(join(OUT, p.file), buf);
  console.log(`✓ ${p.file} (${(buf.length / 1024).toFixed(0)} KB)`);
}
console.log("done");
