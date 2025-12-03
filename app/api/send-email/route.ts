import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Helper function to escape HTML to prevent XSS
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Escape user input to prevent XSS
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    // Email content with escaped HTML
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FAF8F3;">
        <h2 style="color: #3D2817; border-bottom: 2px solid #5C4033; padding-bottom: 10px;">New Contact Form Inquiry</h2>
        <div style="margin-top: 20px;">
          <p style="color: #3D2817; margin: 10px 0;"><strong>Name:</strong> ${safeName}</p>
          <p style="color: #3D2817; margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #5C4033;">${safeEmail}</a></p>
          <p style="color: #3D2817; margin: 10px 0;"><strong>Message:</strong></p>
          <div style="background: #E8E0D0; padding: 15px; border-radius: 5px; border-left: 4px solid #5C4033; margin-top: 10px; white-space: pre-wrap; color: #2F1B12;">${safeMessage}</div>
        </div>
      </div>
    `;

    const emailText = `New Contact Form Inquiry\n\nName: ${safeName}\nEmail: ${safeEmail}\n\nMessage:\n${safeMessage}`;

    // Check if Resend API key is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact the administrator.' },
        { status: 500 }
      );
    }

    // Initialize Resend
    const resend = new Resend(resendApiKey);
    
    // Get the from email (must be a verified domain in Resend)
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    
    // Send email to support@mitrabisnis.net
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: 'support@mitrabisnis.net',
      replyTo: email,
      subject: `New inquiry from ${name}`,
      html: emailHtml,
      text: emailText,
    });
    
    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: 'Email sent successfully', id: data?.id },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
