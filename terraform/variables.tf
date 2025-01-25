variable "aws_region" {
  description = "The AWS region to deploy the infrastructure."
  default     = "ap-south-1"
}

variable "key_name" {
  description = "The name of the AWS key pair to use."
  default     = "Minal" # Replace with your actual key name
}
