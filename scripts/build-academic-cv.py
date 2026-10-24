"""Generate the privacy-filtered public CV from verified site data.

Requires reportlab; font paths default to macOS, overridable with --font-dir.
Original source CV and the pre-refinement website PDF remain untouched in backup.
"""
import argparse
import json
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--font-dir', default='/System/Library/Fonts/Supplemental')
args = parser.parse_args()
fonts = Path(args.font_dir)
for name, file in [('CVSans', 'Arial.ttf'), ('CVBold', 'Arial Bold.ttf'), ('CVSerif', 'Times New Roman.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(fonts / file)))
pdfmetrics.registerFontFamily('CVSans', normal='CVSans', bold='CVBold', italic='CVSans', boldItalic='CVBold')

academic = json.loads((ROOT / 'src/data/academic.json').read_text())
research = json.loads((ROOT / 'src/data/research.json').read_text())
ink = colors.HexColor('#171917')
muted = colors.HexColor('#555c53')
accent = colors.HexColor('#8a1f2d')
styles = {
    'name': ParagraphStyle('Name', fontName='CVSerif', fontSize=29, leading=34, textColor=ink, spaceAfter=8),
    'heading': ParagraphStyle('Heading', fontName='CVBold', fontSize=10, leading=13, textColor=accent, spaceBefore=18, spaceAfter=10, keepWithNext=True),
    'title': ParagraphStyle('Title', fontName='CVSans', fontSize=10.5, leading=14, textColor=ink, spaceAfter=3, keepWithNext=True),
    'body': ParagraphStyle('Body', fontName='CVSans', fontSize=9.6, leading=13.7, textColor=ink, spaceAfter=6),
    'meta': ParagraphStyle('Meta', fontName='CVSans', fontSize=9, leading=12.6, textColor=muted, spaceAfter=4),
}
story = []
def p(text, kind='body'):
    return Paragraph(text, styles[kind])
def heading(text):
    story.append(p(text.upper(), 'heading'))
def block(parts):
    story.append(KeepTogether(parts + [Spacer(1, 7)]))
def esc(text):
    return escape(text)

story += [p(esc(academic['name']), 'name'), p('Curriculum vitae · Academic profile', 'meta'), p(f'<link href="mailto:{academic["email"]}">{academic["email"]}</link>', 'body')]
heading('Research interests')
story.append(p('Microeconomic Theory · Market Design · Matching Theory · Mechanism Design'))
heading('Education')
for entry in academic['education']:
    parts = [p(f'<b>{esc(entry["institution"])}</b> — {esc(entry["dates"])}', 'title'), p(esc(entry['degree']), 'meta')]
    if entry.get('thesis'):
        parts.append(p(f'{"Dissertation" if entry["id"] == "koc" else "Thesis"}: {esc(entry["thesis"])}', 'body'))
        parts.append(p(f'Advisor: {esc(entry["advisor"])}', 'meta'))
    block(parts)
for category, category_title in [('forthcoming', 'Forthcoming publications'), ('working-paper', 'Working papers')]:
    papers = [paper for paper in research if paper['category'] == category]
    if not papers:
        continue
    heading(category_title)
    for paper in papers:
        parts = [p(esc(paper['title']), 'title')]
        if paper['authors']:
            parts.append(p(esc(paper['authors']), 'meta'))
        if paper.get('journal'):
            parts.append(p(esc(paper['journal']), 'body'))
        label = ('Job Market Paper · ' if paper.get('jobMarketPaper') else '') + paper['status']
        if paper.get('href'):
            label += f' · <link color="#8a1f2d" href="https://furkandogan.org{paper["href"]}">Working paper</link>'
        parts.append(p(label, 'meta'))
        block(parts)
heading('Work in progress')
for paper in research:
    if paper['category'] != 'work-in-progress':
        continue
    parts = [p(esc(paper['title']), 'title')]
    if paper['authors']:
        parts.append(p(esc(paper['authors']), 'meta'))
    block(parts)

story.append(PageBreak())
heading('Selected research projects')
for project in academic['projects']:
    block([
        p(esc(project['programme'] + ' ' + project['funding']), 'title'),
        p(esc(project['role'] + ' · ' + project['dates']), 'meta'),
        p(esc(project['title'] + (' ' if project['title'].endswith('?') else ': ') + project['subtitle'])),
        p(esc(project['approach'])),
        p(esc(project['contribution'])),
    ])
heading('Conference presentations')
for talk in academic['conferences']:
    paper = next(item for item in research if item['id'] == talk['paperId'])
    title = talk.get('fullTitle', talk['title'])
    block([p(esc(title), 'title'), p(esc(f'{talk["date"]} · {talk["city"]}, {talk["countryName"]}'), 'meta'), p(esc(paper['title'])), p(esc(talk['kind']), 'meta')])

story.append(PageBreak())
heading('Teaching experience')
for entry in academic['teaching']:
    block([p(f'<b>{esc(entry["institution"])}</b> — {esc(entry["dates"])}', 'title'), p(esc(entry['role']), 'meta'), p(esc('; '.join(entry['courses'])))])
heading('Honors and scholarships')
for award in academic['awards']:
    parts = [p(esc(award['title']) + ' · ' + esc(award['dates']), 'body')]
    if award.get('note'):
        parts.append(p(esc(award['note']), 'meta'))
    block(parts)
heading('Technical skills')
story.append(p('Python · MATLAB · R · Stata · LaTeX'))

def page_decoration(canvas, doc):
    canvas.saveState()
    w, h = A4
    if doc.page > 1:
        canvas.setFont('CVSans', 9)
        canvas.setFillColor(muted)
        canvas.drawString(48, h - 32, academic['name'] + ' · Curriculum vitae')
    canvas.setStrokeColor(colors.HexColor('#dcdfda'))
    canvas.line(48, 40, w - 48, 40)
    canvas.setFont('CVSans', 8)
    canvas.setFillColor(muted)
    canvas.drawString(48, 26, 'Academic profile · October 2026')
    canvas.drawRightString(w - 48, 26, str(doc.page))
    canvas.restoreState()

output = ROOT / 'public/furkan-dogan-cv.pdf'
doc = SimpleDocTemplate(str(output), pagesize=A4, leftMargin=48, rightMargin=48, topMargin=48, bottomMargin=54, title='Furkan Doğan — Academic CV', author='Furkan Doğan')
doc.build(story, onFirstPage=page_decoration, onLaterPages=page_decoration)
print(output)
