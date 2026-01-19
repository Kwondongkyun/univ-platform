# 나라장터 대학 사업 수집 플랫폼

조달청 나라장터의 대학 관련 발주계획을 검색하고 조회할 수 있는 플랫폼입니다.

## 기술 스택

- **Next.js 16** (App Router)
- **React 19.2**
- **TypeScript**
- **Tailwind CSS v4**
- **Shadcn UI**
- **Axios** (API 통신)
- **xlsx** (Excel 내보내기)

## 주요 기능

- 🔍 **발주계획 조회**: 백엔드 DB에서 수집된 발주계획 조회
- 🎯 **유사도 필터링**: 유사도 점수로 필터링 가능
- 📊 **데이터 테이블**: 검색 결과를 표 형식으로 표시
- 📄 **페이지네이션**: 페이지당 행 수 조정 가능
- 📥 **Excel 내보내기**: 검색 결과를 Excel 파일로 다운로드
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 대응

## 시작하기

### 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 백엔드 API URL을 설정합니다:

```bash
# 백엔드 API URL (nara-api 서버)
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 백엔드 서버 실행

프론트엔드를 실행하기 전에 백엔드 서버(nara-api)가 실행 중이어야 합니다.

```bash
# nara-api 디렉토리에서
cd ../nara-api
uvicorn app.main:app --reload
```

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

### 프로덕션 빌드

```bash
npm run build
npm start
```

## 프로젝트 구조

```
src/
├── lib/
│   └── api/
│       └── axios.ts                    # Axios 인스턴스 설정
├── features/
│   └── narashop/
│       └── order-plan/
│           ├── api.ts                  # 백엔드 API 클라이언트
│           └── types.ts                # 요청/응답 타입 정의
├── app/
│   └── (main)/
│       └── order-plans/
│           └── page.tsx                # 메인 페이지
└── components/
    └── order-plans/
        ├── SearchForm/
        │   └── index.tsx               # 검색 폼 컴포넌트
        ├── OrderPlanTable/
        │   └── index.tsx               # 결과 테이블 컴포넌트
        ├── PaginationControls/
        │   └── index.tsx               # 페이지네이션
        └── ExportButton/
            └── index.tsx               # 데이터 내보내기 버튼
```

## API 연동

이 프로젝트는 자체 백엔드 API(nara-api)와 통신합니다.

### 백엔드 API 엔드포인트

- `GET /order-plans` - 발주계획 목록 조회
  - 쿼리 파라미터:
    - `page`: 페이지 번호 (기본값: 1)
    - `size`: 페이지당 항목 수 (기본값: 10)
    - `min_similarity`: 최소 유사도 (옵션, 0.0 ~ 1.0)

### 사용 예시

1. **조회 버튼 클릭**: 백엔드 DB에 저장된 발주계획 조회
2. **유사도 필터**: 0.0 ~ 1.0 값으로 유사도가 높은 항목만 필터링
3. **페이지네이션**: 페이지 이동 및 페이지당 행 수 조정

## 주요 컴포넌트

### SearchForm

검색 조건을 입력받는 폼 컴포넌트입니다. 유사도 필터를 설정할 수 있습니다.

### OrderPlanTable

검색 결과를 테이블로 표시하는 컴포넌트입니다. 다음 정보를 표시합니다:

- 발주기관명
- 사업명
- 계약방법
- 발주금액
- 발주년월
- 공고일시
- 담당자 정보
- 유사도 점수

### PaginationControls

페이지 이동 및 페이지당 행 수를 조정하는 컴포넌트입니다.

### ExportButton

현재 검색 결과를 Excel 파일로 내보내는 컴포넌트입니다.

## 개발 가이드라인

이 프로젝트는 프론트엔드 개발 가이드라인([`.cursor/rules/frontend-rule.mdc`](.cursor/rules/frontend-rule.mdc))을 따릅니다.

주요 규칙:

- 컴포넌트는 PascalCase 디렉토리명 + `index.tsx` 파일로 구성
- API 함수는 kebab-case 사용
- Shadcn UI 컴포넌트 우선 사용
- Tailwind CSS로 스타일링

## 시스템 아키텍처

```
Frontend (Next.js)  ←→  Backend (FastAPI)  ←→  Database (SQLite)
                         ↓
                    Public API (나라장터)
```

1. 백엔드가 나라장터 공공 API에서 데이터를 수집하여 DB에 저장
2. 프론트엔드가 백엔드 API를 통해 DB에서 데이터 조회
3. 유사도 기반 필터링 및 검색 기능 제공

## 라이선스

MIT
