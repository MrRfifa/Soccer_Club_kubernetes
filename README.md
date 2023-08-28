
# MERN Application in AKS

Welcome to the **Soccer Club Kubernetes Deployment** repository! This repository contains the necessary files and configurations to deploy the Soccer Club application using Kubernetes. The application provides a comprehensive platform for managing a soccer club, featuring an admin panel and user interfaces for Members, Coaches, and Parents.

## Table of Contents

- [Introduction](#introduction)
- [Files](#files)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Run Locally](#Run Locally)
- [Deploy to Cloud (Microsoft Azure)](#Deploy to Cloud (Microsoft Azure))
- [Contributing](#contributing)


## Introduction
The Soccer Club Kubernetes Deployment repository aims to simplify the deployment process of the Soccer Club application using Kubernetes. By utilizing containerization and Kubernetes orchestration, the application can be easily scaled, managed, and maintained in a dynamic environment.
# Files

Those are the files that I used.

## Backend
In the **server** folder:

- `Dockerfile`: The Dockerfile used to containerize the backend application.

- `index.js`: The main entry point of the backend application.

- `routers`: This folder contains the route definitions for different API endpoints.

- `models`: The models folder includes data models used in the backend application.

- `middlewares`: This folder holds middleware functions used in request processing.

- `images`: A folder that might contain images or other media related to the backend (uploaded images).

## Frontend
In the **client** and **admin** folders:

- `Dockerfile`: The Dockerfile used to containerize the client application.
- `package.json`: The package.json file with dependencies and project information.
- `src`: The source folder containing frontend source code, components, and styles.
- `public`: The public folder containing static assets like HTML and media files.

## Kubernetes Deployment

In the **kubernetes** folder:

- `General`:
  - `frontend-configmap.yaml`: ConfigMap file for frontend configuration.
  - `mongo-secret.yaml`: Secret file for MongoDB credentials.

- `app`:
  - `admin-deployment.yaml`: Deployment + service file for the admin application.
  - `client-deployment.yaml`: Deployment + service file for the client application.
  - `mongo-deployment.yaml`: Deployment + service file for the MongoDB database.
  - `mongo-express-deployment.yaml`: Deployment + service file for MongoDB Express.
  - `server-deployment.yaml`: Deployment + service file for the backend server.

## Docker Compose

- `docker-compose.yaml`: The Docker Compose file that orchestrates the deployment of the application's services and containers for testing locally.

## Jenkins Pipeline

- **Jenkinsfile**: The Jenkinsfile used to define the pipeline for building, pushing into dockerhub, and deploying the application in AKS.

## Prerequisites

Before you start deploying and working with this project, ensure you have the following prerequisites in place:

- **Azure Kubernetes Service (AKS) Cluster**: For Kubernetes deployment, you need an AKS cluster up and running. This cluster will host your application's containerized components.

- **Jenkins**: You need a Jenkins instance set up for continuous integration and deployment. Make sure Jenkins is configured with necessary plugins and credentials for interacting with your repositories and Kubernetes cluster.

- **SonarQube**: SonarQube is used for code quality analysis. Set up and configure SonarQube to analyze your project's codebase.

- **Kubernetes Tools**: Ensure you have `kubectl` and `azure cli` installed and properly configured to interact with your AKS cluster.

- **Docker**: Docker is required to build and manage containers for your application's backend and frontend components.
## Installation

You have the flexibility to choose any cloud provider (AWS, Azure, Google) or run Jenkins and SonarQube locally using Docker Compose.
Here's how you can set up Jenkins and SonarQube using Docker Compose:

1. Install Docker: Ensure you have Docker installed on your system. For me, I used Azure virtual Machine and followed this guide : [How To Install and Use Docker on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)

2. Create a directory for your Docker Compose files and navigate to it.

3. Create a file named `docker-compose.yml` and paste the following content:

```yaml
version: '3'

services:
  jenkins:
    image: jenkins/jenkins:lts
    user: root  # Set Jenkins container to run as root
    volumes:
      - jenkins_data:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock  # Mount Docker socket
    networks:
      - sonarnet
    ports:
      - '8080:8080'
      - '50000:50000'

  sonarqube:
    image: sonarqube:7.6-community
    volumes:
      - sonarqube_conf:/opt/sonarqube/conf
      - sonarqube_data:/opt/sonarqube/data
      - sonarqube_extensions:/opt/sonarqube/extensions
      - sonarqube_bundled-plugins:/opt/sonarqube/lib/bundled-plugins
    networks:
      - sonarnet
    ports:
      - '9000:9000'
    environment:
      - sonar.jdbc.username=sonar
      - sonar.jdbc.password=sonar
      - sonar.jdbc.url=jdbc:postgresql://db:5432/sonar

  db:
    image: postgres
    networks:
      - sonarnet
    environment:
      - POSTGRES_USER=sonar
      - POSTGRES_PASSWORD=sonar
    volumes:
      - postgresql:/var/lib/postgresql
      - postgresql_data:/var/lib/postgresql/data

networks:
  sonarnet:
    driver: bridge

volumes:
  jenkins_data:
  sonarqube_conf:
  sonarqube_data:
  sonarqube_extensions:
  sonarqube_bundled-plugins:
  postgresql:
  postgresql_data:
```
4. Open a terminal in the same directory and run the following command to start Jenkins and SonarQube:

``` sh
docker-compose up -d
```
5. **Jenkins** will be accessible at `http://VM_IP_ADDR:8080`, and **SonarQube** at `http://VM_IP_ADDR:9000`.

6. Next, you need to install the necessary plugins in Jenkins, including SonarQube, Node.js, and Kubernetes plugins.

7. The final step of the installation process is to install `kubectl` and the `Azure CLI` inside the Jenkins container. To achieve this, you can create a pipeline in Jenkins and use the following **Groovy** script:

```groovy
pipeline {
    agent any

    stages {
        stage('Install kubectl') {
            steps {
                script {
                    sh 'curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"'
                    sh 'chmod +x kubectl'
                    sh 'mv kubectl /usr/local/bin/'
                }
            }
        }
        stage('Install Azure CLI') {
            steps {
                script {
                    sh 'curl -sL https://aka.ms/InstallAzureCLIDeb | bash'
                }
            }
        }
    }
}
```
## Run Locally

To run the application locally, follow these steps:

1. **Clone this repository** to your local machine:

    ```bash
    git clone https://github.com/MrRfifa/Soccer_Club_kubernetes
    ```

2. **Navigate to the cloned directory**:

    ```bash
    cd Soccer_Club_kubernetes
    ```

3. **Testing the app locally**:

    To launch the application using Docker Compose, run the following command:

    ```bash
    docker-compose up -d
    ```

    Access the Client app at:

    `http://localhost:3000`

    Access the Admin app at:

    `http://localhost:3002`

    Make sure to replace `3000` and `3002` with the appropriate ports if you've configured different ports for your app.

    To shut down the containers:

    ```bash
    docker-compose down
    ```

4. **Testing with Kubernetes locally**:

   If you have `minikube` and `kubectl` installed, follow these steps:

   - Start the minikube cluster:

     ```bash
     minikube start
     ```

   - Apply the Secret and ConfigMap:

     ```bash
     kubectl apply -f kubernetes/general
     ```

   - Deploy the application using Kubernetes:

     ```bash
     kubectl apply -f kubernetes/app
     ```
   - Access any service by using:

     ```bash
     minikube service service_name
     ```
## Deploy to Cloud (Microsoft Azure)

Once you have set up everything on your Jenkins server, follow these steps to deploy your app to a Kubernetes cluster in Microsoft Azure:

1. Create a new pipeline job in Jenkins.

2. Configure the job to use your GitHub repository as the source code management (SCM) system.

3. Set up the necessary build and deployment steps in your Jenkins pipeline to build Docker images, deploy to Kubernetes, and perform any other required tasks.

4. Trigger the pipeline to start the deployment process.

Congratulations! Your application will now be deployed and running on your Kubernetes cluster in Microsoft Azure.

## Contributing

Contributions to this repository are welcome! If you find any issues or want to enhance the deployment process, feel free to create pull requests. Please follow the existing code style and guidelines.


## Tech Stack




## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

