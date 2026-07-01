import { readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const htmlPath = path.join(root, 'index.html');
const cssPath = path.join(root, 'styles.css');
const jsPath = path.join(root, 'script.js');
const vercelPath = path.join(root, 'vercel.json');
const vercelIgnorePath = path.join(root, '.vercelignore');
const contentPath = path.join(root, 'docs', 'WEBSITE_CONTENT.md');
const html = await readFile(htmlPath, 'utf8');
const css = await readFile(cssPath, 'utf8');
const js = await readFile(jsPath, 'utf8');
const contentSource = await readFile(contentPath, 'utf8');
const normalizedHtml = html.replace(/\s+/g, ' ');
const normalizedText = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
const searchableHtml = normalizedHtml + ' ' + normalizedText;
const searchableSite = searchableHtml + ' ' + css + ' ' + js;

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

function requireSiteIncludes(label, needle) {
  if (searchableSite.includes(needle)) pass.push(label);
  else failures.push(label + ': missing site token "' + needle + '"');
}

function requireSiteNotIncludes(label, needle) {
  if (!searchableSite.includes(needle)) pass.push(label);
  else failures.push(label + ': forbidden site token "' + needle + '"');
}

function requireContentIncludes(label, needle) {
  if (contentSource.includes(needle)) pass.push(label);
  else failures.push(label + ': missing content source token "' + needle + '"');
}

function requireContentNotIncludes(label, needle) {
  if (!contentSource.includes(needle)) pass.push(label);
  else failures.push(label + ': forbidden content source token "' + needle + '"');
}

function requireCssRuleIncludes(label, selector, needle) {
  const selectorIndex = css.indexOf(selector + ' {');
  const ruleEnd = selectorIndex === -1 ? -1 : css.indexOf('}', selectorIndex);
  const rule = selectorIndex === -1 || ruleEnd === -1 ? '' : css.slice(selectorIndex, ruleEnd + 1);
  if (rule.includes(needle)) pass.push(label);
  else failures.push(label + ': missing "' + needle + '" in ' + selector + ' rule');
}

const heroMarkup = html.match(/<section class="atlas-hero"[\s\S]*?<\/section>/)?.[0] || '';

function requireHeroIncludes(label, needle) {
  if (heroMarkup.includes(needle)) pass.push(label);
  else failures.push(label + ': missing hero token "' + needle + '"');
}

function requireHeroNotIncludes(label, needle) {
  if (!heroMarkup.includes(needle)) pass.push(label);
  else failures.push(label + ': forbidden hero token "' + needle + '"');
}

requireIncludes('first nav label about us', '<a href="#field">About Us</a>');
requireIncludes('first section mode about us', 'data-section-name="ABOUT US"');
requireIncludes('initial rail label about us', '<span class="rail-kicker" data-rail-mode>ABOUT US</span>');
requireNotIncludes('old first nav field label removed', '<a href="#field">Field</a>');
requireNotIncludes('old first section field mode removed', 'data-section-name="FIELD"');
requireNotIncludes('old initial rail field label removed', '<span class="rail-kicker" data-rail-mode>FIELD</span>');
requireIncludes('hero eyebrow', 'Kenya-based grassroots innovation organisation');
requireHeroIncludes('hero concise headline fixed copy', 'Grassroots innovation made');
requireHeroIncludes('hero animated word hook', 'data-hero-word');
requireHeroIncludes('hero animated word options', 'data-hero-words="visible,credible,fundable"');
requireHeroIncludes('hero accessible headline text', 'Grassroots innovation made visible, credible and fundable.');
requireHeroNotIncludes('old long hero h1 removed', '<h1 id="hero-title">Subvators Hub makes grassroots innovation visible, credible and fundable.</h1>');
requireSiteIncludes('hero word cursor pseudo element', '.hero-title-word::after');
requireSiteIncludes('hero word cursor sits after text', 'display: inline-block;');
requireSiteIncludes('hero word longer read hold', 'const HERO_WORD_HOLD_MS = 2600;');
requireSiteIncludes('hero word measured typing text slices', 'heroWord.textContent = word.slice(0, nextLength);');
requireSiteIncludes('hero word script', 'data-hero-word');
requireSiteNotIncludes('hero word fixed ch cursor removed', '--hero-word-ch');
requireSiteNotIncludes('hero word border cursor removed', 'border-right: 0.06em solid currentColor;')
requireNotIncludes('old hero systems headline removed', 'Grassroots systems made fundable.');
requireIncludes('hero lead', 'We strengthen community-rooted organisations so local solutions can become visible, credible, fundable and influential in the systems that shape public health, livelihoods, protection and opportunity.');
requireNotIncludes('old hero lead removed', 'Subvators Hub turns field evidence, local innovators and partner coalitions into fundable health, wealth and Earth systems.');
requireContentIncludes('organisation positioning source', 'Subvators Hub is a Kenya-based catalytic organisation that strengthens community-rooted organisations');
requireIncludes('overview source body', 'Subvators Hub supports locally led organisations that are already close to the challenge.');
requireIncludes('overview to-date body', 'To date, Subvators Hub has supported five locally led organisations that together reach more than 40 CBO initiatives and growing.');
requireIncludes('core idea', 'visible, credible and fundable');
requireIncludes('proof point orgs', '5 locally led organisations supported');
requireIncludes('proof point cbos', '40+ CBO initiatives reached');
requireCssRuleIncludes('proof strip desktop avoids squeezed labels', '.proof-strip', 'grid-template-columns: repeat(2, minmax(0, 1fr));');
requireIncludes('operating model observe', 'Field evidence and community realities');
requireIncludes('operating model strengthen', 'Institutional development');
requireIncludes('value strategic partnerships', 'Strategic partnership development');
requireIncludes('value institutional strengthening', 'Institutional strengthening');
requireIncludes('value action policy', 'Action-policy research and citizen dialogue');
requireIncludes('value ai secondary', 'AI-enabled systems and advisory');
requireIncludes('hero see partners CTA', 'See partners');
requireIncludes('hero partner with us CTA', 'Partner with us');
requireNotIncludes('old hero partner CTA removed', 'Meet the partners');
requireNotIncludes('old hero concept CTA removed', 'Start a concept');
requireIncludes('systems public label', 'How Subvators works');
requireIncludes('why matters headline', 'Community-rooted actors need stronger routes into influence, funding and reform.');
requireIncludes('why matters bridge sentence', 'Subvators works in this gap by helping local organisations become visible, credible, fundable and influential.');
requireIncludes('value public label', 'How Subvators adds value');
requireIncludes('partner ecosystem label', 'Partner ecosystem');
requireIncludes('partner ecosystem headline', 'Local partners connecting health, livelihoods, protection and Earth-centred resilience.');
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
requireIncludes('founder role', 'Founder and Lead Visionary, Subvators Hub');
requireIncludes('advisory headline', 'Turn community priorities into fundable partnerships.');
requireNotIncludes('old advisory headline removed', 'Build the concept, prove the case, connect the coalition.');
requireIncludes('contact headline', 'Make grassroots innovation visible, credible and fundable.');
requireIncludes('static script', '<script src="script.js"></script>');
requireNotIncludes('old platform eyebrow', 'Kenya-based grassroots innovation platform');
requireNotIncludes('old platform meta', 'partnership platform for health, wealth and Earth');
requireNotIncludes('old viability headline', 'Building fundable, viable and scalable grassroots innovations');
requireNotIncludes('wireframe partner section label removed', 'Partner ledger');
requireNotIncludes('wireframe partner CTA removed', 'Open partner ledger');
requireNotIncludes('wireframe partner headline removed', 'A numbered ecosystem index, not a card grid.');
requireNotIncludes('wireframe systems label removed', 'Operating layer');
requireNotIncludes('wireframe value label removed', 'What Subvators builds');
requireNotIncludes('workflow platform wording removed', 'workflow tools');
requireNotIncludes('hidden approval placeholder removed', 'Evidence stories pending final approval.');
requireNotIncludes('visual object aria wording removed', 'Subvators ecosystem visual object');

requireNotIncludes('no post assets in live page', 'images/posters/');
requireNotIncludes('hidden draft story title removed', 'Four story objects for the first content pass.');
requireNotIncludes('publishing guardrail copy hidden', 'Publishing guardrails');
requireNotIncludes('draft confirmation copy hidden', 'Confirm event dates, image rights');
requireNotIncludes('royal wording hidden from live page', 'royal-family');
requireNotIncludes('draft story global engagement hidden', 'global engagement');
requireNotIncludes('founder name no longer marked unconfirmed', 'Confirm founder name spelling before publishing');
requireNotIncludes('stories section no longer hidden', '<section class="section stories-section" hidden');
requireNotIncludes('stories section aria hidden removed', 'aria-hidden="true" data-section="04/05" data-section-name="EVIDENCE" aria-labelledby="stories-title"');
requireSiteNotIncludes('old story grid CSS removed', '.story-grid');
requireSiteNotIncludes('old story card CSS removed', '.story-card')
const brandMarkup = html.match(/<a class="brand"[\s\S]*?<\/a>/)?.[0] || '';
if (brandMarkup.includes('src="images/logo.PNG"')) pass.push('navigation uses full logo');
else failures.push('navigation logo: expected images/logo.PNG full logo');
const founderMarkup = html.match(/<section class="section founder-section"[\s\S]*?<\/section>/)?.[0] || '';
if (founderMarkup.includes('src="images/people/founder/')) pass.push('founder section uses founder image');
else failures.push('founder section image: expected image from images/people/founder/');
if (!founderMarkup.includes('src="images/logo.PNG"')) pass.push('founder section no logo placeholder');
else failures.push('founder section image: still uses logo placeholder');


requireIncludes('evidence content headline', 'Evidence. Innovation. Accountability. Real impact.');
requireNotIncludes('evidence stories visible headline removed', 'Proof as field objects.');
requireNotIncludes('evidence stories visible body removed', 'approved event imagery, short labels and movement');
requireNotIncludes('evidence stories left index rows removed', 'Youth dialogue and civic voice');
requireIncludes('evidence stories accessible title', 'Evidence stories image mosaic');
requireIncludes('evidence stories added YADEN image', 'story-photo story-yaden-board');
requireIncludes('evidence stories added Spills image', 'story-photo story-spills-garden');
requireIncludes('evidence stories added enterprise image', 'story-photo story-enterprise-detail');
requireIncludes('evidence stories mosaic markup', 'data-story-mosaic');
requireIncludes('evidence stories hero tile', 'story-photo story-hero');
requireIncludes('evidence stories contact object', 'edge-object');
requireSiteIncludes('global display font token', '--display-font: Georgia, "Times New Roman", serif;');
requireSiteIncludes('global display size token', '--display-size: clamp(2.55rem, 4.5vw, 4.8rem);');
requireSiteIncludes('global display line height token', '--display-line-height: 0.96;');
requireSiteIncludes('headings use display font', 'font-family: var(--display-font);');
requireSiteIncludes('story mosaic mask animation', '@keyframes storyMaskIn');
requireSiteIncludes('story mosaic drift animation', '@keyframes storyImageDrift');
requireSiteIncludes('story mosaic contact animation', '@keyframes storyContactDrift');
requireIncludes('evidence content body', 'Subvators uses field evidence, partner activity and practical evidence systems to help local organisations listen, learn and improve.');
requireNotIncludes('wireframe evidence headline removed', 'Proof sits in the layout as objects, not decoration.');
requireNotIncludes('wireframe evidence body removed', "Evidence objects connect the organisation's claims to actual");
requireNotIncludes('internal technology guardrail removed', 'Make technology secondary to mission.');
requireContentIncludes('content source founder confirmed', 'Name confirmed:\nUse Lucy Den Teuling.');
requireContentIncludes('content source current hero lead', 'Lead:\nWe strengthen community-rooted organisations so local solutions can become visible, credible, fundable and influential');
requireContentIncludes('content source current hero CTA primary', 'Primary CTA:\nSee partners');
requireContentIncludes('content source current hero CTA secondary', 'Secondary CTA:\nPartner with us');
requireContentNotIncludes('content source no poster asset paths', 'images/posters/');
requireContentNotIncludes('content source old field nav removed', 'Recommended navigation labels:\n- Field');
requireContentNotIncludes('content source old partner ledger label removed', 'Section label:\nPartner ledger');
requireContentNotIncludes('content source old advisory headline removed', 'Headline:\nBuild the concept, prove the case, connect the coalition.');

const atlasMarkup = html.match(/<div class="atlas-object[\s\S]*?<\/div>\s*<div class="partner-ledger"/)?.[0] || '';
if (/src="images\/posters\//.test(atlasMarkup)) failures.push('hero partner images: atlas object still uses poster assets');
else pass.push('hero partner images use non-poster assets');
requireIncludes('hero image switch data primary', 'data-image-primary=');
requireIncludes('hero image switch data secondary', 'data-image-secondary=');
requireIncludes('hero image switch data proof', 'data-image-proof=');
requireSiteIncludes('partner strip mobile horizontal scroll', 'grid-auto-flow: column;');
requireSiteIncludes('partner strip mobile card width', 'grid-auto-columns: minmax(220px, 76vw);');
requireSiteIncludes('partner strip mobile snap', 'scroll-snap-type: x mandatory;');
requireSiteIncludes('partner strip rows snap', 'scroll-snap-align: start;');
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
