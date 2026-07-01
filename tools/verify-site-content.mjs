import { readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const htmlPath = path.join(root, 'index.html');
const vercelPath = path.join(root, 'vercel.json');
const vercelIgnorePath = path.join(root, '.vercelignore');
const html = await readFile(htmlPath, 'utf8');
const normalizedHtml = html.replace(/\s+/g, ' ');
const normalizedText = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
const searchableHtml = normalizedHtml + ' ' + normalizedText;

const failures = [];
const pass = [];

function requireIncludes(label, needle) {
  if (searchableHtml.includes(needle)) pass.push(label);
  else failures.push(label + ': missing "' + needle + '"');
}

function requireNotIncludes(label, needle) {
  if (!searchableHtml.includes(needle)) pass.push(label);
  else failures.push(label + ': forbidden "' + needle + '"');
}

function requireFile(label, filePath) {
  if (existsSync(path.join(root, filePath))) pass.push(label);
  else failures.push(label + ': missing ' + filePath);
}

requireIncludes('hero eyebrow', 'Kenya-based grassroots innovation organisation');
requireIncludes('hero headline', 'Grassroots systems made fundable.');
requireIncludes('hero lead', 'Subvators Hub turns field evidence, local innovators and partner coalitions into fundable health, wealth and Earth systems.');
requireIncludes('organisation positioning', 'Subvators Hub is a Kenya-based catalytic organisation');
requireIncludes('core idea', 'visible, credible and fundable');
requireIncludes('proof point orgs', '5 locally led organisations supported');
requireIncludes('proof point cbos', '40+ CBO initiatives reached');
requireIncludes('operating model observe', 'Field evidence and community realities');
requireIncludes('operating model strengthen', 'Institutional development');
requireIncludes('value strategic partnerships', 'Strategic partnership development');
requireIncludes('value institutional strengthening', 'Institutional strengthening');
requireIncludes('value action policy', 'Action-policy research and citizen dialogue');
requireIncludes('value ai secondary', 'AI-enabled systems and advisory');
requireIncludes('ledger headline', 'A numbered ecosystem index, not a card grid.');
requireIncludes('COTRR description', 'works directly with communities and families to strengthen resilience');
requireIncludes('YADEN description', 'equips young people to lead change through civic engagement');
requireIncludes('Spills description', 'distinctive health and wellness dimension');
requireIncludes('My Guardian description', 'digital safety and support platform serving migrant workers');
requireIncludes('Carledorian description', 'BarakaBlend coffee and wider African products');
requireIncludes('COTRR link', 'https://cotrr-africa.org/');
requireIncludes('YADEN link', 'https://www.yadeneastafrica.org/');
requireIncludes('YADEN social link', 'https://www.facebook.com/YADEN-East-Africa-116520675054374/timeline/');
requireIncludes('Spills link', 'https://spillsofeden.com/');
requireIncludes('Spills social link', 'https://www.youtube.com/channel/UC_jd09s57j7VHiOm8cXpUSQ');
requireIncludes('My Guardian link', 'https://services.myguardian.mobi/');
requireIncludes('Carledorian link', 'https://carledorian.com/');
requireIncludes('evidence story yaden', 'Dialogue. Culture. Impact.');
requireIncludes('evidence story spills', 'Partnering for wellness. Impact. Community. Sustainability.');
requireIncludes('evidence story carledorian', 'Local food innovation, practical livelihoods and trade pathways.');
requireIncludes('evidence technology guardrail', 'Make technology secondary to mission.');
requireIncludes('founder confirmation', 'Confirm founder name spelling before publishing');
requireIncludes('advisory headline', 'Build the concept, prove the case, connect the coalition.');
requireIncludes('contact headline', 'Make grassroots innovation visible, credible and fundable.');
requireIncludes('static script', '<script src="script.js"></script>');
requireNotIncludes('old platform eyebrow', 'Kenya-based grassroots innovation platform');
requireNotIncludes('old platform meta', 'partnership platform for health, wealth and Earth');
requireNotIncludes('old viability headline', 'Building fundable, viable and scalable grassroots innovations');

const imgMatches = [...html.matchAll(/<img\s+[^>]*src="([^"]+)"/g)].map((match) => match[1]).filter((src) => !src.startsWith('http'));
for (const src of imgMatches) requireFile('image exists ' + src, src);

if (!existsSync(vercelPath)) {
  failures.push('vercel config: missing vercel.json');
} else {
  const vercel = JSON.parse(await readFile(vercelPath, 'utf8'));
  if (vercel.cleanUrls === true) pass.push('vercel cleanUrls');
  else failures.push('vercel cleanUrls: expected true');
  if (Array.isArray(vercel.headers) && vercel.headers.length >= 2) pass.push('vercel headers');
  else failures.push('vercel headers: expected security and asset cache headers');
}

if (!existsSync(vercelIgnorePath)) {
  failures.push('vercel ignore: missing .vercelignore');
} else {
  const vercelIgnore = await readFile(vercelIgnorePath, 'utf8');
  for (const ignoredPath of ['docs/', 'preview/', 'tools/', 'inspirations/']) {
    if (vercelIgnore.includes(ignoredPath)) pass.push('vercel ignores ' + ignoredPath);
    else failures.push('vercel ignore: missing ' + ignoredPath);
  }
}

const ascii = /^[\x00-\x7F]*$/.test(html);
if (ascii) pass.push('index html ascii');
else failures.push('index html ascii: non-ASCII characters found');

await stat(htmlPath);

if (failures.length > 0) {
  console.error('Site content verification failed:');
  for (const failure of failures) console.error('- ' + failure);
  console.error('Passed checks: ' + pass.length);
  process.exit(1);
}

console.log('Site content verification passed: ' + pass.length + ' checks');
