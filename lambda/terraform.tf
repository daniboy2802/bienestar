# Terraform configuration para desplegar la Lambda y API Gateway

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1" # Cambiar según tu región preferida
}

# Rol IAM para la Lambda
resource "aws_iam_role" "lambda_role" {
  name = "contact-form-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# Política para permitir SNS y logs
resource "aws_iam_role_policy" "lambda_policy" {
  name = "contact-form-lambda-policy"
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "sns:Publish",
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "*"
      }
    ]
  })
}

# Función Lambda
resource "aws_lambda_function" "contact_form_handler" {
  filename         = "function.zip"
  function_name    = "contact-form-handler"
  role            = aws_iam_role.lambda_role.arn
  handler         = "lambda_function.lambda_handler"
  source_code_hash = filebase64sha256("function.zip")
  runtime         = "python3.11"
  timeout         = 30

  environment {
    variables = {
      PHONE_NUMBER_1 = var.phone_number_1
      PHONE_NUMBER_2 = var.phone_number_2
      PHONE_NUMBER_3 = var.phone_number_3
    }
  }
}

# API Gateway REST API
resource "aws_api_gateway_rest_api" "contact_api" {
  name        = "contact-form-api"
  description = "API para recibir formularios de contacto"
}

# Recurso para /contact
resource "aws_api_gateway_resource" "contact_resource" {
  rest_api_id = aws_api_gateway_rest_api.contact_api.id
  parent_id   = aws_api_gateway_rest_api.contact_api.root_resource_id
  path_part   = "contact"
}

# Método POST
resource "aws_api_gateway_method" "contact_post" {
  rest_api_id   = aws_api_gateway_rest_api.contact_api.id
  resource_id   = aws_api_gateway_resource.contact_resource.id
  http_method   = "POST"
  authorization = "NONE"
}

# Método OPTIONS para CORS
resource "aws_api_gateway_method" "contact_options" {
  rest_api_id   = aws_api_gateway_rest_api.contact_api.id
  resource_id   = aws_api_gateway_resource.contact_resource.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

# Integración Lambda para POST
resource "aws_api_gateway_integration" "contact_integration" {
  rest_api_id = aws_api_gateway_rest_api.contact_api.id
  resource_id = aws_api_gateway_resource.contact_resource.id
  http_method = aws_api_gateway_method.contact_post.http_method

  integration_http_method = "POST"
  type                   = "AWS_PROXY"
  uri                    = aws_lambda_function.contact_form_handler.invoke_arn
}

# Integración mock para OPTIONS (CORS)
resource "aws_api_gateway_integration" "contact_options_integration" {
  rest_api_id = aws_api_gateway_rest_api.contact_api.id
  resource_id = aws_api_gateway_resource.contact_resource.id
  http_method = aws_api_gateway_method.contact_options.http_method

  type = "MOCK"
  request_templates = {
    "application/json" = "{\"statusCode\": 200}"
  }
}

# Respuesta para OPTIONS
resource "aws_api_gateway_method_response" "contact_options_response" {
  rest_api_id = aws_api_gateway_rest_api.contact_api.id
  resource_id = aws_api_gateway_resource.contact_resource.id
  http_method = aws_api_gateway_method.contact_options.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

resource "aws_api_gateway_integration_response" "contact_options_integration_response" {
  rest_api_id = aws_api_gateway_rest_api.contact_api.id
  resource_id = aws_api_gateway_resource.contact_resource.id
  http_method = aws_api_gateway_method.contact_options.http_method
  status_code = aws_api_gateway_method_response.contact_options_response.status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'POST,OPTIONS'"
    "method.response.header.Access-Control-Allow-Origin"    = "'*'"
  }
}

# Permiso para que API Gateway invoque Lambda
resource "aws_lambda_permission" "api_gateway_invoke" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact_form_handler.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.contact_api.execution_arn}/*/*"
}

# Deployment
resource "aws_api_gateway_deployment" "contact_deployment" {
  depends_on = [
    aws_api_gateway_integration.contact_integration,
    aws_api_gateway_integration.contact_options_integration,
  ]

  rest_api_id = aws_api_gateway_rest_api.contact_api.id
  stage_name  = "prod"
}

# Variables
variable "phone_number_1" {
  description = "Primer número de teléfono para notificaciones"
  type        = string
  default     = "+5215512345678"
}

variable "phone_number_2" {
  description = "Segundo número de teléfono para notificaciones"
  type        = string
  default     = "+5215512345679"
}

variable "phone_number_3" {
  description = "Tercer número de teléfono para notificaciones"
  type        = string
  default     = "+5215512345680"
}

# Outputs
output "api_gateway_url" {
  description = "URL del API Gateway"
  value       = "${aws_api_gateway_deployment.contact_deployment.invoke_url}/contact"
}

output "lambda_function_name" {
  description = "Nombre de la función Lambda"
  value       = aws_lambda_function.contact_form_handler.function_name
}
