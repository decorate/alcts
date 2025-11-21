#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function fixCjsImports(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      fixCjsImports(filePath);
    } else if (file.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');

      // require("./Module") -> require("./Module.cjs")
      // require("./path/to/Module") -> require("./path/to/Module.cjs")
      content = content.replace(
        /require\(["'](\.[^"']+?)["']\)/g,
        (match, modulePath) => {
          // すでに拡張子がついている場合はスキップ
          if (modulePath.endsWith('.cjs') || modulePath.endsWith('.js')) {
            return match;
          }
          return `require("${modulePath}.cjs")`;
        }
      );

      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
}

const distCjsDir = path.join(__dirname, '../dist-cjs');
if (fs.existsSync(distCjsDir)) {
  fixCjsImports(distCjsDir);
  console.log('Fixed CommonJS imports');
}
