import { Playfair_Display, Noto_Sans_KR } from "next/font/google";

// Display 폰트 - Hero 타이틀용 (Serif)
export const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

// 본문 폰트 - Noto Sans KR (한글 최적화)
// 프로덕션에서는 Pretendard로 교체 가능
export const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pretendard",
  weight: ["300", "400", "500", "600", "700"],
});

// 폰트 변수 클래스 결합
export const fontVariables = `${playfair.variable} ${notoSansKR.variable}`;
