
Here's the updated `README.md` with the requested changes:

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

This updated README now includes a section for monitoring and viewing logs, ensuring it is more helpful for debugging and performance monitoring. Let me know if there's anything else you'd like to add! 🚀
hehe
=======
>>>>>>> e68f0d55f482a61533fa084eca56464a1c140338
