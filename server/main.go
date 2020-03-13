package main

import (
	"log"
	"net"

	"github.com/golang/protobuf/ptypes/empty"
	pb "github.com/okmttdhr/grpc-web-react-hooks/messenger"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

const (
	port = ":9090"
)

type server struct {
	pb.UnimplementedMessengerServer
	requests []*pb.MessageRequest
}

func (s *server) GetMessages(_ *empty.Empty, stream pb.Messenger_GetMessagesServer) error {
	previousCount := len(s.requests)

	for {
		currentCount := len(s.requests)
		if previousCount < currentCount {
			log.Printf("Received new message")
			r := s.requests[currentCount-1]
			if err := stream.Send(&pb.MessageResponse{Message: "Hello " + r.GetMessage()}); err != nil {
				return err
			}
		}
		previousCount = currentCount
	}
}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterMessengerServer(s, &server{})
	reflection.Register(s)
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
