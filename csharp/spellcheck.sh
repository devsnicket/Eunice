#!/bin/bash

find . -type f \( -name "*.fs" -o -name "*.txt" \) ! -path "./.store/**" ! -path "**/obj/**" -exec npx cspell@4.0.30 {} +