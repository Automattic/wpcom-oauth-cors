
# this dir
THIS_MAKEFILE_PATH:=$(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST))
THIS_DIR:=$(shell cd $(dir $(THIS_MAKEFILE_PATH));pwd)

# alias
NM := node_modules

# BIN directory
BIN := $(THIS_DIR)/$(NM)/.bin

# applications
NODE ?= node
BROWSERIFY ?= $(NODE) $(BIN)/browserify

build:
	@$(BROWSERIFY) \
		index.js \
		> dist/wpcom-oauth.js

init:
	npm install
	make build

test:
	@$(BROWSERIFY) \
		test/app.js \
		> test/test.js

.PHONY: build init test
