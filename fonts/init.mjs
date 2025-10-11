// this script is run by the npm postinstall hook to copy the font
// files from the geist package to the fonts directory

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define the source paths for Geist fonts relative to node_modules
const fontPaths = [
  {
    src: "node_modules/geist/dist/fonts/geist-sans/Geist-Light.ttf",
    dest: "geist-light.ttf"
  },
  {
    src: "node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf",
    dest: "geist-regular.ttf"
  },
  {
    src: "node_modules/geist/dist/fonts/geist-sans/Geist-Medium.ttf",
    dest: "geist-medium.ttf"
  },
  {
    src: "node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf",
    dest: "geist-bold.ttf"
  },
  {
    src: "node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.ttf",
    dest: "geist-mono-regular.ttf"
  }
];

// Ensure the destination directory exists
const ensureDirectoryExistence = filePath => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname, { recursive: true });
};

// Copy each font file
fontPaths.forEach(({ src, dest }) => {
  const destPath = path.join("fonts", dest);
  ensureDirectoryExistence(destPath);
  const exists = fs.existsSync(destPath);
  if (!exists && fs.existsSync(src)) {
    fs.copyFileSync(src, destPath);
    console.log(`Copied ${path.basename(src)} to ${destPath}`);
  }
});