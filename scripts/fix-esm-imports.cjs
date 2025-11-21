#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function fixEsmImports(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      fixEsmImports(filePath);
    } else if (file.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');

      // import ... from './Module' -> import ... from './Module.js'
      // export ... from './Module' -> export ... from './Module.js'
      content = content.replace(
        /(import|export)(\s+.*?\s+from\s+|)\s*["'](\.[^"']+?)["']/g,
        (match, keyword, middle, modulePath) => {
          // すでに拡張子がついている場合はスキップ
          if (modulePath.endsWith('.js') || modulePath.endsWith('.cjs')) {
            return match;
          }
          middle = middle || '';
          return `${keyword}${middle} "${modulePath}.js"`;
        }
      );

      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
}

const distDir = path.join(__dirname, '../dist');
if (fs.existsSync(distDir)) {
  fixEsmImports(distDir);
  console.log('Fixed ESM imports');
}
