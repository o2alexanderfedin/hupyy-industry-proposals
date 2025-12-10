#!/usr/bin/env python3
"""
Convert Hupyy industry research reports from Markdown to HTML and PDF
"""

import os
import re
import glob
from pathlib import Path

# Industry metadata
INDUSTRIES = {
    'financial-services-proposal.md': {
        'title': 'Financial Services Industry Research Report',
        'market': '$5-10B SAM',
        'slug': 'financial-services'
    },
    'healthcare-proposal.md': {
        'title': 'Healthcare Industry Research Report',
        'market': '$4-8B SAM',
        'slug': 'healthcare'
    },
    'enterprise-security-proposal.md': {
        'title': 'Enterprise Security Industry Research Report',
        'market': '$8-15B SAM',
        'slug': 'enterprise-security'
    },
    'legal-services-proposal.md': {
        'title': 'Legal Services Industry Research Report',
        'market': '$0.5-1B SAM',
        'slug': 'legal-services'
    },
    'manufacturing-proposal.md': {
        'title': 'Manufacturing Industry Research Report',
        'market': '$15-25B SAM',
        'slug': 'manufacturing'
    },
    'government-defense-proposal.md': {
        'title': 'Government & Defense Industry Research Report',
        'market': '$6-11B SAM',
        'slug': 'government-defense'
    },
    'education-research-proposal.md': {
        'title': 'Education & Research Industry Research Report',
        'market': '$1.8-4.2B SAM',
        'slug': 'education-research'
    },
    'ai-ml-operations-proposal.md': {
        'title': 'AI/ML Operations Industry Research Report',
        'market': '$10-20B SAM',
        'slug': 'ai-ml-operations'
    },
    'software-development-proposal.md': {
        'title': 'Software Development Industry Research Report',
        'market': '$16.2B SAM',
        'slug': 'software-development'
    },
    'energy-utilities-proposal.md': {
        'title': 'Energy & Utilities Industry Research Report',
        'market': '$3-6B SAM',
        'slug': 'energy-utilities'
    }
}

def markdown_to_html(markdown_text):
    """Convert markdown to HTML with basic formatting"""
    html = markdown_text

    # Convert headers
    html = re.sub(r'^# (.+)$', r'<h1>\1</h1>', html, flags=re.MULTILINE)
    html = re.sub(r'^## (.+)$', r'<h2>\1</h2>', html, flags=re.MULTILINE)
    html = re.sub(r'^### (.+)$', r'<h3>\1</h3>', html, flags=re.MULTILINE)
    html = re.sub(r'^#### (.+)$', r'<h4>\1</h4>', html, flags=re.MULTILINE)
    html = re.sub(r'^##### (.+)$', r'<h5>\1</h5>', html, flags=re.MULTILINE)
    html = re.sub(r'^###### (.+)$', r'<h6>\1</h6>', html, flags=re.MULTILINE)

    # Convert bold and italic
    html = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', html)
    html = re.sub(r'\*(.+?)\*', r'<em>\1</em>', html)

    # Convert links
    html = re.sub(r'\[(.+?)\]\((.+?)\)', r'<a href="\2">\1</a>', html)

    # Convert inline code
    html = re.sub(r'`(.+?)`', r'<code>\1</code>', html)

    # Convert unordered lists
    lines = html.split('\n')
    in_list = False
    result = []
    for line in lines:
        if line.strip().startswith('- '):
            if not in_list:
                result.append('<ul>')
                in_list = True
            result.append(f'<li>{line.strip()[2:]}</li>')
        else:
            if in_list:
                result.append('</ul>')
                in_list = False
            result.append(line)
    if in_list:
        result.append('</ul>')
    html = '\n'.join(result)

    # Convert horizontal rules
    html = re.sub(r'^---$', r'<hr>', html, flags=re.MULTILINE)

    # Wrap paragraphs
    lines = html.split('\n')
    result = []
    in_para = False
    for line in lines:
        stripped = line.strip()
        if stripped and not stripped.startswith('<') and not in_para:
            result.append('<p>')
            result.append(line)
            in_para = True
        elif not stripped and in_para:
            result.append('</p>')
            result.append(line)
            in_para = False
        else:
            if in_para and stripped.startswith('<'):
                result.append('</p>')
                in_para = False
            result.append(line)
    if in_para:
        result.append('</p>')

    return '\n'.join(result)

def create_html_template(title, content, market, slug):
    """Create full HTML page with header and footer"""
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{title} - Hupyy Technologies Market Analysis ({market})">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="Comprehensive market analysis of {title.replace(' Industry Research Report', '')} industry for Hupyy Technologies platform">
  <meta property="og:type" content="article">
  <title>{title} | Hupyy Technologies</title>
  <link rel="stylesheet" href="../assets/css/main.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
</head>
<body>
  <div class="report-header">
    <div class="container">
      <div class="breadcrumb">
        <a href="../index.html">Home</a> &gt; <a href="../index.html#industries">Industries</a> &gt; {title.replace(' Industry Research Report', '')}
      </div>
      <h1 class="report-title">{title}</h1>
      <div class="report-meta">
        Serviceable Addressable Market: {market}
      </div>
      <div class="report-actions">
        <a href="../pdfs/{slug}.pdf" class="btn btn-secondary" download>Download PDF</a>
        <a href="../markdown/{os.path.basename(slug)}-proposal.md" class="btn btn-tertiary" download>Download Markdown</a>
        <button onclick="window.print()" class="btn btn-primary">Print Report</button>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="report-content">
      {content}
    </div>
  </div>

  <div class="footer">
    <div class="container">
      <p>&copy; 2025 Hupyy Technologies. All rights reserved.</p>
      <p><a href="../index.html" style="color: white;">Back to Industry Overview</a></p>
    </div>
  </div>

  <script src="../assets/js/main.js"></script>
</body>
</html>'''

def convert_report(md_file, metadata):
    """Convert a single markdown report to HTML"""
    markdown_dir = Path('markdown')
    reports_dir = Path('reports')

    # Read markdown
    with open(markdown_dir / md_file, 'r', encoding='utf-8') as f:
        markdown_content = f.read()

    # Convert to HTML
    html_content = markdown_to_html(markdown_content)

    # Create full HTML page
    full_html = create_html_template(
        metadata['title'],
        html_content,
        metadata['market'],
        metadata['slug']
    )

    # Write HTML file
    html_file = reports_dir / f"{metadata['slug']}.html"
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(full_html)

    print(f"✓ Created {html_file}")

def main():
    os.chdir('/Users/alexanderfedin/Projects/hapyy/proposals/generic/docs')

    print("Converting Hupyy Industry Reports...")
    print("=" * 60)

    for md_file, metadata in INDUSTRIES.items():
        try:
            convert_report(md_file, metadata)
        except Exception as e:
            print(f"✗ Error converting {md_file}: {e}")

    print("=" * 60)
    print("HTML conversion complete!")

if __name__ == '__main__':
    main()
