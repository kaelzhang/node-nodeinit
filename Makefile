PREFIX ?= /usr/local

install: bin/nodeinit
	cp $< $(PREFIX)/$<

uninstall:
	rm -f $(PREFIX)/bin/nodeinit

.PHONY: install uninstall