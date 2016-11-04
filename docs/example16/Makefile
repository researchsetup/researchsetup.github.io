all: paper

paper: main.tex  content/*.tex
	pdflatex -interaction=nonstopmode main && bibtex main && bibtex main && pdflatex -interaction=nonstopmode main 

clean:
	rm -f  **.dvi **.aux **.log **.blg **.toc **.bbl **~ **.lof **.lot **.out
