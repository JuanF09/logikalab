const fs = require('fs');
const transcriptPath = 'C:/Users/Juan David/.gemini/antigravity-ide/brain/e7dd1874-0bb5-4103-9b37-2b3428545e5c/.system_generated/logs/transcript_full.jsonl';
const content = fs.readFileSync(transcriptPath, 'utf8');
const lines = content.trim().split('\n');
const obj = JSON.parse(lines[216]);

console.log('Object keys:', Object.keys(obj));
console.log('Type of obj.content:', typeof obj.content);

// Let's inspect all fields of obj
for (const k of Object.keys(obj)) {
  if (k !== 'content') {
    console.log(k, JSON.stringify(obj[k]).substring(0, 100));
  }
}

// Let's see if there is any string containing 'png' or 'jpg' or 'jpeg'
const str = lines[216];
const matches = str.match(/[\w\-./\\]+\.(png|jpg|jpeg|webp)/gi);
console.log('File matches in line 216:', matches);
