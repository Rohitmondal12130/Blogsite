
---

# Blog Application (MERN Stack)

A comprehensive blog application built with the MERN stack (MongoDB, Express.js, React, Node.js). This project integrates Docker for containerized deployment and development, ensuring seamless setup and scalability.

> **Cloned Repository**: [Shahin2138's Blog Application](https://github.com/shahin2138/Blog-Application)

---

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
5. [Dockerization](#dockerization)
   - [Dockerfile for Client](#dockerfile-for-client)
   - [Dockerfile for Server](#dockerfile-for-server)
6. [Running the Project](#running-the-project)
   - [Without Docker](#without-docker)
   - [With Docker](#with-docker)
7. [Monitoring and Logs](#monitoring-and-logs)
8. [Accessing the Application](#accessing-the-application)

---

## Overview

This project is a fully functional blog application where users can:
- Create, read, update, and delete blog posts.
- View a user-friendly interface for managing blogs.
- Interact with RESTful APIs.

It includes:
- **Frontend**: React for building a responsive UI.
- **Backend**: Express.js with Node.js for handling APIs.
- **Database**: MongoDB for storing blog data.
- **Containerization**: Docker for easy deployment.

---

## Features

- Full CRUD functionality for blogs.
- RESTful API integration.
- Scalable and portable deployment using Docker.
- Environment-specific MongoDB URI support.
- Modular architecture for easy development and maintenance.

---

## Project Structure

```
Blog-Application/
├── client/                 # Frontend (React)
│   ├── src/                # React components and logic
│   └── Dockerfile          # Dockerfile for the client
├── server/                 # Backend (Express.js)
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   └── Dockerfile          # Dockerfile for the server
├── docker-compose.yml      # Docker Compose configuration
└── README.md               # Project documentation

```

---

## Installation

### Prerequisites
1. Install [Node.js](https://nodejs.org/) (v20.17.0 or later).
2. Install [Docker](https://www.docker.com/).

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/shahin2138/Blog-Application.git
   cd Blog-Application
   ```

2. Install dependencies:
   - **Client**:
     ```bash
     cd client
     npm install
     ```
   - **Server**:
     ```bash
     cd server
     npm install
     ```

3. Add MongoDB connection URI:
   - Update the MongoDB URI in both the `client` and `server` configurations.

4. Test locally:
   - **Client**:
     ```bash
     npm start
     ```
   - **Server**:
     ```bash
     node server.js
     ```

---

## Dockerization

### Dockerfile for Client
```dockerfile
FROM node:20.17.0

WORKDIR /app

COPY . .

RUN npm install -g http-server

EXPOSE 3000

CMD [ "npm", "start" ]
```

### Dockerfile for Server
```dockerfile
FROM node:20.17.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

---

## Running the Project

### Without Docker
1. **Client**:
   ```bash
   cd client
   npm start
   ```
2. **Server**:
   ```bash
   cd server
   node server.js
   ```

### With Docker

#### Step 1: Build Docker Images
- **Client**:
  ```bash
  docker build -t blog-app-client ./client
  ```
- **Server**:
  ```bash
  docker build -t blog-app-server ./server
  ```

![image](https://github.com/user-attachments/assets/ddf86b60-e3b7-456d-bebf-4ff1f7b50537)



#### Step 2: Run Docker Containers
- **Client**:
  ```bash
  docker run -p 3000:3000 blog-app-client
  ```
- **Server**:
  ```bash
  docker run -p 5000:5000 blog-app-server
  ```
![image](https://github.com/user-attachments/assets/97ab86f6-ab2f-406f-b071-6a37cda2eba2)



  
With Docker
Step 1: Create a docker-compose.yml File
In the root folder of the project, create a file named docker-compose.yml with the following content:

```
version: '3.8'
services:
  client:
    build:
      context: ./client
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
  server:
    build:
      context: ./server
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=<your_mongo_uri>
  mongodb:
    image: mongo
    container_name: mongodb
    ports:
      - "27017:27017"

```
![image](https://github.com/user-attachments/assets/845d4ee7-6636-436a-a125-1664f906aeb4)




#### Step 3: Use Docker Compose
Build and start both services with one command:
```bash
docker-compose up --build
```
![image](https://github.com/user-attachments/assets/a9413f9a-a801-4024-86e0-655ff6db5fbb)

---

## Monitoring and Logs

### View Container Resource Usage
To monitor CPU and memory usage of your running containers:
1. Use the following command to display real-time usage stats:
   ```bash
   docker stats
   ```
   Output includes:
   - **CONTAINER ID**: Unique identifier of the container.
   - **NAME**: Name of the container.
   - **CPU %**: CPU usage percentage.
   - **MEMORY USAGE / LIMIT**: Memory usage and limit.
   - **MEMORY %**: Percentage of memory usage.

![image](https://github.com/user-attachments/assets/48e39032-270f-406d-a60e-da6b06c0640d)



### View Logs of Containers
1. Check logs for the **client** container:
   ```bash
   docker logs <client-container-id>
   ```
2. Check logs for the **server** container:
   ```bash
   docker logs <server-container-id>
   ```
3. To view logs in real-time (streaming logs):
   - **Client**:
     ```bash
     docker logs -f <client-container-id>
     ```
   - **Server**:
     ```bash
     docker logs -f <server-container-id>
     ```

---

## Accessing the Application

Once the Docker containers are up, access the application at:
- **Frontend**: [http://localhost:3000/home](http://localhost:3000/home)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

---

=======


# Terraform AWS Setup Guide

## Overview

This guide walks you through setting up an AWS EC2 instance and other resources using Terraform. The resources provisioned include:
1. An EC2 instance.
2. A security group allowing HTTP, HTTPS, and SSH traffic.
3. Integration of Docker to deploy a sample application using `docker-compose`.

## Prerequisites

Before starting, ensure you have the following tools installed:

1. **Terraform**: Download and install from [Terraform's official website](https://www.terraform.io/downloads).
2. **AWS CLI**: Install and configure the AWS CLI from [AWS CLI official website](https://aws.amazon.com/cli/).
3. **AWS Account**: Create an AWS account if you don’t have one.
4. **Key Pair**: Generate an AWS Key Pair in the target region for SSH access to your EC2 instance.

---

## Project Structure

```plaintext
project-folder/
├── main.tf        # Contains Terraform configuration for AWS resources
├── variables.tf   # Input variables for the Terraform setup
├── outputs.tf     # Outputs for displaying instance IP and other details
├── docker-compose.yml # Docker Compose file for the app (stored in S3)
└── README.md      # Documentation
```

---

## Terraform Configuration

### **1. `main.tf`**
This file contains the Terraform code for provisioning resources.

```hcl
provider "aws" {
  region = "eu-north-1"  # Replace with your desired AWS region
}

# Security Group to allow HTTP, HTTPS, and SSH traffic
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

# EC2 Instance
resource "aws_instance" "blog_app_instance" {
  ami           = "ami-0c02fb55956c7d316"  # Amazon Linux 2 AMI for eu-north-1
  instance_type = "t3.micro"
  key_name      = "YourKeyPairName"        # Replace with your key pair name
  security_groups = [aws_security_group.blog_app_sg.name]

  tags = {
    Name = "BlogAppInstance"
  }

  user_data = <<-EOF
              #!/bin/bash
              # Update the system and install Docker
              yum update -y
              yum install -y docker
              service docker start
              usermod -aG docker ec2-user

              # Install AWS CLI v2
              curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
              unzip awscliv2.zip
              sudo ./aws/install

              # Download docker-compose.yml from S3
              aws s3 cp s3://your-bucket-name/docker-compose.yml /home/ec2-user/docker-compose.yml

              # Start the application
              cd /home/ec2-user
              docker-compose up -d
              EOF
}

# Output the EC2 instance's public IP
output "instance_ip" {
  value = aws_instance.blog_app_instance.public_ip
}

output "app_url" {
  value = "http://${aws_instance.blog_app_instance.public_ip}:3000"
}
```

---

### **2. `variables.tf`**
Define variables to make the Terraform script reusable.

```hcl
variable "region" {
  default = "eu-north-1"
}

variable "key_pair_name" {
  description = "Name of the AWS Key Pair"
  type        = string
}
```

---

### **3. `outputs.tf`**
Configure outputs to display important information after provisioning.

```hcl
output "instance_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.blog_app_instance.public_ip
}

output "app_url" {
  description = "Application URL"
  value       = "http://${aws_instance.blog_app_instance.public_ip}:3000"
}
```

---

### **4. `docker-compose.yml`**
Upload this file to an S3 bucket before running Terraform. It contains instructions to deploy your application using Docker Compose.

```yaml
version: '3.8'

services:
  app:
    image: nginx:latest
    ports:
      - "3000:80"

  mongodb:
    image: mongo:latest
    container_name: mongodb
    ports:
      - "27017:27017"
```

Upload to S3 using the AWS CLI:
```bash
aws s3 cp docker-compose.yml s3://your-bucket-name/
```

---

## Steps to Deploy

1. **Initialize Terraform**
   Run the following command to initialize Terraform in your project directory:
   ```bash
   terraform init
   ```

2. **Validate Configuration**
   Ensure that your Terraform configuration files are valid:
   ```bash
   terraform validate
   ```

3. **Plan the Infrastructure**
   Generate and review an execution plan:
   ```bash
   terraform plan
   ```

4. **Apply the Configuration**
   Apply the Terraform configuration to provision the resources:
   ```bash
   terraform apply
   ```

   Confirm the action when prompted by typing `yes`.

5. **Check the Outputs**
   Once the deployment is complete, Terraform will output the EC2 instance’s public IP and application URL:
   ```bash
   Apply complete! Resources: X added, 0 changed, 0 destroyed.

   Outputs:
   instance_ip = "X.X.X.X"
   app_url = "http://X.X.X.X:3000"
   ```

---

## Verifying the Setup

1. Open your browser and visit the `app_url` output by Terraform to check if the application is running.
2. SSH into the EC2 instance to troubleshoot or manage:
   ```bash
   ssh -i your-key.pem ec2-user@<instance_ip>
   ```

---

## Cleaning Up

To destroy the infrastructure and avoid incurring costs, use the following command:
```bash
terraform destroy
```

---

## Common Issues

1. **AMI Not Found**: Ensure you’re using the correct AMI ID for your region.
2. **Port Already Allocated**: Stop any service using the port or update the `docker-compose.yml` file with a different port.
3. **Access Denied**: Ensure your AWS credentials are properly configured and have the necessary permissions.

---

