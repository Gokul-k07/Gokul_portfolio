import { NextRequest, NextResponse } from "next/server";
import emailjs from "@emailjs/nodejs";

// Initialize EmailJS with your configuration
emailjs.init({
  publicKey: process.env.EMAILJS_PUBLIC_KEY || "",
});

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

    // Prepare template parameters for EmailJS
    const templateParams = {
      from_name: name,
      from_email: email,
      project_type: projectType,
      message: message,
      to_email: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
      templateParams
    );

    if (response.status === 200) {
      console.log("Email sent successfully:", {
        name,
        email,
        projectType,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        { message: "Email sent successfully!" },
        { status: 200 }
      );
    } else {
      throw new Error("Email sending failed");
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
