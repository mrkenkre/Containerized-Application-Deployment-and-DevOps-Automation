# PowerShell script to refresh AWS ECR token and update Kubernetes secret

# Define your AWS ECR details
$awsRegion = "us-east-1"
$awsEcrRegistry = "781104868468.dkr.ecr.us-east-1.amazonaws.com"
$secretName = "ecr-registry"
$namespace = "my-namespace"

# Get a new token from AWS ECR
$token = aws ecr get-login-password --region $awsRegion
if (!$token) {
    Write-Error "Failed to get AWS ECR token"
    exit 1
}

# Encode the token for Kubernetes
$authToken = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("AWS:$token"))

# Create the new .dockerconfigjson content
$dockerConfigJson = @{
    auths = @{
        $awsEcrRegistry = @{
            auth = $authToken
        }
    }
} | ConvertTo-Json

# Encode the .dockerconfigjson to base64
$encodedDockerConfigJson = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($dockerConfigJson))

# Update the Kubernetes secret
$k8sSecret = @{
    apiVersion = "v1"
    kind = "Secret"
    metadata = @{
        name = $secretName
        namespace = $namespace
    }
    type = "kubernetes.io/dockerconfigjson"
    data = @{
        ".dockerconfigjson" = $encodedDockerConfigJson
    }
} | ConvertTo-Json

# Apply the updated secret to Kubernetes
$k8sSecret | kubectl apply -f -

Write-Host "AWS ECR token refreshed and Kubernetes secret updated successfully."
