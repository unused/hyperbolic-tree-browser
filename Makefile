# vi : noet

beamer_opts := -t beamer -H header.tex --latex-engine=xelatex \
  -V theme:metropolis -V fontsize=11pt --slide-level=2

build_dir := build

.PHONY: slides clean

all: slides

slides:
	@cd slides && \
		pandoc slides.md $(beamer_opts) -o ./../$(build_dir)/slides.pdf

clean:
	@rm -rf $(build_dir)/*

default: slides
