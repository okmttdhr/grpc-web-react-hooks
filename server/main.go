package main

import (
	"context"
	"log"
	"net"
	"time"

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
	for _, r := range s.requests {
		if err := stream.Send(&pb.MessageResponse{Message: r.GetMessage()}); err != nil {
			return err
		}
	}

	previousCount := len(s.requests)

	for {
		currentCount := len(s.requests)
		if previousCount < currentCount && currentCount > 0 {
			r := s.requests[currentCount-1]
			log.Printf("Sent: %v", r.GetMessage())
			if err := stream.Send(&pb.MessageResponse{Message: r.GetMessage()}); err != nil {
				return err
			}
		}
		previousCount = currentCount
	}
}

func (s *server) CreateMessage(ctx context.Context, r *pb.MessageRequest) (*pb.MessageResponse, error) {
	log.Printf("Received: %v", r.GetMessage())
	newR := &pb.MessageRequest{Message: r.GetMessage() + ": " + time.Now().Format("2006-01-02 15:04:05")}
	s.requests = append(s.requests, newR)
	return &pb.MessageResponse{Message: r.GetMessage()}, nil
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
