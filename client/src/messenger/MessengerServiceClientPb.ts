/**
 * @fileoverview gRPC-Web generated client stub for messenger
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

import {
  MessageRequest,
  MessageResponse} from './messenger_pb';

export class MessengerClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoGetMessages = new grpcWeb.AbstractClientBase.MethodInfo(
    MessageResponse,
    (request: google_protobuf_empty_pb.Empty) => {
      return request.serializeBinary();
    },
    MessageResponse.deserializeBinary
  );

  getMessages(
    request: google_protobuf_empty_pb.Empty,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/messenger.Messenger/GetMessages',
      request,
      metadata || {},
      this.methodInfoGetMessages);
  }

  methodInfoCreateMessage = new grpcWeb.AbstractClientBase.MethodInfo(
    MessageResponse,
    (request: MessageRequest) => {
      return request.serializeBinary();
    },
    MessageResponse.deserializeBinary
  );

  createMessage(
    request: MessageRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: MessageResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/messenger.Messenger/CreateMessage',
      request,
      metadata || {},
      this.methodInfoCreateMessage,
      callback);
  }

}

