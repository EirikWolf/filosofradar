const fs = require('fs');

const content = fs.readFileSync('src/features/deepdive/deepDiveData.ts', 'utf8');

// Match philosopher blocks
const philosopherBlocks = content.split(/(\n\s{2}[\w-]+':\s*\{)/);

console.log('Auditing all philosophers and their works:');
const urlRegex = /title:\s*['"]([^'"]+)['"][\s\S]*?(?:url:\s*['"]([^'"]+)['"][\s\S]*?urlLabel:\s*['"]([^'"]+)['"])?/g;

const allLinks = [];

// More robust: search specifically inside majorWorks arrays
const majorWorksRegex = /majorWorks:\s*\[([\s\S]*?)\]\s*,/g;
let m;
while ((m = majorWorksRegex.exec(content)) !== null) {
  const block = m[1];
  const itemRegex = /\{[\s\S]*?title:\s*['"]([^'"]+)['"][\s\S]*?\}/g;
  let itemM;
  while ((itemM = itemRegex.exec(block)) !== null) {
    const itemStr = itemM[0];
    const titleMatch = itemStr.match(/title:\s*['"]([^'"]+)['"]/);
    const urlMatch = itemStr.match(/url:\s*['"]([^'"]+)['"]/);
    const labelMatch = itemStr.match(/urlLabel:\s*['"]([^'"]+)['"]/);
    if (urlMatch) {
      allLinks.push({
        title: titleMatch ? titleMatch[1] : 'Unknown',
        url: urlMatch[1],
        label: labelMatch ? labelMatch[1] : ''
      });
    }
  }
}

console.log(`Found ${allLinks.length} major works with URLs:`);
allLinks.forEach((l, i) => {
  console.log(`${i+1}. [${l.title}] -> ${l.url} (${l.label})`);
});
