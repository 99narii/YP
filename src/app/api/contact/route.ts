import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactFormData {
  name: string;
  company?: string;
  email: string;
  phone: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, company, email, phone, message } = body;

    // Validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "필수 필드를 모두 입력해주세요." },
        { status: 400 }
      );
    }

    // Check for required environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "서버 설정 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const timestamp = new Date().toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
    });

    // 1. Send email via Resend
    const emailResult = await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      to: process.env.EMAIL_TO || "",
      subject: `[YP 문의] ${name}님의 새로운 문의가 도착했습니다`,
      html: `
        <div style="font-family: 'Noto Sans KR', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a56db; border-bottom: 2px solid #1a56db; padding-bottom: 10px;">
            새로운 문의가 접수되었습니다
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold; width: 100px;">이름</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold;">회사명</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">${company || "-"}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold;">이메일</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">
                <a href="mailto:${email}">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold;">연락처</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">
                <a href="tel:${phone}">${phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold;">문의내용</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee; white-space: pre-wrap;">${message || "-"}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold;">접수시간</td>
              <td style="padding: 12px;">${timestamp}</td>
            </tr>
          </table>

          <p style="margin-top: 30px; color: #666; font-size: 12px;">
            이 이메일은 YP 웹사이트 문의 폼에서 자동으로 발송되었습니다.
          </p>
        </div>
      `,
    });

    if (emailResult.error) {
      console.error("Resend error:", emailResult.error);
      return NextResponse.json(
        { error: "이메일 전송에 실패했습니다." },
        { status: 500 }
      );
    }

    // 2. Save to Google Sheets via Apps Script
    const googleSheetUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    if (googleSheetUrl) {
      try {
        await fetch(googleSheetUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            timestamp,
            name,
            company: company || "",
            email,
            phone,
            message: message || "",
          }),
        });
      } catch (sheetError) {
        // Google Sheets 저장 실패는 로그만 남기고 계속 진행
        console.error("Google Sheets error:", sheetError);
      }
    }

    return NextResponse.json(
      { message: "문의가 성공적으로 전송되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
