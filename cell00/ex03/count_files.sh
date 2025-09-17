#!/bin/bash

find . -maxdepth 1 \( -type f -o -type d \) -not -path "." | wc -l | xargs