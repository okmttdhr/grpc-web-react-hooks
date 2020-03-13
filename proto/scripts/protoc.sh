#!/bin/sh

set -xe

SERVER_OUTPUT_DIR=server/messenger
CLIENT_OUTPUT_DIR=client/src/messenger

protoc --version
protoc --proto_path=proto messenger.proto \
  --go_out=plugins="grpc:${SERVER_OUTPUT_DIR}" \
  --js_out=import_style=commonjs:${CLIENT_OUTPUT_DIR} \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:${CLIENT_OUTPUT_DIR}
