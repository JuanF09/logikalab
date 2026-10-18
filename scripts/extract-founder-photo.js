const fs = require('fs');
const path = require('path');

const transcriptPath = 'C:/Users/Juan David/.gemini/antigravity-ide/brain/e7dd1874-0bb5-4103-9b37-2b3428545e5c/.system_generated/logs/transcript.jsonl';
const lines = fs.readFileSync(transcriptPath, 'utf8').trim().split('\n');

for (let i = lines.length - 1; i >= 0; i--) {
  const step = JSON.parse(lines[i]);
  if (step.type === 'USER_INPUT') {
    console.log('Step keys:', Object.keys(step));
    if (Array.isArray(step.content)) {
      step.content.forEach((part, idx) => {
        console.log('Part ' + idx + ':', Object.keys(part));
        if (part.image_bytes || part.data || (part.inline_data && part.inline_data.data)) {
          const b64 = part.image_bytes || part.data || part.inline_data.data;
          const mime = (part.inline_data && part.inline_data.mime_type) || part.mime_type || 'image/jpeg';
          const ext = mime.includes('png') ? 'png' : 'jpg';
          const outPath = path.join('public/brand', 'juan-david-figueroa.' + ext);
          fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
          console.log('Saved founder photo to:', outPath);
        }
      });
    } else if (typeof step.content === 'object') {
      console.log('Content obj:', Object.keys(step.content));
    }
    break;
  }
}
