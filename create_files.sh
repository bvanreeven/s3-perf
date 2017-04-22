#!/usr/bin/env bash

rm -rf files
mkdir files

for i in `seq 1 100`; do
  base64 /dev/urandom | head -c 20480 > files/file${i}.txt
done
