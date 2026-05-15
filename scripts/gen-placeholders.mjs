import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const OUT = "public/images";
await mkdir(OUT, { recursive: true });

async function solid(name, w, h, rgb, label) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect width="100%" height="100%" fill="rgb(${rgb.join(",")})"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
          font-family="sans-serif" font-size="${Math.min(w, h) / 12}" fill="rgba(255,255,255,0.55)"
          font-weight="700" letter-spacing="2">${label}</text>
  </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 80 }).toFile(join(OUT, name));
  console.log("wrote", name);
}

await solid("hero.jpg", 1920, 1080, [40, 40, 40], "HERO IMAGE");
for (let i = 1; i <= 4; i++) {
  await solid(`service-${i}.jpg`, 800, 600, [180, 180, 180], `SERVICE ${i}`);
}
for (let i = 1; i <= 6; i++) {
  await solid(`gallery-${i}.jpg`, 800, 800, [200, 200, 200], `GALLERY ${i}`);
}
console.log("done");
