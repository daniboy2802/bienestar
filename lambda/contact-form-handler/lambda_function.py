import json
import boto3
import os
from datetime import datetime

# Inicializar cliente de SNS
sns_client = boto3.client('sns')

# Números de teléfono de destino (configurados como variables de entorno)
PHONE_NUMBERS = [
    os.environ.get('PHONE_NUMBER_1', '+5215512345678'),  # Reemplazar con números reales
    os.environ.get('PHONE_NUMBER_2', '+5215512345679'),
    os.environ.get('PHONE_NUMBER_3', '+5215512345680'),
]

def lambda_handler(event, context):
    """
    Función Lambda que recibe datos del formulario de contacto
    y envía SMS de notificación a 3 números configurados.
    """
    
    try:
        # Parsear el body del request
        if isinstance(event.get('body'), str):
            body = json.loads(event['body'])
        else:
            body = event.get('body', {})
        
        # Extraer datos del formulario
        nombre = body.get('nombre', 'N/A')
        apellido = body.get('apellido', 'N/A')
        email = body.get('email', 'N/A')
        empresa = body.get('empresa', 'N/A')
        giro = body.get('giro', 'N/A')
        numero_empleados = body.get('numero_empleados', 'N/A')
        mensaje = body.get('mensaje', 'N/A')
        
        # Obtener timestamp
        timestamp = datetime.now().strftime('%d/%m/%Y %H:%M:%S')
        
        # Crear template del mensaje SMS
        sms_message = f"""NUEVO CONTACTO - Bienestar PAE

📋 Información del contacto:
• Nombre: {nombre} {apellido}
• Email: {email}
• Empresa: {empresa}
• Giro: {giro}
• Empleados: {numero_empleados}

💬 Mensaje:
{mensaje}

⏰ Fecha: {timestamp}

Responde pronto para no perder esta oportunidad."""

        # Enviar SMS a los 3 números configurados
        results = []
        for i, phone_number in enumerate(PHONE_NUMBERS, 1):
            try:
                response = sns_client.publish(
                    PhoneNumber=phone_number,
                    Message=sms_message,
                    MessageAttributes={
                        'AWS.SNS.SMS.SMSType': {
                            'DataType': 'String',
                            'StringValue': 'Transactional'
                        }
                    }
                )
                results.append({
                    'phone_number': phone_number,
                    'status': 'success',
                    'message_id': response.get('MessageId')
                })
                print(f"SMS enviado exitosamente a {phone_number}")
            except Exception as e:
                results.append({
                    'phone_number': phone_number,
                    'status': 'error',
                    'error': str(e)
                })
                print(f"Error al enviar SMS a {phone_number}: {str(e)}")
        
        # Respuesta exitosa
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',  # Ajustar según tu dominio
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            'body': json.dumps({
                'message': 'Formulario recibido y notificaciones enviadas',
                'results': results
            }, ensure_ascii=False)
        }
    
    except Exception as e:
        # Manejo de errores
        print(f"Error en lambda_handler: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            'body': json.dumps({
                'error': 'Error al procesar el formulario',
                'message': str(e)
            }, ensure_ascii=False)
        }
