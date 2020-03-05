package main

import (
	"context"
	"log"
	"net"

	pb "github.com/okmttdhr/grpc-web-react-hooks/helloworld"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

const (
	port = ":9090"
)

type server struct {
	pb.UnimplementedGreeterServer
	requests []*pb.HelloRequest
}

func (s *server) SayHello(in *pb.HelloRequest, stream pb.Greeter_SayHelloServer) error {
	log.Printf("Received: %v", in.GetName())
	s.requests = append(s.requests, in)
	for _, r := range s.requests {
		if err := stream.Send(&pb.HelloReply{Message: "Hello " + r.GetName()}); err != nil {
			return err
		}
	}

	previousCount := len(s.requests)

	for {
		currentCount := len(s.requests)
		if previousCount < currentCount {
			log.Printf("Received new message")
			r := s.requests[currentCount-1]
			if err := stream.Send(&pb.HelloReply{Message: "Hello " + r.GetName()}); err != nil {
				return err
			}
		}
		previousCount = currentCount
	}
	return nil
}

func (s *server) SayHelloAgain(ctx context.Context, in *pb.HelloRequest) (*pb.HelloReply, error) {
	log.Printf("Received: %v", in.GetName())
	return &pb.HelloReply{Message: "Hello again " + in.GetName()}, nil
}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterGreeterServer(s, &server{})
	reflection.Register(s)
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
