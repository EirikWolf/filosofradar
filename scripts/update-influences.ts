import fs from 'fs';
import path from 'path';

const updates: Record<string, string[]> = {
  'aristoteles': ['platon', 'sokrates'],
  'arne-naess': ['sokrates', 'buddha', 'zapffe', 'kant'],
  'de-beauvoir': ['kierkegaard', 'descartes', 'marx', 'nietzsche', 'kant'],
  'descartes': ['aristoteles', 'platon'],
  'epikur': ['aristoteles', 'platon'],
  'hypatia': ['platon', 'aristoteles'],
  'ibn-sina': ['aristoteles', 'platon'],
  'kant': ['descartes', 'aristoteles', 'platon'],
  'kierkegaard': ['sokrates', 'kant', 'descartes'],
  'konfucius': ['laozi'],
  'marcus-aurelius': ['sokrates', 'diogenes'],
  'marx': ['epikur', 'aristoteles', 'kant'],
  'nietzsche': ['sokrates', 'platon', 'kant'],
  'wollstonecraft': ['sokrates', 'kant', 'descartes'],
  'zapffe': ['nietzsche', 'kierkegaard'],
};

for (const [id, list] of Object.entries(updates)) {
  const filePath = path.join('content', 'philosophers', id + '.json');
  if (fs.existsSync(filePath)) {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    content.influencedBy = list;
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf8');
  }
}

console.log('✅ Oppdaterte påvirkningslenker for', Object.keys(updates).length, 'filosofer!');
