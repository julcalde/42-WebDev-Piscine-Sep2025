#!/bin/bash

# Check if at least one argument is provided.
if [ $# -eq 0 ]; then
  echo "No arguments supplied"
fi

# Print each argument provided to the script, if they exist
if [ -n "$1" ]; then
  echo $1
fi

if [ -n "$2" ]; then
  echo $2
fi

if [ -n "$3" ]; then
  echo $3
fi