import nodemailer from 'nodemailer';

// SMTP Configuration for DumoExpress
const SMTP_CONFIG = {
  host: 'mail.dumoexpress.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'info@dumoexpress.com',
    pass: 's#009V72(Byn]{p[',
  },
};

// Create reusable transporter
const transporter = nodemailer.createTransport(SMTP_CONFIG);

// Verify connection configuration
transporter.verify(function (error: Error | null, success: boolean) {
  if (error) {
    console.error('[Email] SMTP connection error:', error);
  } else {
    console.log('[Email] SMTP server is ready to send emails');
  }
});

export interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

/**
 * Send email via SMTP
 * @param options Email options (to, subject, text, html)
 * @returns Promise<boolean> - true if sent successfully, false otherwise
 */
export async function sendEmail(options: SendEmailOptions): Promise<boolean> {
  try {
    const mailOptions = {
      from: '"DumoExpress" <info@dumoexpress.com>',
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html || options.text.replace(/\n/g, '<br>'),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('[Email] Message sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('[Email] Failed to send email:', error);
    return false;
  }
}

/**
 * Send booking confirmation email to info@dumoexpress.com
 */
export async function sendBookingNotification(data: {
  bookingRef: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceType: string;
  packageWeight: string;
  pickupAddress: string;
  deliveryAddress: string;
  scheduledDate?: string;
  specialInstructions?: string;
}): Promise<boolean> {
  const subject = `New Booking Request - ${data.bookingRef}`;
  
  const text = `
New Booking Request - ${data.bookingRef}

Customer Information:
Name: ${data.customerName}
Email: ${data.customerEmail}
Phone: ${data.customerPhone}

Shipment Details:
Service Type: ${data.serviceType.toUpperCase()}
Package Weight: ${data.packageWeight}
Pickup Address: ${data.pickupAddress}
Delivery Address: ${data.deliveryAddress}
${data.scheduledDate ? `Scheduled Date: ${data.scheduledDate}` : ''}
${data.specialInstructions ? `Special Instructions: ${data.specialInstructions}` : ''}

Booking Reference: ${data.bookingRef}
Submitted: ${new Date().toLocaleString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' })}
  `.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0066cc;">New Booking Request - ${data.bookingRef}</h2>
      
      <h3 style="color: #333;">Customer Information</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.customerName}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.customerEmail}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.customerPhone}</td></tr>
      </table>
      
      <h3 style="color: #333; margin-top: 20px;">Shipment Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Service Type:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.serviceType.toUpperCase()}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Package Weight:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.packageWeight}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Pickup Address:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.pickupAddress}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Delivery Address:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.deliveryAddress}</td></tr>
        ${data.scheduledDate ? `<tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Scheduled Date:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.scheduledDate}</td></tr>` : ''}
        ${data.specialInstructions ? `<tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Special Instructions:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.specialInstructions}</td></tr>` : ''}
      </table>
      
      <p style="margin-top: 20px; padding: 15px; background-color: #f0f8ff; border-left: 4px solid #0066cc;">
        <strong>Booking Reference:</strong> ${data.bookingRef}<br>
        <strong>Submitted:</strong> ${new Date().toLocaleString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' })}
      </p>
    </div>
  `;

  return await sendEmail({
    to: 'info@dumoexpress.com',
    subject,
    text,
    html,
  });
}

/**
 * Send contact inquiry email to info@dumoexpress.com
 */
export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<boolean> {
  const emailSubject = `Contact Inquiry: ${data.subject}`;
  
  const text = `
New Contact Inquiry

From: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}
Subject: ${data.subject}

Message:
${data.message}

Submitted: ${new Date().toLocaleString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' })}
  `.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0066cc;">New Contact Inquiry</h2>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>From:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.name}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.email}</td></tr>
        ${data.phone ? `<tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.phone}</td></tr>` : ''}
        <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Subject:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.subject}</td></tr>
      </table>
      
      <div style="padding: 15px; background-color: #f9f9f9; border-radius: 5px; margin-bottom: 20px;">
        <h3 style="color: #333; margin-top: 0;">Message:</h3>
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>
      
      <p style="color: #666; font-size: 12px;">
        Submitted: ${new Date().toLocaleString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' })}
      </p>
    </div>
  `;

  return await sendEmail({
    to: 'info@dumoexpress.com',
    subject: emailSubject,
    text,
    html,
  });
}
