## YP - 콘텐츠 비즈니스 플랫폼

https://www.notion.so/321bb97da87b8057aae6dcab7a726cdd?source=copy_link

## 배포 링크
https://yp-orcin.vercel.app/

콘텐츠의 영향력으로 브랜드와 시장을 연결하는 YP의 공식 웹사이트입니다.

## 기술 스택

| 구분 | 기술 |
|------|------|
|Framework|	Next.js (App Router)|
|Language|	TypeScript|
|Styling|	Styled Components|
|Font|	next/font (Playfair + Noto Sans KR)|
|Deploy |	Vercel|

## 주요 기능

- **디자인 시스템**: 토큰 기반 테마 관리 (colors, spacing, typography)
- **스크롤 애니메이션**: Intersection Observer 기반 트리거 애니메이션
- **반응형 디자인**: Mobile-First 접근, Fluid Typography
- **SEO 최적화**: Open Graph, Twitter Card, JSON-LD 구조화 데이터
- **콘텐츠 관리**: JSON 기반 콘텐츠 분리

## 시작하기

### 요구 사항

- 요구사항과 방향성
    
    https://gamma.app/docs/We-Build-Influence-That-Converts-luiljsb7hr33pya?mode=doc
    
    - 디자인 및 컨셉이 전혀 없음 / 포인트 컬러 블루 사용중
        
        → 신뢰감 있는 블루 컬러를 과감하게 사용
        
        → 크리에이티브함을 표현하기 위해 화려한 인터렉션 활용
        
    - 원페이지 스크롤 스토리텔링 -
        
        → 원페이지로 구성 하되, 스크롤을 내리며 섹션 별 스토리텔링을 쌓아가도록 구성
        
        → 점자 요구 사항이 많아져서 home과 about 페이지로 구성
        
        → 페이지 이동 | 섹션 내비게이션 으로 헤더를 분리하여 페이지 이동 시 섹션 내비게이션이 알맞게 바뀌도록 구성
        
    - 연락하기에 알림을 받았으면 하지만, 카카오톡 문자 등 유료서비스는 지양
        
        → 이메일로 전달(resend 활용/무료) 구글 시트(app script활용/무료)에 DB가 쌓이고, 이메일로 알림

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
