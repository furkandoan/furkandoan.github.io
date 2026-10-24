import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile, stat, access, readdir} from 'node:fs/promises';
import {resolve, dirname, extname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = resolve(root, 'dist');
const read = path => readFile(resolve(dist, path), 'utf8');
const academic = JSON.parse(await readFile(resolve(root,'src/data/academic.json'), 'utf8'));
const research = JSON.parse(await readFile(resolve(root,'src/data/research.json'), 'utf8'));
const pages = ['index.html','final/index.html','research/index.html','teaching/index.html'];

test('Teaching lists only instructor-led courses with separate material categories', async () => {
  const html = await read('teaching/index.html');
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];
  assert.doesNotMatch(main, /Teaching Assistant|Research Assistant|Research and Teaching Assistant|teaching assistance|Teaching &amp; research assistance/);
  const courses = JSON.parse(await readFile(resolve(root, 'src/data/teaching-materials.json'), 'utf8'));
  assert.equal(courses.length, 2);
  for (const course of courses) {
    assert.ok(academic.teaching.some(entry => entry.role === 'Course Instructor' && entry.courses.includes(course.course)));
    assert.ok(html.includes(`id="${course.id}"`));
    for (const category of ['slides', 'exams', 'other']) {
      assert.ok(Array.isArray(course.materials[category]));
      assert.ok(html.includes(`id="${course.id}-${category}"`));
      for (const material of course.materials[category]) {
        assert.ok(material.title && material.href.startsWith('/teaching/'));
        await access(resolve(root, 'public', material.href.slice(1)));
      }
    }
  }
  assert.equal((html.match(/class="teaching-course"/g) || []).length, 2);
});

test('Homepage section descriptions are removed and the updated paper is copied intact', async () => {
  const home = await read('index.html');
  for (const phrase of ['Matching, random assignment, and the design of fair allocations.', 'Academic training in economics.', 'Selected presentations and academic meetings.', 'From allocation questions to mechanisms:', 'For research correspondence and academic enquiries.']) assert.ok(!home.includes(phrase));
  const source = await readFile(resolve(root, 'public/research/spatial-constraints.pdf'));
  const built = await readFile(resolve(dist, 'research/spatial-constraints.pdf'));
  assert.ok(source.equals(built));
  assert.match(research.find(p => p.id === 'spatial-matching').abstract, /replica-level pairwise stability when every slot has quota two/);
});

test('Project timeline uses verified periods and accessible project controls', async () => {
  const html = await read('index.html');
  assert.match(html, /Projects over the years/);
  assert.match(html, /Project horizon/);
  assert.match(html, /timeline-spine/);
  assert.match(html, /stop-left/);
  assert.match(html, /stop-right/);
  for (const project of academic.projects) {
    assert.ok(html.includes(`data-period="${project.id}"`));
    assert.ok(html.includes(`data-project-key="${project.id}"`));
    assert.ok(html.includes(`aria-controls="${project.id}"`));
    assert.ok(html.includes(`data-project="${project.id}"`));
  }
  const component = await readFile(resolve(root, 'src/components/ProjectTimeline.astro'), 'utf8');
  assert.match(component, /project.dates.split/);
  assert.match(component, /observer.disconnect/);
  const css = await readFile(resolve(root, 'src/styles/final.css'), 'utf8');
  assert.match(css, /prefers-reduced-motion:reduce/);
});

test('Production entry uses the final homepage, without published prototypes', async () => {
  const home = await read('index.html');
  assert.match(home, /id="projects"/);
  assert.match(home, /id="worldMapMount"/);
  assert.doesNotMatch(home, /name="robots" content="noindex/);
  for (const page of ['a','b','c']) await assert.rejects(access(resolve(dist,page,'index.html')));
  assert.match(await read('final/index.html'), /name="robots" content="noindex, follow"/);
});

test('All page links, fragment targets and static assets resolve', async () => {
  for (const page of pages) {
    const html = await read(page);
    const origin = new URL(page.replace(/index\.html$/, ''), 'https://furkandogan.org/');
    for (const match of html.matchAll(/\b(?:href|src|data-src)="([^"]+)"/g)) {
      const url = new URL(match[1].replaceAll('&amp;', '&'), origin);
      if (url.origin !== origin.origin) continue;
      let file = resolve(dist, '.' + decodeURIComponent(url.pathname));
      const info = await stat(file).catch(() => assert.fail(`${page}: missing ${url.pathname}`));
      if (info.isDirectory()) file = resolve(file, 'index.html');
      await access(file);
      if (url.hash && extname(file) === '.html') {
        const target = await readFile(file,'utf8');
        assert.ok(target.includes(`id="${url.hash.slice(1)}"`), `${page}: missing fragment ${url.href}`);
      }
    }
  }
});

test('Verified projects and all four conference locations remain present', async () => {
  const home = await read('index.html');
  assert.equal(academic.projects.length, 2);
  assert.equal(academic.conferences.length, 4);
  assert.deepEqual(academic.conferences.map(t => t.country), ['fr','gb','tr','tr']);
  for (const talk of academic.conferences) assert.ok(home.includes(`data-talk="${talk.id}"`));
  for (const project of academic.projects) {
    assert.ok(home.includes(`id="${project.id}"`));
    assert.ok(home.includes(project.role));
  }
  assert.equal((home.match(/class="talk-location"/g) || []).length, 4);
  assert.doesNotMatch(home, /matchup-2026-poster\.pdf/);
});

test('Page metadata, canonical URLs, structured data and headings are coherent', async () => {
  for (const page of pages) {
    const html = await read(page);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.match(html, /<html lang="en"/);
    assert.match(html, /<meta name="description" content="[^"]+"/);
    assert.match(html, /property="og:title"/);
    const canonical = html.match(/rel="canonical" href="([^"]+)"/)[1];
    const path = page === 'final/index.html' ? '/' : '/' + page.replace(/index\.html$/, '');
    assert.equal(canonical, 'https://furkandogan.org' + path);
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    assert.equal(schema['@graph'][0].name, 'Furkan Doğan');
    if (page === 'research/index.html') assert.equal(schema['@graph'].filter(item => item['@type'] === 'ScholarlyArticle').length, 2);
    assert.doesNotMatch(html, /lorem ipsum|coming soon|Eduscope|Match and Design|flow-equalizability/i);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, `${page}: duplicate IDs`);
  }
  assert.match(await read('robots.txt'), /Sitemap: https:\/\/furkandogan\.org\/sitemap.xml/);
  assert.equal(((await read('sitemap.xml')).match(/<loc>/g) || []).length, 3);
});

test('Public downloads have PDF signatures; authors and statuses match verified evidence', async () => {
  for (const path of ['furkan-dogan-cv.pdf', ...research.flatMap(p => p.href ? [p.href.slice(1)] : [])]) {
    assert.equal((await readFile(resolve(dist,path))).subarray(0,5).toString(), '%PDF-');
  }
  assert.equal(research.find(p => p.id === 'spatial-matching').status, 'Forthcoming');
  assert.equal(research.find(p => p.id === 'spatial-matching').journal, 'The Scandinavian Journal of Economics');
  assert.equal(research.find(p => p.id === 'worst-rank').authors, 'with Özgür Yılmaz');
  for (const path of ['index.html', 'final/index.html', 'research/index.html']) {
    assert.doesNotMatch(await read(path), /Cemil Dibek/);
  }
  assert.equal(academic.teaching.length, 6);
  assert.equal(academic.teaching[0].dates, '2023–2025');
});

test('Forthcoming publication has its own category, venue and scholarly metadata', async () => {
  const html = await read('research/index.html');
  assert.equal(research.filter(p => p.category === 'forthcoming').length, 1);
  assert.equal(research.filter(p => p.category === 'working-paper').length, 1);
  assert.match(html, /id="forthcoming"/);
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const article = schema['@graph'].find(item => item['@id']?.endsWith('#spatial-matching'));
  assert.equal(article.creativeWorkStatus, 'Forthcoming');
  assert.equal(article.isPartOf.name, 'The Scandinavian Journal of Economics');
  assert.equal(article.datePublished, undefined);
  for (const path of ['index.html', 'final/index.html', 'research/index.html']) {
    const page = await read(path);
    assert.match(page, /The Scandinavian Journal of Economics/);
    assert.doesNotMatch(page, /Revision submitted|Revise and Resubmit/);
  }
});
