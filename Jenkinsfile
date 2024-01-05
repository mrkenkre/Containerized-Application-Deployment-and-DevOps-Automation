pipeline {
    agent any
    environment {
        ECR_REGISTRY = '781104868468.dkr.ecr.us-east-1.amazonaws.com'
        IMAGE_NAME = 'my-app'
    }
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    def imageTag = "${IMAGE_NAME}:${env.BUILD_NUMBER}"
                    sh "docker build -t ${imageTag} ."
                    env.DOCKER_IMAGE_TAG = imageTag
                }
            }
        }
        stage('Login to Amazon ECR') {
            steps {
                script {
                    sh "\$(aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_REGISTRY)"
                }
            }
        }
        stage('Push Image to Amazon ECR') {
            steps {
                script {
                    sh "docker tag ${env.DOCKER_IMAGE_TAG} $ECR_REGISTRY/${env.DOCKER_IMAGE_TAG}"
                    sh "docker push $ECR_REGISTRY/${env.DOCKER_IMAGE_TAG}"
                }
            }
        }
    }
}
