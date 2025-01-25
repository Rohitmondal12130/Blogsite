provider "aws" {
  region = "eu-north-1"  # Set your AWS region here
}

# Security Group to allow SSH, HTTP, and HTTPS
resource "aws_security_group" "blog_app_sg" {
  name        = "blog-app-sg"
  description = "Allow HTTP, HTTPS, and SSH traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "BlogAppSecurityGroup"
  }
}

# EC2 Instance configuration using EKS Node AMI
resource "aws_instance" "blog_app_instance" {
  ami           = "ami-00491471052499932"  # EKS Node AMI for Amazon Linux 2
  instance_type = "t3.micro"               # Instance type that is supported in the region
  key_name      = "Minal"                  # Your provided Key Pair name
  security_groups = [aws_security_group.blog_app_sg.name]

  tags = {
    Name = "BlogAppInstance"
  }

  user_data = <<-EOF
              #!/bin/bash
              # Update system and install Docker
              yum update -y
              yum install -y docker

              # Start Docker service
              service docker start
              docker info

              # Create a directory for the Docker Compose files
              mkdir -p /home/ec2-user/blogapp

              # Copy docker-compose.yml from S3 to EC2 instance
              aws s3 cp s3://minalsbucket.s3.eu-north-1.amazonaws.com/docker-compose.yml /home/ec2-user/blogapp/docker-compose.yml

              # Navigate to the directory and bring up Docker Compose services
              cd /home/ec2-user/blogapp
              docker-compose up -d
              EOF
}

# Output the EC2 instance's public IP address
output "instance_ip" {
  value = aws_instance.blog_app_instance.public_ip
}
