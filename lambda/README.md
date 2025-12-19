# Lambda Function - Contact Form Handler

Esta función Lambda recibe los datos del formulario de contacto y envía notificaciones SMS a 3 números configurados usando AWS SNS.

## Estructura

```
lambda/
├── contact-form-handler/
│   ├── lambda_function.py    # Código de la función Lambda
│   ├── requirements.txt       # Dependencias Python
│   └── README.md              # Documentación detallada
├── terraform.tf               # Configuración de infraestructura
└── README.md                  # Este archivo
```

## Características

- ✅ Recibe datos del formulario de contacto
- ✅ Envía SMS a 3 números configurados simultáneamente
- ✅ Template de mensaje personalizado con toda la información
- ✅ Manejo de errores robusto
- ✅ CORS configurado para permitir requests desde el frontend
- ✅ Logs en CloudWatch para debugging

## Configuración Rápida

### 1. Configurar Variables de Entorno

En AWS Lambda Console, configura estas variables de entorno:

- `PHONE_NUMBER_1`: +5215512345678 (reemplazar con número real)
- `PHONE_NUMBER_2`: +5215512345679 (reemplazar con número real)
- `PHONE_NUMBER_3`: +5215512345680 (reemplazar con número real)

### 2. Desplegar la Lambda

#### Opción A: Usando AWS Console

1. Ve a [AWS Lambda Console](https://console.aws.amazon.com/lambda/)
2. Crea una nueva función
3. Selecciona "Author from scratch"
4. Runtime: Python 3.11
5. Sube el archivo `lambda_function.py`
6. Configura las variables de entorno
7. Asigna un rol IAM con permisos para SNS

#### Opción B: Usando AWS CLI

```bash
cd lambda/contact-form-handler

# Crear el paquete
zip function.zip lambda_function.py

# Crear la función (reemplazar YOUR_ACCOUNT_ID y números de teléfono)
aws lambda create-function \
    --function-name contact-form-handler \
    --runtime python3.11 \
    --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-execution-role \
    --handler lambda_function.lambda_handler \
    --zip-file fileb://function.zip \
    --timeout 30 \
    --environment Variables="{PHONE_NUMBER_1=+5215512345678,PHONE_NUMBER_2=+5215512345679,PHONE_NUMBER_3=+5215512345680}"
```

#### Opción C: Usando Terraform

```bash
cd lambda

# Configurar variables en terraform.tfvars
cat > terraform.tfvars << EOF
phone_number_1 = "+5215512345678"
phone_number_2 = "+5215512345679"
phone_number_3 = "+5215512345680"
EOF

# Inicializar y desplegar
terraform init
terraform plan
terraform apply
```

### 3. Configurar API Gateway

La Lambda necesita ser expuesta a través de API Gateway:

1. Crea un REST API en API Gateway
2. Crea un recurso `/contact`
3. Crea un método POST
4. Integra con la función Lambda
5. Habilita CORS
6. Despliega en un stage (ej: `prod`)
7. Copia la URL del endpoint

### 4. Configurar el Frontend

En el archivo `.env` del proyecto React, agrega:

```env
REACT_APP_LAMBDA_ENDPOINT=https://your-api-id.execute-api.us-east-1.amazonaws.com/prod/contact
```

O actualiza directamente en `src/pages/Contacto.jsx` la constante `LAMBDA_ENDPOINT`.

## Permisos IAM Requeridos

El rol de la Lambda necesita estos permisos:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "sns:Publish",
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "*"
        }
    ]
}
```

## Formato del Mensaje SMS

El template del SMS incluye:

```
NUEVO CONTACTO - Bienestar PAE

📋 Información del contacto:
• Nombre: [nombre] [apellido]
• Email: [email]
• Empresa: [empresa]
• Giro: [giro]
• Empleados: [numero_empleados]

💬 Mensaje:
[mensaje]

⏰ Fecha: [timestamp]

Responde pronto para no perder esta oportunidad.
```

## Testing

### Test Local (usando AWS SAM o localstack)

```bash
# Instalar dependencias
pip install -r requirements.txt

# Test con evento de ejemplo
python -c "
import json
from lambda_function import lambda_handler

event = {
    'body': json.dumps({
        'nombre': 'Juan',
        'apellido': 'Pérez',
        'email': 'juan@example.com',
        'empresa': 'Test Corp',
        'giro': 'Tecnología',
        'numero_empleados': '50-100',
        'mensaje': 'Mensaje de prueba'
    })
}

result = lambda_handler(event, None)
print(json.dumps(result, indent=2))
"
```

### Test con cURL

```bash
curl -X POST https://your-api-gateway-url.execute-api.us-east-1.amazonaws.com/prod/contact \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan@example.com",
    "empresa": "Test Corp",
    "giro": "Tecnología",
    "numero_empleados": "50-100",
    "mensaje": "Mensaje de prueba"
  }'
```

## Costos Estimados

- **Lambda**: Primeros 1M de requests gratuitos/mes, luego $0.20 por 1M requests
- **SNS SMS**: ~$0.00645 por SMS en México (precios pueden variar por región)
- **API Gateway**: Primeros 1M de requests gratuitos/mes, luego $3.50 por 1M requests

**Ejemplo**: 100 formularios/mes = ~$1.94/mes (solo SMS)

## Troubleshooting

### La Lambda no recibe los datos

- Verifica que API Gateway esté configurado correctamente
- Revisa los logs en CloudWatch
- Asegúrate de que el Content-Type sea `application/json`

### Los SMS no se envían

- Verifica que los números estén en formato internacional (+52...)
- Revisa que el rol IAM tenga permisos para SNS
- Verifica que SNS tenga crédito disponible en tu cuenta AWS
- Revisa los logs de CloudWatch para errores específicos

### Error de CORS

- Asegúrate de que API Gateway tenga CORS habilitado
- Verifica que los headers en la respuesta Lambda incluyan CORS
- Revisa la configuración de CORS en API Gateway

## Seguridad

- ✅ Los números de teléfono están en variables de entorno (no hardcodeados)
- ✅ Validación de datos en el frontend
- ⚠️ Considera agregar rate limiting en API Gateway
- ⚠️ Considera agregar autenticación si es necesario
- ⚠️ Considera validar el origen de las requests

## Próximos Pasos

- [ ] Agregar validación de email más robusta
- [ ] Implementar rate limiting
- [ ] Agregar almacenamiento en DynamoDB de los contactos
- [ ] Enviar email de confirmación al contacto
- [ ] Dashboard para ver estadísticas de contactos
