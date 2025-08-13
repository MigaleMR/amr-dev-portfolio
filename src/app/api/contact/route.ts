import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, subject, message } = await request.json();

    // Validación básica
    if (!fullName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Verificar variables de entorno
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('Variables de entorno EMAIL_USER o EMAIL_PASSWORD no configuradas');
      return NextResponse.json(
        { error: 'Configuración de email no disponible' },
        { status: 500 }
      );
    }

    // Configuración del transportador de correo
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Verificar la conexión antes de enviar
    try {
      await transporter.verify();
    } catch (error) {
      console.error('Error de autenticación de Gmail:', error);
      return NextResponse.json(
        { error: 'Error de configuración de email. Verifica las credenciales.' },
        { status: 500 }
      );
    }

    // Opciones del correo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'alejandromr0812@gmail.com',
      subject: `Nuevo mensaje de contacto: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">
            Nuevo Mensaje de Contacto
          </h2>
          
          <div style="background-color: #f4f4f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nombre:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Asunto:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #3f3f46; margin-top: 0;">Mensaje:</h3>
            <p style="line-height: 1.6; color: #3f3f46;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #6366f1; color: white; border-radius: 8px; text-align: center;">
            <p style="margin: 0; font-size: 14px;">Este mensaje fue enviado desde tu portafolio web</p>
          </div>
        </div>
      `,
      replyTo: email,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Mensaje enviado exitosamente' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error enviando email:', error);
    
    // Mensaje más específico basado en el tipo de error
    let errorMessage = 'Error interno del servidor';
    if (error instanceof Error) {
      if (error.message.includes('authentication')) {
        errorMessage = 'Error de autenticación. Verifica la configuración de Gmail.';
      } else if (error.message.includes('network') || error.message.includes('ENOTFOUND')) {
        errorMessage = 'Error de conexión. Verifica tu conexión a internet.';
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
