#!/usr/bin/env bash
(cd javascript-analyzer-and-renderer-harness && npm run lint) \
&& \
(cd Renderer && npm run lint)