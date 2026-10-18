const fs = require('fs');
const path = require('path');

function searchDir(dir, maxDepth = 4, depth = 0) {
  if (depth > maxDepth) return;
  try {
    const list = fs.readdirSync(dir);
    for (const item of list) {
      if (item === 'node_modules' || item === '.git' || item === 'AppData/Local/Microsoft') continue;
      const full = path.join(dir, item);
      try {
        const stat = fs.statSync(full);
        if (stat.isDirectory()) {
          searchDir(full, maxDepth, depth + 1);
        } else if (/\.(png|jpg|jpeg|webp)$/i.test(item)) {
          // Check modification time
          const ageMinutes = (Date.now() - stat.mtimeMs) / (1000 * 60);
          if (ageMinutes < 60) {
            console.log(`Found recent image: ${full} (${Math.round(stat.size / 1024)} KB, ${Math.round(ageMinutes)} mins ago)`);
          }
        }
      } catch (e) {}
    }
  } catch (e) {}
}

console.log('Searching in .gemini...');
searchDir('C:/Users/Juan David/.gemini', 6);
console.log('Searching in AppData/Roaming...');
searchDir('C:/Users/Juan David/AppData/Roaming', 4);
console.log('Searching in Desktop...');
searchDir('C:/Users/Juan David/Desktop', 4);
console.log('Searching in Downloads...');
searchDir('C:/Users/Juan David/Downloads', 2);
