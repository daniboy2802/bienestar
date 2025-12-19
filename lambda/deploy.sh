#!/bin/bash

# Script para desplegar la función Lambda
# Uso: ./deploy.sh

set -e

echo "🚀 Iniciando despliegue de Lambda..."

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar que estamos en el directorio correcto
if [ ! -f "lambda_function.py" ]; then
    echo "❌ Error: No se encontró lambda_function.py"
    echo "Por favor ejecuta este script desde el directorio lambda/contact-form-handler/"
    exit 1
fi

# Verificar que AWS CLI está instalado
if ! command -v aws &> /dev/null; then
    echo "❌ Error: AWS CLI no está instalado"
    echo "Instala AWS CLI: https://aws.amazon.com/cli/"
    exit 1
fi

# Verificar que las variables de entorno están configuradas
if [ -z "$PHONE_NUMBER_1" ] || [ -z "$PHONE_NUMBER_2" ] || [ -z "$PHONE_NUMBER_3" ]; then
    echo "⚠️  Advertencia: Variables de entorno PHONE_NUMBER_* no configuradas"
    echo "Configúralas antes de continuar:"
    echo "  export PHONE_NUMBER_1='+5215512345678'"
    echo "  export PHONE_NUMBER_2='+5215512345679'"
    echo "  export PHONE_NUMBER_3='+5215512345680'"
    read -p "¿Deseas continuar de todas formas? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Nombre de la función Lambda
FUNCTION_NAME="contact-form-handler"

# Crear el paquete
echo "📦 Creando paquete de despliegue..."
zip -q function.zip lambda_function.py

# Verificar si la función ya existe
if aws lambda get-function --function-name $FUNCTION_NAME &> /dev/null; then
    echo "🔄 Actualizando función Lambda existente..."
    aws lambda update-function-code \
        --function-name $FUNCTION_NAME \
        --zip-file fileb://function.zip
    
    # Actualizar variables de entorno si están configuradas
    if [ ! -z "$PHONE_NUMBER_1" ] && [ ! -z "$PHONE_NUMBER_2" ] && [ ! -z "$PHONE_NUMBER_3" ]; then
        echo "🔧 Actualizando variables de entorno..."
        aws lambda update-function-configuration \
            --function-name $FUNCTION_NAME \
            --environment "Variables={PHONE_NUMBER_1=$PHONE_NUMBER_1,PHONE_NUMBER_2=$PHONE_NUMBER_2,PHONE_NUMBER_3=$PHONE_NUMBER_3}"
    fi
else
    echo "⚠️  La función Lambda no existe. Creándola..."
    echo "Por favor, crea la función primero usando AWS Console o Terraform"
    echo "O ejecuta:"
    echo "  aws lambda create-function \\"
    echo "    --function-name $FUNCTION_NAME \\"
    echo "    --runtime python3.11 \\"
    echo "    --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-execution-role \\"
    echo "    --handler lambda_function.lambda_handler \\"
    echo "    --zip-file fileb://function.zip"
    exit 1
fi

# Limpiar
rm -f function.zip

echo -e "${GREEN}✅ Despliegue completado exitosamente!${NC}"
echo ""
echo "Próximos pasos:"
echo "1. Configura API Gateway para exponer esta Lambda"
echo "2. Actualiza REACT_APP_LAMBDA_ENDPOINT en el frontend"
echo "3. Prueba el formulario de contacto"
