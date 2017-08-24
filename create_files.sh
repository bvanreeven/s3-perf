#!/usr/bin/env bash

rm -rf files
mkdir files

for i in `seq 1 1010`; do
  base64 /dev/urandom | head -c 10 > files/file${i}.txt
done
