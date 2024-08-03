import { NextRequest, NextResponse } from "next/server";
import EmailTemplate from "@/app/emails/email";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  const {
    invoiceID,
    items,
    title,
    amount,
    customerEmail,
    issuerName,
    accountNumber,
    currency,
  } = await req.json();



  try {
    const { data, error } = await resend.emails.send({
      from: "SxidSvit <sxidsvit@resend.dev>",
      to: ['s.p.antonyuk@gmail.com'],
      subject: title,
      react: EmailTemplate({
        invoiceID,
        items: JSON.parse(items),
        amount: Number(amount),
        issuerName,
        accountNumber,
        currency,
      }) as React.ReactElement,
    });

    if (error) {
      console.log('error: ', error);
      return Response.json({ message: `"Email not sent!" \n ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ message: `"Email delivered! \n customerEmail: " ${customerEmail}` }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Email not sent!", error }, { status: 500 });
  }
}