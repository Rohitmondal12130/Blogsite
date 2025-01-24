provider "aws" {
  region = "us-east-1" # Change to your preferred region
}

resource "aws_ecs_cluster" "blog_cluster" {
  name = "blog-cluster"
}

resource "aws_ecs_task_definition" "blog_task" {
  family                   = "blog-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "512"
  memory                   = "1024"

  container_definitions = jsonencode([
    {
      name      = "blog-client"
      image     = "rohitmondal12130/blog-client:latest" # Replace with your actual Docker Hub username and image
      cpu       = 256
      memory    = 512
      essential = true
      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
        }
      ]
    },
    {
      name      = "blog-server"
      image     = "rohitmondal12130/blog-server:latest" # Replace with your actual Docker Hub username and image
      cpu       = 256
      memory    = 512
      essential = true
      portMappings = [
        {
          containerPort = 5000
          hostPort      = 5000
        }
      ]
    }
  ])
}

resource "aws_ecs_service" "blog_service" {
  name            = "blog-service"
  cluster         = aws_ecs_cluster.blog_cluster.id
  task_definition = aws_ecs_task_definition.blog_task.arn
  desired_count   = 1

  network_configuration {
    subnets         = ["subnet-0123456789abcdef0"] # Replace with your actual subnet ID
    security_groups = ["sg-0123456789abcdef0"]     # Replace with your actual security group ID
    assign_public_ip = true
  }
}

resource "aws_lb" "blog_lb" {
  name               = "blog-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = ["sg-0123456789abcdef0"] # Replace with your actual security group ID
  subnets            = ["subnet-0123456789abcdef0"] # Replace with your actual subnet ID

  enable_deletion_protection = false
}

resource "aws_lb_target_group" "client_tg" {
  name     = "client-target-group"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = "vpc-0123456789abcdef0" # Replace with your actual VPC ID
}

resource "aws_lb_target_group" "server_tg" {
  name     = "server-target-group"
  port     = 5000
  protocol = "HTTP"
  vpc_id   = "vpc-0123456789abcdef0" # Replace with your actual VPC ID
}

resource "aws_lb_listener" "client_listener" {
  load_balancer_arn = aws_lb.blog_lb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.client_tg.arn
  }
}

resource "aws_lb_listener" "server_listener" {
  load_balancer_arn = aws_lb.blog_lb.arn
  port              = 5000
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.server_tg.arn
  }
}
