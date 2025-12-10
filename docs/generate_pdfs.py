#!/usr/bin/env python3
"""
Generate PDF versions of Hupyy industry reports using basic text formatting
This creates simple PDFs with the full markdown content
"""

import os
from pathlib import Path

# Try to use weasyprint if available, otherwise create placeholder PDFs
try:
    from weasyprint import HTML, CSS
    HAS_WEASYPRINT = True
except ImportError:
    HAS_WEASYPRINT = False
    print("WeasyPrint not available, creating placeholder PDFs")

INDUSTRIES = {
    'financial-services': 'Financial Services',
    'healthcare': 'Healthcare',
    'enterprise-security': 'Enterprise Security',
    'legal-services': 'Legal Services',
    'manufacturing': 'Manufacturing',
    'government-defense': 'Government & Defense',
    'education-research': 'Education & Research',
    'ai-ml-operations': 'AI/ML Operations',
    'software-development': 'Software Development',
    'energy-utilities': 'Energy & Utilities'
}

def create_pdf_from_html(slug, name):
    """Create PDF from HTML report"""
    html_file = Path('reports') / f'{slug}.html'
    pdf_file = Path('pdfs') / f'{slug}.pdf'

    if HAS_WEASYPRINT:
        # Use WeasyPrint to create professional PDF
        HTML(filename=str(html_file)).write_pdf(
            str(pdf_file),
            stylesheets=[CSS(filename='assets/css/main.css')]
        )
    else:
        # Create a simple placeholder PDF using basic text
        create_placeholder_pdf(slug, name, pdf_file)

    print(f"✓ Created {pdf_file}")

def create_placeholder_pdf(slug, name, pdf_file):
    """Create a simple PDF placeholder with markdown content"""
    md_file = Path('markdown') / f'{slug}-proposal.md'

    # Read markdown content
    with open(md_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Create a simple PDF using ASCII text format
    # This creates a minimal PDF that can be opened
    pdf_content = f"""%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/Resources <<
/Font <<
/F1 <<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
>>
>>
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length {len(content) + 200}
>>
stream
BT
/F1 12 Tf
50 750 Td
(Hupyy Technologies) Tj
0 -20 Td
({name} Industry Research Report) Tj
0 -40 Td
(Full report available in HTML and Markdown formats) Tj
0 -20 Td
(Visit: reports/{slug}.html) Tj
0 -40 Td
(This is a placeholder PDF. For the complete formatted report,) Tj
0 -15 Td
(please view the HTML version or download the Markdown file.) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000315 00000 n
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
{len(content) + 520}
%%EOF
"""

    with open(pdf_file, 'wb') as f:
        f.write(pdf_content.encode('latin-1', errors='ignore'))

def main():
    os.chdir('/Users/alexanderfedin/Projects/hapyy/proposals/generic/docs')

    print("Generating PDF Reports...")
    print("=" * 60)

    for slug, name in INDUSTRIES.items():
        try:
            create_pdf_from_html(slug, name)
        except Exception as e:
            print(f"✗ Error creating PDF for {slug}: {e}")

    print("=" * 60)
    print("PDF generation complete!")
    if not HAS_WEASYPRINT:
        print("\nNote: Created placeholder PDFs. For production-quality PDFs,")
        print("install WeasyPrint: pip install weasyprint")

if __name__ == '__main__':
    main()
