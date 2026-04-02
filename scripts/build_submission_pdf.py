#!/usr/bin/env python3
"""Build submission-devops-exercise3.pdf from submission-devops-exercise3.md (repo root)."""

import re
from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parent.parent
MD_PATH = ROOT / "submission-devops-exercise3.md"
OUT_PATH = ROOT / "submission-devops-exercise3.pdf"


def strip_md(s: str) -> str:
    s = s.replace("\u2014", "-").replace("\u2013", "-")
    s = re.sub(r"\*\*(.+?)\*\*", r"\1", s)
    s = re.sub(r"\*(.+?)\*", r"\1", s)
    s = re.sub(r"`([^`]+)`", r"\1", s)
    s = re.sub(r"\[([^\]]*)\]\(([^)]+)\)", r"\2", s)
    s = re.sub(r"^-\s+", "", s)
    return s.strip()


def main() -> None:
    raw = MD_PATH.read_text(encoding="utf-8")
    lines = raw.splitlines()
    h1 = "Submission"
    sections: list[tuple[str, list[str]]] = []
    current_title: str | None = None
    current_body: list[str] = []

    for line in lines:
        if line.startswith("# ") and not line.startswith("##"):
            h1 = line[2:].strip()
            continue
        if line.startswith("## "):
            if current_title is not None:
                sections.append((current_title, current_body))
            current_title = line[3:].strip()
            current_body = []
            continue
        if current_title is not None and line.strip():
            current_body.append(line)
    if current_title is not None:
        sections.append((current_title, current_body))

    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=18)
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 16)
    pdf.multi_cell(0, 10, strip_md(h1), ln=True)
    pdf.ln(2)

    for title, body_lines in sections:
        pdf.set_font("Helvetica", "B", 12)
        pdf.multi_cell(0, 8, strip_md(title), ln=True)
        pdf.set_font("Helvetica", "", 10)

        for line in body_lines:
            img_m = re.match(r"!\[([^\]]*)\]\(([^)]+)\)", line.strip())
            if img_m:
                rel = img_m.group(2).lstrip("./")
                img_path = ROOT / rel
                pdf.image(str(img_path), x=10, w=190)
                pdf.ln(2)
                continue
            text = strip_md(line)
            if text:
                pdf.multi_cell(0, 6, text, ln=True)
        pdf.ln(3)

    pdf.output(str(OUT_PATH))
    print(f"Wrote {OUT_PATH}")


if __name__ == "__main__":
    main()
