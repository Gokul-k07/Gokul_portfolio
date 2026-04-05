import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, projectType, message } = await request.json();

    // Validate required fields
    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // TODO: Implement email sending logic
    // Options:
    // 1. Use Nodemailer with SMTP
    // 2. Use SendGrid API
    // 3. Use AWS SES
    // 4. Use Resend (recommended for Next.js)
    
    // For now, log the message and return success
    console.log("Contact form submission:", {
      name,
      email,
      projectType,
      message,
      timestamp: new Date().toISOString(),
    });

    // Example: Send email using Resend (requires API key)
    // const response = await resend.emails.send({
    //   from: "contact@yourdomian.com",
    //   to: "your-email@gmail.com",
    //   replyTo: email,
    //   subject: `New Contact Form Submission from ${name}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Project Type:</strong> ${projectType}</p>
    //     <p><strong>Message:</strong> ${message}</p>
    //   `,
    // });

    return NextResponse.json(
      { 
        message: "Form submitted successfully. We'll get back to you soon!",
        success: true 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
