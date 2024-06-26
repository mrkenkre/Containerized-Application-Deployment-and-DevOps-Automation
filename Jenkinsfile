pipeline {
    agent any
    environment {
        ECR_REGISTRY = '781104868468.dkr.ecr.us-east-1.amazonaws.com'
        IMAGE_NAME = 'myapp'
        HELM_RELEASE_NAME = 'nodeapp-release'
        CHART_PATH = 'nodeapp-helm/' 
        KUBECONFIG = 'C:/Users/Artemis. (MK)/.kube/config'
    }
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    def imageTag = "${IMAGE_NAME}:${env.BUILD_NUMBER}"
                    bat "docker build -t ${imageTag} -f DockerFiles/Dockerfile ."
                    env.DOCKER_IMAGE_TAG = imageTag
                }
            }
        }
        stage('Login to Amazon ECR') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'AWS01']]) {
                    script {
                        bat "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_REGISTRY"
                    }
                }
            }
        }
        stage('Tag and Push Image to Amazon ECR') {
            steps {
                script {
                    //bat "docker tag ${env.DOCKER_IMAGE_TAG} $ECR_REGISTRY/${env.DOCKER_IMAGE_TAG}"

                    bat "docker tag ${env.DOCKER_IMAGE_TAG} $ECR_REGISTRY/${IMAGE_NAME}:latest"

                    //bat "docker push $ECR_REGISTRY/${env.DOCKER_IMAGE_TAG}"

                    bat "docker push $ECR_REGISTRY/${IMAGE_NAME}:latest"
                }
            }
        }
        stage('Deploy to Kubernetes using Helm') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'AWS01']]) {
                script {
                    bat "helm dependency update $CHART_PATH -n my-namespace"
                    // Check if the namespace exists, and create it if it doesn't
                    bat "kubectl get ns my-namespace || kubectl create ns my-namespace"
                    bat "helm upgrade --install $HELM_RELEASE_NAME $CHART_PATH --namespace my-namespace"
                }
            }
            }
        }
    }
}