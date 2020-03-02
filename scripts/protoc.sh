#!/bin/sh

set -xe

protoc --version
protoc --proto_path=proto helloworld.proto \
  --go_out=plugins="grpc:server/helloworld" \
  --js_out=import_style=commonjs:client \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:client
