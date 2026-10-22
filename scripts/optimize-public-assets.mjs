import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
const sourceExtensions = /\.(png|jpe?g)$/i;
const replacements = new Map();

function walk(directory, visit) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(file, visit);
    else visit(file);
  }
}

const images = [];
walk(publicDir, (file) => {
  if (sourceExtensions.test(file)) images.push(file);
});

for (const file of images) {
  const target = file.replace(sourceExtensions, '.webp');
  if (fs.existsSync(target)) continue;

  const originalSize = fs.statSync(file).size;
  const converted = await sharp(file)
    .resize({ width: 4096, height: 4096, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 90, effort: 2 })
    .toBuffer();
  if (converted.length >= originalSize) continue;

  fs.writeFileSync(target, converted);
  fs.unlinkSync(file);
  const oldPath = `/${path.relative(publicDir, file).split(path.sep).join('/')}`;
  const newPath = oldPath.replace(sourceExtensions, '.webp');
  replacements.set(oldPath, newPath);
}

const textExtensions = /\.(?:[cm]?[jt]sx?|json|css|html|md|mdx|txt|xml|ya?ml|toml|svg)$/i;
const excluded = new Set(['.git', '.next', '.vercel', 'dist', 'build', 'node_modules']);
const rootDir = process.cwd();
const textFiles = [];
walk(rootDir, (file) => {
  if (textExtensions.test(file) && !file.split(path.sep).some((part) => excluded.has(part))) {
    textFiles.push(file);
  }
});

const dynamicReferences = [
  ['/images/ascy/editorial/', '${name}.jpg', '${name}.webp', '.jpg'],
  ['/images/rainforest/', '${name}.png', '${name}.webp', '.png'],
  ['/images/mango-case/', '${name}.png', '${name}.webp', '.png'],
];

function hasWebpForAll(folder, extension) {
  const absoluteFolder = path.resolve(publicDir, folder.slice(1));
  const candidates = images.filter((file) =>
    path.dirname(file) === absoluteFolder && file.toLowerCase().endsWith(extension),
  );
  return candidates.length > 0 && candidates.every((file) => fs.existsSync(file.replace(sourceExtensions, '.webp')));
}

for (const file of textFiles) {
  const original = fs.readFileSync(file, 'utf8');
  let updated = original;
  for (const [oldPath, newPath] of replacements) {
    updated = updated.split(oldPath).join(newPath);
  }
  for (const [folder, oldSuffix, newSuffix, extension] of dynamicReferences) {
    if (hasWebpForAll(folder, extension)) {
      updated = updated.split(`${folder}${oldSuffix}`).join(`${folder}${newSuffix}`);
      if (folder === '/images/mango-case/') {
        updated = updated.split('`${root}${name}.png`').join('`${root}${name}.webp`');
      }
    }
  }
  if (fs.existsSync(path.join(publicDir, 'images/mango-case/mango-02.webp'))) {
    updated = updated.split('`${root}mango-02.webp`').join('`${root}mango-02.webp`');
  }
  if (updated !== original) fs.writeFileSync(file, updated);
}

console.log(`Optimized ${replacements.size} public images before the production build.`);
