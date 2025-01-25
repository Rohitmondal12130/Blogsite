output "app_url" {
  value = "http://${aws_instance.blog_app_instance.public_ip}:3000/home"
}

