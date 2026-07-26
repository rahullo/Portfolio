import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "dummy_key");

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // If API key is not configured, simulate successful email logging for testing
    if (!process.env.RESEND_API_KEY) {
      console.log("--- Simulated Contact Form Email ---");
      console.log(`From: hello@rahullo.online`);
      console.log(`Reply-To: ${email}`);
      console.log(`Subject: New Portfolio Contact from ${name}`);
      console.log(`Message: ${message}`);
      console.log("------------------------------------");

      return NextResponse.json({
        success: true,
        message: "Email simulated successfully (RESEND_API_KEY missing)",
      });
    }

    // Send email via Resend
    const response = await resend.emails.send({
      from: "hello@rahullo.online",
      to: "rahullohra987@gmail.com",
      subject: `New Portfolio Message from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    if (response.error) {
      return NextResponse.json(
        { error: response.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: response.data?.id });
  } catch (err) {
    console.error("Resend API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
