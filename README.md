# NodeApp Kubernetes Deployment

## Overview
This project demonstrates the deployment of a Node.js application using Docker, Kubernetes, and Helm. It also includes CI/CD integration with Jenkins for automated builds and deployments.

## Prerequisites
- Docker
- Kubernetes (Minikube or any Kubernetes cluster)
- Helm
- Jenkins with Docker and Kubernetes plugins

## Project Structure
- `DockerFiles`: Contains Dockerfile for the Node.js application.
- `nodeapp-helm`: Helm chart for deploying the application to Kubernetes.
- `KubernetesFiles`: Contains Kubernetes manifests (alternative to Helm).
- `Jenkinsfile`: Pipeline script for CI/CD process.

## Setup and Configuration
### Building the Docker Image
The Docker image for the Node.js application can be built using the Dockerfile provided in the `DockerFiles` directory.
docker build -t myapp:latest -f DockerFiles/Dockerfile .


### Kubernetes Deployment
The application can be deployed to Kubernetes using either raw Kubernetes manifests from `KubernetesFiles` or the Helm chart in `nodeapp-helm`.

#### Using Kubernetes Manifests
kubectl apply -f KubernetesFiles/

#### Using Helm
First, update the values in `nodeapp-helm/values.yaml` as per your configuration.

Then, deploy using Helm:
helm install nodeapp-release nodeapp-helm/ --namespace my-namespace

### Jenkins CI/CD
The `Jenkinsfile` includes steps for building the Docker image, pushing it to a registry, and deploying the application to Kubernetes using Helm.

Ensure Jenkins is configured with necessary plugins and credentials for Docker, Kubernetes, and your container registry.

## Accessing the Application
- For NodePort service: `http://<NodeIP>:<NodePort>`
- For LoadBalancer service: `http://<External-IP>`
- For Ingress: Configure the DNS or modify the `/etc/hosts` file and access via the specified domain.
