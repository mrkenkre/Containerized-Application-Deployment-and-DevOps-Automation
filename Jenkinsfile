pipeline {
    agent any
    environment {
        ECR_REGISTRY = '781104868468.dkr.ecr.us-east-1.amazonaws.com'
        IMAGE_NAME = 'myapp'
    }
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    def imageTag = "${IMAGE_NAME}:${env.BUILD_NUMBER}"
                    bat "docker build -t ${imageTag} ."
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
        stage('Push Image to Amazon ECR') {
            steps {
                script {
                    bat "docker tag ${env.DOCKER_IMAGE_TAG} $ECR_REGISTRY/${env.DOCKER_IMAGE_TAG}"
                    bat "docker push $ECR_REGISTRY/${env.DOCKER_IMAGE_TAG}"
                }
            }
        }
    }
}