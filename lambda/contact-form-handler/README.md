# Lambda Function - Contact Form Handler

Esta función Lambda recibe los datos del formulario de contacto y envía notificaciones SMS a 3 números configurados.

## Configuración

### Variables de Entorno

Configura las siguientes variables de entorno en AWS Lambda:

- `PHONE_NUMBER_1`: Primer número de teléfono (formato: +5215512345678)
- `PHONE_NUMBER_2`: Segundo número de teléfono
- `PHONE_NUMBER_3`: Tercer número de teléfono

### Permisos IAM Requeridos

La función Lambda necesita los siguientes permisos:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "sns:Publish"
            ],
            "Resource": "*"
        }
    ]
}
```

## Despliegue

### Opción 1: Usando AWS CLI

```bash
# Crear el paquete de despliegue
cd lambda/contact-form-handler
zip -r function.zip lambda_function.py

# Crear la función Lambda
aws lambda create-function \
    --function-name contact-form-handler \
    --runtime python3.11 \
    --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-sns-role \
    --handler lambda_function.lambda_handler \
    --zip-file fileb://function.zip \
    --environment Variables="{PHONE_NUMBER_1=+5215512345678,PHONE_NUMBER_2=+5215512345679,PHONE_NUMBER_3=+5215512345680}"

# Actualizar la función
aws lambda update-function-code \
    --function-name contact-form-handler \
    --zip-file fileb://function.zip
```

### Opción 2: Usando AWS Console

1. Ve a AWS Lambda Console
2. Crea una nueva función
3. Selecciona "Author from scratch"
4. Runtime: Python 3.11
5. Sube el archivo `lambda_function.py`
6. Configura las variables de entorno en "Configuration" > "Environment variables"
7. Asigna un rol IAM con permisos para SNS

### Opción 3: Usando Terraform

Ver archivo `terraform.tf` en la carpeta raíz del proyecto.

## Configuración de API Gateway

Para exponer la Lambda como endpoint HTTP:

1. Crea un API Gateway REST API
2. Crea un recurso POST en `/contact`
3. Integra con la función Lambda
4. Habilita CORS si es necesario
5. Obtén la URL del endpoint

## Formato del Request

```json
{
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan@example.com",
    "empresa": "Empresa XYZ",
    "giro": "Tecnología",
    "numero_empleados": "50-100",
    "mensaje": "Mensaje del contacto"
}
```

## Formato del Response

```json
{
    "message": "Formulario recibido y notificaciones enviadas",
    "results": [
        {
            "phone_number": "+5215512345678",
            "status": "success",
            "message_id": "abc123..."
        }
    ]
}
```

## Costos

- AWS Lambda: Primeros 1M de requests gratuitos por mes
- AWS SNS: ~$0.00645 por SMS en México (precios pueden variar)

## Troubleshooting

- Verifica que los números de teléfono estén en formato internacional (+52...)
- Asegúrate de que el rol IAM tenga permisos para SNS
- Revisa los logs de CloudWatch para errores específicos
- Verifica que SNS tenga crédito disponible en tu cuenta AWS
