PREFIX ?= /usr/local

install: bin/nodeinit.sh
	cp $< $(PREFIX)/bin/nodeinit

uninstall:
	rm -f $(PREFIX)/bin/nodeinit

.PHONY: install uninstall