# YP - 콘텐츠 비즈니스 플랫폼

콘텐츠의 영향력으로 브랜드와 시장을 연결하는 YP의 공식 웹사이트입니다.

## 기술 스택

| 구분 | 기술 |
|------|------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5.7 |
| UI Library | React 19 |
| Styling | styled-components 6 |
| Animation | Lottie React |
| SEO | JSON-LD (schema-dts) |

## 주요 기능

- **디자인 시스템**: 토큰 기반 테마 관리 (colors, spacing, typography)
- **스크롤 애니메이션**: Intersection Observer 기반 트리거 애니메이션
- **반응형 디자인**: Mobile-First 접근, Fluid Typography
- **SEO 최적화**: Open Graph, Twitter Card, JSON-LD 구조화 데이터
- **콘텐츠 관리**: JSON 기반 콘텐츠 분리

## 시작하기

### 요구 사항

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

개발 서버는 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## 프로젝트 구조

```
src/
├── app/                    # 페이지 라우팅 (App Router)
│   ├── layout.tsx          # 루트 레이아웃 + SEO 메타데이터
│   ├── page.tsx            # 홈페이지
│   └── about/              # 어바웃 페이지
├── components/
│   ├── common/             # 재사용 UI 컴포넌트
│   ├── layout/             # Header, Footer
│   ├── sections/           # 페이지 섹션 컴포넌트
│   └── seo/                # JSON-LD 구조화 데이터
├── styles/
│   ├── theme.ts            # 테마 설정
│   ├── tokens.ts           # 디자인 토큰
│   ├── animations.ts       # 키프레임 애니메이션
│   └── GlobalStyle.ts      # 글로벌 스타일
├── hooks/                  # 커스텀 훅
├── data/                   # 콘텐츠 JSON
└── types/                  # TypeScript 타입 정의
```

## 디자인 토큰

### Colors

```typescript
colors: {
  blue: {
    50: "#E6F3FF",
    500: "#0084FF",  // Primary
    ...
  },
  neutral: {
    0: "#FFFFFF",
    900: "#1A1A1A",
    ...
  },
  system: {
    success: "#00C853",
    warning: "#FFD700",
    error: "#FF3D00",
  }
}
```

### Breakpoints

| Name | Size |
|------|------|
| Mobile | 576px |
| Tablet | 768px |
| Desktop | 1200px |

## 배포

Vercel을 통해 자동 배포됩니다.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 라이선스

MIT License
