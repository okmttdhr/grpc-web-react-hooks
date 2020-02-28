#!/usr/bin/env bash

set -xe

protoc --version
protoc --proto_path=proto helloworld.proto --go_out=plugins="grpc:server/helloworld"
    # --js_out=import_style=commonjs:${CLIENT_OUTDIR} \
    # --grpc-web_out=import_style=typescript,mode=grpcwebtext:${CLIENT_OUTDIR} \
