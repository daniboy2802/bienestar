#!/bin/bash

# Script completo para desplegar Lambda + API Gateway usando Terraform
# Uso: ./deploy.sh [--apply]

set -e

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar que estamos en el directorio correcto
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

if [ ! -f "terraform.tf" ]; then
    echo -e "${RED}❌ Error: No se encontró terraform.tf${NC}"
    echo "Por favor ejecuta este script desde el directorio lambda/"
    exit 1
fi

# Verificar que Terraform está instalado
if ! command -v terraform &> /dev/null; then
    echo -e "${RED}❌ Error: Terraform no está instalado${NC}"
    echo "Instala Terraform: https://www.terraform.io/downloads"
    exit 1
fi

# Verificar que AWS CLI está instalado
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ Error: AWS CLI no está instalado${NC}"
    echo "Instala AWS CLI: https://aws.amazon.com/cli/"
    exit 1
fi

# Verificar credenciales de AWS
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ Error: No se pudieron verificar las credenciales de AWS${NC}"
    echo "Configura tus credenciales con: aws configure"
    exit 1
fi

echo -e "${BLUE}🚀 Iniciando despliegue de Lambda + API Gateway...${NC}"
echo ""

# Paso 1: Crear el paquete de la Lambda
echo -e "${YELLOW}📦 Paso 1: Creando paquete de la función Lambda...${NC}"
cd contact-form-handler

# Crear directorio temporal para el paquete
PACKAGE_DIR=$(mktemp -d)
trap "rm -rf $PACKAGE_DIR" EXIT

# Copiar el código de la función
cp lambda_function.py "$PACKAGE_DIR/"

# Instalar dependencias si requirements.txt existe
if [ -f "requirements.txt" ]; then
    echo "   Instalando dependencias..."
    pip install -q -r requirements.txt -t "$PACKAGE_DIR" 2>/dev/null || {
        echo -e "${YELLOW}   ⚠️  Advertencia: No se pudieron instalar dependencias con pip${NC}"
        echo "   Asegúrate de tener boto3 disponible en el runtime de Lambda"
    }
fi

# Crear el zip
cd "$PACKAGE_DIR"
zip -q -r "$SCRIPT_DIR/function.zip" .
cd "$SCRIPT_DIR"

echo -e "${GREEN}   ✅ Paquete creado: function.zip${NC}"
echo ""

# Paso 2: Inicializar Terraform
echo -e "${YELLOW}🔧 Paso 2: Inicializando Terraform...${NC}"
terraform init -upgrade
echo ""

# Paso 3: Validar configuración
echo -e "${YELLOW}✔️  Paso 3: Validando configuración de Terraform...${NC}"
terraform validate
echo ""

# Paso 4: Plan de despliegue
echo -e "${YELLOW}📋 Paso 4: Generando plan de despliegue...${NC}"
terraform plan -out=tfplan

# Verificar si se debe aplicar automáticamente
if [[ "$1" == "--apply" ]]; then
    echo ""
    echo -e "${YELLOW}🚀 Aplicando cambios...${NC}"
    terraform apply tfplan
    rm -f tfplan
    
    echo ""
    echo -e "${GREEN}✅ Despliegue completado exitosamente!${NC}"
    echo ""
    echo -e "${BLUE}📡 Endpoint URL:${NC}"
    terraform output -raw api_gateway_url
    echo ""
    echo -e "${BLUE}📝 Nombre de la función Lambda:${NC}"
    terraform output -raw lambda_function_name
    echo ""
    echo -e "${GREEN}🎉 ¡Listo! Puedes usar el endpoint URL en tu frontend.${NC}"
else
    echo ""
    echo -e "${YELLOW}⚠️  Para aplicar los cambios, ejecuta:${NC}"
    echo "   terraform apply tfplan"
    echo ""
    echo "O ejecuta este script con --apply:"
    echo "   ./deploy.sh --apply"
fi
