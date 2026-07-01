import { readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const htmlPath = path.join(root, 'index.html');
const cssPath = path.join(root, 'styles.css');
const jsPath = path.join(root, 'script.js');
const vercelPath = path.join(root, 'vercel.json');
const vercelIgnorePath = path.join(root, '.vercelignore');
const html = await readFile(htmlPath, 'utf8');
const css = await readFile(cssPath, 'utf8');
const js = await readFile(jsPath, 'utf8');
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
requireIncludes('evidence systems public copy', 'Community dialogue, restorative wellness and food enterprise evidence show how partner work becomes stronger, clearer and more fundable.');
requireIncludes('founder confirmed name', 'Lucy Den Teuling founded Subvators Hub');
requireIncludes('advisory headline', 'Build the concept, prove the case, connect the coalition.');
requireIncludes('contact headline', 'Make grassroots innovation visible, credible and fundable.');
requireIncludes('static script', '<script src="script.js"></script>');
requireNotIncludes('old platform eyebrow', 'Kenya-based grassroots innovation platform');
requireNotIncludes('old platform meta', 'partnership platform for health, wealth and Earth');
requireNotIncludes('old viability headline', 'Building fundable, viable and scalable grassroots innovations');

requireNotIncludes('no post assets in live page', 'images/posters/');
requireNotIncludes('hidden draft story title removed', 'Four story objects for the first content pass.');
requireNotIncludes('publishing guardrail copy hidden', 'Publishing guardrails');
requireNotIncludes('draft confirmation copy hidden', 'Confirm event dates, image rights');
requireNotIncludes('royal wording hidden from live page', 'royal-family');
requireNotIncludes('draft story global engagement hidden', 'global engagement');
requireNotIncludes('founder name no longer marked unconfirmed', 'Confirm founder name spelling before publishing');
requireIncludes('stories section hidden', '<section class="section stories-section" hidden');
const brandMarkup = html.match(/<a class="brand"[\s\S]*?<\/a>/)?.[0] || '';
if (brandMarkup.includes('src="images/logo.PNG"')) pass.push('navigation uses full logo');
else failures.push('navigation logo: expected images/logo.PNG full logo');
const founderMarkup = html.match(/<section class="section founder-section"[\s\S]*?<\/section>/)?.[0] || '';
if (founderMarkup.includes('src="images/people/founder/')) pass.push('founder section uses founder image');
else failures.push('founder section image: expected image from images/people/founder/');
if (!founderMarkup.includes('src="images/logo.PNG"')) pass.push('founder section no logo placeholder');
else failures.push('founder section image: still uses logo placeholder');


requireIncludes('evidence content headline', 'Evidence. Innovation. Accountability. Real impact.');
requireIncludes('evidence content body', 'Subvators uses field evidence, partner activity and practical evidence systems to help local organisations listen, learn and improve.');
requireNotIncludes('wireframe evidence headline removed', 'Proof sits in the layout as objects, not decoration.');
requireNotIncludes('wireframe evidence body removed', "Evidence objects connect the organisation's claims to actual");
requireNotIncludes('internal technology guardrail removed', 'Make technology secondary to mission.');

const atlasMarkup = html.match(/<div class="atlas-object[\s\S]*?<\/div>\s*<div class="partner-ledger"/)?.[0] || '';
if (/src="images\/posters\//.test(atlasMarkup)) failures.push('hero partner images: atlas object still uses poster assets');
else pass.push('hero partner images use non-poster assets');
requireIncludes('hero image switch data primary', 'data-image-primary=');
requireIncludes('hero image switch data secondary', 'data-image-secondary=');
requireIncludes('hero image switch data proof', 'data-image-proof=');
if (js.includes('heroPartnerImages') && js.includes('switchHeroPartnerImages') && js.includes('is-switching')) pass.push('hero image switcher script');
else failures.push('hero image switcher script: missing partner image switch behavior');
if (css.includes('.brand-mark img') && css.includes('.object-medallion img') && css.includes('object-fit: contain')) pass.push('logo render contains full artwork');
else failures.push('logo render: expected full artwork contain styling');
if (css.includes('hero-image-exit') && css.includes('hero-image-enter')) pass.push('hero image entry exit animation');
else failures.push('hero image entry/exit animation: missing keyframes');

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
