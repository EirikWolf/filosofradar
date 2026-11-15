const fs = require('fs');
const { VERIFIED_LINKS } = require('./verified_links_catalog.cjs');

let content = fs.readFileSync('src/features/deepdive/deepDiveData.ts', 'utf8');

// Step 1: Strip existing url and urlLabel lines cleanly
content = content.replace(/\n\s*url:\s*['"][^'"]+['"],?/g, '');
content = content.replace(/\n\s*urlLabel:\s*['"][^'"]+['"],?/g, '');

// Step 2: For each philosopher in VERIFIED_LINKS
let appliedCount = 0;

for (const [key, val] of Object.entries(VERIFIED_LINKS)) {
  const [philId, title] = key.split(':');

  // Find the philosopher block: `'philId': {` or `philId: {`
  const philHeaderRegex = new RegExp(`(['"]?${philId}['"]?\\s*:\\s*\\{[\\s\\S]*?majorWorks:\\s*\\[)`);
  const philHeaderMatch = content.match(philHeaderRegex);
  if (!philHeaderMatch) {
    console.warn(`Could not find philosopher ${philId}`);
    continue;
  }

  const startIdx = philHeaderMatch.index + philHeaderMatch[0].length;
  // find the end of majorWorks array: `],`
  const endMajorWorksIdx = content.indexOf('],', startIdx);
  if (endMajorWorksIdx === -1) {
    console.warn(`Could not find end of majorWorks for ${philId}`);
    continue;
  }

  const majorWorksBlock = content.slice(startIdx, endMajorWorksIdx);

  // Inside majorWorksBlock, find the work with this exact title
  const titleVariants = [
    `title: '${title}'`,
    `title: "${title}"`
  ];

  let titleIdx = -1;
  for (const v of titleVariants) {
    const idx = majorWorksBlock.indexOf(v);
    if (idx !== -1) {
      titleIdx = idx;
      break;
    }
  }

  if (titleIdx === -1) {
    console.warn(`Could not find title [${title}] in philosopher [${philId}]`);
    continue;
  }

  // Find the closing brace `},` of this object after titleIdx
  const closeBraceIdx = majorWorksBlock.indexOf('},', titleIdx);
  if (closeBraceIdx === -1) {
    console.warn(`Could not find closing brace for [${title}] in [${philId}]`);
    continue;
  }

  const indent = '        '; // 8 spaces
  const insertion = `\n${indent}url: "${val.url}",\n${indent}urlLabel: "${val.label}",`;
  const updatedWorksBlock = majorWorksBlock.slice(0, closeBraceIdx) + insertion + '\n      ' + majorWorksBlock.slice(closeBraceIdx);

  // Replace majorWorksBlock in content
  content = content.slice(0, startIdx) + updatedWorksBlock + content.slice(endMajorWorksIdx);
  appliedCount++;
}

console.log(`Successfully applied ${appliedCount} verified links.`);
fs.writeFileSync('src/features/deepdive/deepDiveData.ts', content, 'utf8');
