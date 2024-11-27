// this script is run by the npm postinstall hook to copy the font
// files from the node_modules directory to the public directory

import fs from "fs";
import path from "path";

// Define the source paths
const fontPaths = [
  "node_modules/@fontsource/inter/files/inter-latin-300-normal.woff",
  "node_modules/@fontsource/inter/files/inter-latin-500-normal.woff",
  "node_modules/@fontsource/inter/files/inter-latin-600-normal.woff",
  "node_modules/@fontsource/roboto-mono/files/roboto-mono-latin-400-normal.woff",
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
fontPaths.forEach(src => {
  const fileName = path.basename(src);
  const dest = path.join("fonts", fileName);
  ensureDirectoryExistence(dest);
  const exists = fs.existsSync(dest);
  if (!exists) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${src} to ${dest}`);
  }
});
