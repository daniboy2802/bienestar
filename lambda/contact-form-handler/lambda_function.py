import json
import boto3
import os
import logging
import traceback
from datetime import datetime

# Configurar logging con nivel DEBUG para capturar toda la información
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

# Inicializar cliente de SNS
sns_client = boto3.client('sns')

# Números de teléfono de destino (configurados como variables de entorno)
PHONE_NUMBERS = [
    os.environ.get('PHONE_NUMBER_1', '+529513099928'),
]

def lambda_handler(event, context):
    """
    Función Lambda que recibe datos del formulario de contacto
    y envía SMS de notificación a números configurados.
    """
    
    # Log inicial del evento recibido
    logger.info("=" * 80)
    logger.info("INICIO DE PROCESAMIENTO DE FORMULARIO")
    logger.info("=" * 80)
    logger.debug(f"Event completo recibido: {json.dumps(event, default=str, indent=2)}")
    logger.debug(f"Context: {context}")
    
    try:
        # Parsear el body del request
        logger.info("Parseando body del request...")
        if isinstance(event.get('body'), str):
            try:
                body = json.loads(event['body'])
                logger.debug(f"Body parseado exitosamente: {json.dumps(body, indent=2)}")
            except json.JSONDecodeError as e:
                logger.error(f"Error al parsear JSON del body: {str(e)}")
                logger.error(f"Body recibido (raw): {event.get('body')}")
                raise ValueError(f"Body JSON inválido: {str(e)}")
        else:
            body = event.get('body', {})
            logger.debug(f"Body ya es un objeto: {json.dumps(body, default=str, indent=2)}")
        
        # Extraer datos del formulario
        logger.info("Extrayendo datos del formulario...")
        nombre = body.get('nombre', 'N/A')
        apellido = body.get('apellido', 'N/A')
        email = body.get('email', 'N/A')
        empresa = body.get('empresa', 'N/A')
        giro = body.get('giro', 'N/A')
        numero_empleados = body.get('numero_empleados', 'N/A')
        mensaje = body.get('mensaje', 'N/A')
        
        logger.info(f"Datos extraídos - Nombre: {nombre}, Email: {email}, Empresa: {empresa}")
        
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

        logger.info(f"Mensaje SMS creado. Longitud: {len(sms_message)} caracteres")
        logger.debug(f"Contenido del mensaje SMS:\n{sms_message}")
        
        # Verificar números de teléfono configurados
        logger.info(f"Números de teléfono configurados: {PHONE_NUMBERS}")
        if not PHONE_NUMBERS or all(not num for num in PHONE_NUMBERS):
            logger.error("ERROR: No hay números de teléfono configurados")
            raise ValueError("No hay números de teléfono configurados en las variables de entorno")

        # Enviar SMS a los números configurados
        results = []
        for i, phone_number in enumerate(PHONE_NUMBERS, 1):
            if not phone_number:
                logger.warning(f"Número {i} está vacío, saltando...")
                continue
                
            logger.info(f"Intentando enviar SMS {i}/{len(PHONE_NUMBERS)} a: {phone_number}")
            try:
                # Log de la configuración antes de enviar
                logger.debug(f"Configuración SNS - PhoneNumber: {phone_number}")
                logger.debug(f"Configuración SNS - Message length: {len(sms_message)}")
                
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
                
                # Log detallado de la respuesta de SNS
                logger.info(f"Respuesta completa de SNS para {phone_number}: {json.dumps(response, default=str, indent=2)}")
                
                message_id = response.get('MessageId')
                http_status = response.get('ResponseMetadata', {}).get('HTTPStatusCode')
                
                logger.info(f"SMS enviado exitosamente a {phone_number}")
                logger.info(f"  - MessageId: {message_id}")
                logger.info(f"  - HTTP Status Code: {http_status}")
                
                results.append({
                    'phone_number': phone_number,
                    'status': 'success',
                    'message_id': message_id,
                    'http_status': http_status
                })
                
            except sns_client.exceptions.InvalidParameterException as e:
                error_msg = f"Parámetro inválido al enviar SMS a {phone_number}"
                logger.error(f"ERROR: {error_msg}")
                logger.error(f"Excepción completa: {str(e)}")
                logger.error(f"Tipo de excepción: {type(e).__name__}")
                logger.error(f"Traceback completo:\n{traceback.format_exc()}")
                results.append({
                    'phone_number': phone_number,
                    'status': 'error',
                    'error': str(e),
                    'error_type': 'InvalidParameterException'
                })
                
            except sns_client.exceptions.AuthorizationErrorException as e:
                error_msg = f"Error de autorización al enviar SMS a {phone_number}"
                logger.error(f"ERROR: {error_msg}")
                logger.error(f"Excepción completa: {str(e)}")
                logger.error(f"Tipo de excepción: {type(e).__name__}")
                logger.error(f"Traceback completo:\n{traceback.format_exc()}")
                results.append({
                    'phone_number': phone_number,
                    'status': 'error',
                    'error': str(e),
                    'error_type': 'AuthorizationErrorException'
                })
                
            except sns_client.exceptions.InternalErrorException as e:
                error_msg = f"Error interno de AWS al enviar SMS a {phone_number}"
                logger.error(f"ERROR: {error_msg}")
                logger.error(f"Excepción completa: {str(e)}")
                logger.error(f"Tipo de excepción: {type(e).__name__}")
                logger.error(f"Traceback completo:\n{traceback.format_exc()}")
                results.append({
                    'phone_number': phone_number,
                    'status': 'error',
                    'error': str(e),
                    'error_type': 'InternalErrorException'
                })
                
            except Exception as e:
                error_msg = f"Error inesperado al enviar SMS a {phone_number}"
                logger.error(f"ERROR: {error_msg}")
                logger.error(f"Excepción completa: {str(e)}")
                logger.error(f"Tipo de excepción: {type(e).__name__}")
                logger.error(f"Traceback completo:\n{traceback.format_exc()}")
                logger.error(f"Argumentos de la excepción: {e.args}")
                results.append({
                    'phone_number': phone_number,
                    'status': 'error',
                    'error': str(e),
                    'error_type': type(e).__name__
                })
        
        # Verificar si al menos un SMS se envió exitosamente
        success_count = sum(1 for r in results if r.get('status') == 'success')
        error_count = sum(1 for r in results if r.get('status') == 'error')
        
        logger.info(f"Resumen de envíos - Exitosos: {success_count}, Errores: {error_count}")
        logger.info(f"Resultados detallados: {json.dumps(results, indent=2)}")
        
        # Respuesta exitosa
        response_body = {
            'message': 'Formulario recibido y notificaciones enviadas',
            'results': results,
            'summary': {
                'total': len(results),
                'success': success_count,
                'errors': error_count
            }
        }
        
        logger.info("=" * 80)
        logger.info("FIN DE PROCESAMIENTO - ÉXITO")
        logger.info("=" * 80)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            'body': json.dumps(response_body, ensure_ascii=False)
        }
    
    except json.JSONDecodeError as e:
        error_msg = f"Error al parsear JSON: {str(e)}"
        logger.error("=" * 80)
        logger.error("ERROR EN PROCESAMIENTO - JSON INVÁLIDO")
        logger.error("=" * 80)
        logger.error(error_msg)
        logger.error(f"Traceback completo:\n{traceback.format_exc()}")
        logger.error(f"Body recibido: {event.get('body')}")
        
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            'body': json.dumps({
                'error': 'Error al procesar el formulario',
                'message': error_msg,
                'error_type': 'JSONDecodeError'
            }, ensure_ascii=False)
        }
        
    except Exception as e:
        error_msg = f"Error inesperado: {str(e)}"
        logger.error("=" * 80)
        logger.error("ERROR EN PROCESAMIENTO - EXCEPCIÓN GENERAL")
        logger.error("=" * 80)
        logger.error(error_msg)
        logger.error(f"Tipo de excepción: {type(e).__name__}")
        logger.error(f"Traceback completo:\n{traceback.format_exc()}")
        logger.error(f"Argumentos de la excepción: {e.args}")
        logger.error(f"Event que causó el error: {json.dumps(event, default=str, indent=2)}")
        
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
                'message': error_msg,
                'error_type': type(e).__name__
            }, ensure_ascii=False)
        }
