# TripStack

<table align="center">
   <tr>
     <td width="60%" align="center">
<img width="80%" alt="스크린샷 2026-08-05 오후 12 27 02" src="https://github.com/user-attachments/assets/5c4737bb-be6b-4b70-b56a-fcf44136bd87" /><br>
       <sub><b> WebApp Tripstack </b></sub><br><br>
      <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white">
      <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black">
      <img src="https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white">
      <img src="https://img.shields.io/badge/Zustand-4A3728?style=flat-square&logo=zustand&logoColor=white">
      <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white">
      <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white">
       </td>
      </tr>
</table>

## 1. 서비스 소개

TripStack은 여행 크리에이터의 영상·사진 콘텐츠를 분석해 인쇄 가능한 여행 가이드북으로 정리하고, 사용자가 마음에 드는 가이드북을 담아 인쇄 주문 흐름까지 확인할 수 있는 웹앱 콘텐츠 서비스입니다.
여행 영상log를 추억으로 삼는 것 뿐 아니라 굿즈, 가이드북 형태의 인쇄물 상품형태로 이어지도록 목표하는 플랫폼입니다.

### 타겟 사용자

사용자
- 모바일이나 디지털 가이드북 형태에 익숙치 않은 유아 혹은 고령 사용자
- 인지도 있는 여행 크리에이터의 여행일지를 한눈에 요약된 형태로 인쇄받아 가이드북으로 이용하고 싶은 사용자

크리에이터
- 본인의 여행 콘텐츠를 영상 제작물뿐 아니라 인쇄 형태의 굿즈, 2차 상품으로 활용하고싶은 사용자


### 주요 기능

- 메인 홈에서 추천 가이드북, 카테고리별 가이드북, 인기 크리에이터 조회
- 국가/도시 기준 가이드북 검색
- 가이드북 상세뷰에서 썸네일, 크리에이터 정보, 이동 지도, 상세 이미지/설명 확인
- 관심 크리에이터 추가/해제
- 상대 크리에이터 프로필과 해당 크리에이터의 가이드북 조회
- 로그인/회원가입, 프로필 편집, 회원정보 수정, 로그아웃
- 내 크리에이터 화면에서 가이드북 생성, 수정, 삭제 흐름 확인
- 국가/도시 선택, 지도 위 위치 포인트 배치, 사진+텍스트 블록 기반 가이드북 생성
- 담아둔 가이드북을 인쇄목록에서 조회, 수량 변경, 제거, 전체삭제, 주문 생성까지 확인
- 판매목록에서 내 가이드북에 들어온 주문 데이터 테이블 확인
- 관리자 페이지에서 사용자 목록, 가이드북 목록, 주문 목록 조회와 사용자 수정/삭제, 주문 상태 변경
- JWT 기반 로그인 검증과 관리자 API 권한 보호
- PC/모바일 반응형 UI

_____________________
<br>

## 2. 설계 의도

### 아이디어 선택 이유

여행 콘텐츠는 크리에이터 별 플랫폼, 영상, 이미지, SNS 저장 목록처럼 곳곳에 흩어져 소비되는 경우가 많습니다. 하지만 실제 여행 중에는 짧은 시간 안에 장소, 이동 순서, 핵심 정보를 다시 확인해야 합니다. 또 사용자가 일일히 정보를 수집 캡처해서 모바일에 들고다니며 여행정보를 확인하는 것도 불편한 일 입니다. (네트워크, 배터리 등 여러 에러 이슈가 있을 수 있습니다.) TripStack은 크리에이터 콘텐츠를 지역별 가이드북으로 재구성하고, 사용자가 필요할 때 인쇄 가능한 형태로 담을 수 있는 서비스로 기획했습니다.


_____________________
<br>

## 3. 기술 스택 및 아키텍처

### 기술 스택

- Frontend: Next.js, React, TypeScript
- Library, State: Zustand
- Backend: Express, TypeScript
- Database: SQLite, better-sqlite3
- Auth: JSON Web Token(jsonwebtoken)
- Runtime: Docker Compose

### 선택 이유

- Next.js는 파일 기반 라우팅과 React 컴포넌트 구조를 활용해 메인 화면, 크리에이터 화면, 인쇄하기/판매목록 화면을 빠르게 나누기에 적합했습니다.
- React는 상세 모달, 검색 탭, 장바구니 수량 변경처럼 상태가 필요한 UI를 컴포넌트 단위로 관리하기 좋았습니다.
- Express는 가이드북, 상세 블록, 장바구니, 주문 API를 단순한 REST 구조로 구현하기에 적합했습니다.
- SQLite는 별도 DB 서버 설치 없이 Docker 실행 직후 더미데이터와 CRUD 흐름을 확인할 수 있어 과제 환경에 적합했습니다.
- JWT는 프론트엔드와 Express API 서버가 분리된 구조에서 로그인 사용자와 관리자 권한을 API 요청 단위로 검증하기 위해 사용했습니다.
- Docker Compose는 심사자가 프론트엔드와 백엔드를 한 번에 실행할 수 있도록 하기 위해 사용했습니다.
- Zustand로 인쇄목록상태를 store 상태관리로 중앙집중해 관리를 용이하게 변경했습니다.

### 주요 디렉터리 구조

```txt
TripStack
├── client
│   └── src
│       ├── app
│       │   ├── page.tsx              # 로그인 화면으로 연결하는 root 라우트
│       │   ├── consumer              # 기존 소비자 경로를 홈으로 연결하는 redirect 라우트
│       │   ├── creator               # 내 화면과 상대 크리에이터 화면 라우트
│       │   ├── login                 # 로그인/회원가입 진입 라우트
│       │   ├── admin                 # 관리자 화면 라우트
│       │   ├── print-cart            # 인쇄하기/판매목록 화면 라우트
│       │   └── styles                # 화면별 CSS 분리
│       ├── components
│       │   ├── common                # 공용 헤더, 상단 탭바, 주문목록 드롭다운 버튼
│       │   ├── auth                  # 로그인 폼, 회원가입 모달
│       │   ├── admin                 # 관리자 대시보드
│       │   ├── consumer              # 홈 피드, 검색, 크리에이터 레일, 카테고리 섹션
│       │   ├── creator               # 크리에이터 화면, 가이드북 생성/수정 모달
│       │   ├── guidebook             # 가이드북 상세 모달과 인쇄 상세 모달
│       │   ├── profile               # 프로필 편집, 회원정보 수정 모달
│       │   └── print                 # 인쇄하기/판매목록 UI
│       ├── features
│       │   ├── account               # 로그인 사용자와 JWT 토큰 상태
│       │   ├── basket                # Zustand 인쇄목록 store
│       │   ├── creator               # 크리에이터 게시물 삭제 상태
│       │   ├── guidebook             # 가이드북 상수와 catalog hook
│       │   └── interest              # 관심 크리에이터 상태
│       ├── services                  # Express API 요청 함수
│       └── types                     # 프론트 공용 타입
├── server
│   └── src
│       ├── db.ts                     # SQLite 연결, 테이블 생성, seed 데이터
│       └── server.ts                 # Express REST API
├── data
│   └── tripstack.db                  # 로컬 SQLite DB 파일
└── docker-compose.yml
```

### 주요 데이터 구조

- `users`: 크리에이터/소비자 계정 정보, 프로필 이미지, 팔로워/신뢰도 수치
- `guidebooks`: 가이드북 기본 정보, 국가/도시, 썸네일, 지도 이미지, 조회수, 단가
- `guidebook_route_points`: 가이드북별 지도 위치 포인트와 이동선 좌표
- `guidebook_blocks`: 상세 화면에 반복 출력되는 이미지, 장소 타이틀, 설명 블록
- `print_cart_items`: 사용자가 인쇄목록에 담은 가이드북, 수량, 갱신 시각
- `custom_prints`: 주문 시 선택한 인쇄 레이아웃 정보
- `orders`: 구매자 주문과 판매자 판매목록을 연결하는 주문 데이터, 수량, 총 금액, 상태값

더미데이터와 이미지는 프로젝트 내부에 포함되어 있습니다. 지도 미리보기는 `GEOAPIFY_API_KEY`가 있으면 Geoapify 정적 지도 API를 사용하고, 키가 없으면 프로젝트 내부의 지도 이미지를 fallback으로 사용합니다.

### 인증 및 권한 보호 구조

- 로그인/회원가입 성공 시 Express 서버가 `jsonwebtoken`으로 JWT를 발급합니다.
- 클라이언트는 JWT를 `tripstack.authToken`에 저장하고, 이후 API 요청마다 `Authorization: Bearer <token>` 헤더로 전달합니다.
- Express는 `jwt.verify()`로 토큰을 검증한 뒤 토큰 payload의 `userId`를 기준으로 DB의 `users` 테이블을 조회합니다.
- 관리자 API는 `requireAdminUser()` 가드 함수로 `is_admin` 값을 확인하며, 관리자가 아니면 `401` 또는 `403` 응답으로 차단합니다.
- 프론트 라우트에서도 `/admin`은 관리자만 접근 가능하고, `/creator`는 로그인 사용자만 접근 가능하도록 1차 보호를 적용했습니다.

### API 범위

공개 조회 API:

- `GET /api/health`: 서버 상태 확인
- `GET /api/users`: 크리에이터 목록 조회
- `GET /api/guidebooks`: 가이드북 목록 조회
- `GET /api/guidebooks/:id/blocks`: 가이드북 상세 블록 조회
- `GET /api/maps/cities`, `GET /api/maps/preview`: 국가/도시와 지도 미리보기 조회

인증 사용자 API:

- `POST /api/auth/signup`, `POST /api/auth/login`: 회원가입과 로그인, JWT 발급
- `PATCH /api/users/:id/profile`: 프로필 정보 수정
- `PATCH /api/users/:id/account`: 이메일/비밀번호 수정
- `GET /api/print-cart`: 인쇄목록 조회
- `POST /api/print-cart`: 인쇄목록 담기
- `PATCH /api/print-cart/:guidebookId`: 인쇄목록 수량 변경
- `DELETE /api/print-cart`, `DELETE /api/print-cart/:guidebookId`: 인쇄목록 전체삭제와 개별 제거
- `POST /api/orders`: 인쇄 주문 생성
- `POST /api/guidebooks`, `PATCH /api/guidebooks/:id`, `DELETE /api/guidebooks/:id`: 가이드북 생성, 수정, 삭제

관리자 전용 API:

- `GET /api/admin/users`: 전체 사용자 목록 조회
- `GET /api/admin/guidebooks`: 전체 가이드북 목록 조회
- `GET /api/admin/orders`: 전체 주문 목록 조회
- `PATCH /api/admin/users/:id`: 사용자 정보와 관리자 권한 수정
- `DELETE /api/admin/users/:id`: 사용자 삭제
- `PATCH /api/orders/:id/status`: 주문 상태 변경

_____________________
<br>


## 4. 실행 방법 (Docker)

저장소 클론 후 프로젝트 루트에서 실행합니다.

```bash
git clone <repo-url>
cd TripStack
docker compose up --build
```

필요한 환경변수는 `.env.example`을 참고해 `.env`에 작성할 수 있습니다.

```env
WEB_PORT=3000
API_PORT=4000
ADMIN_SIGNUP_CODE=tripstack-admin
JWT_SECRET=change-this-tripstack-secret
GEOAPIFY_API_KEY=
NEXT_PUBLIC_GEOAPIFY_API_KEY=
```

접속 주소:

```txt
http://localhost:3000
```

API 확인:

```txt
http://localhost:4000/api/health
```

포트 충돌이 있으면 환경변수로 포트를 변경할 수 있습니다.

```bash
WEB_PORT=3001 API_PORT=4001 docker compose up --build
```

변경 후 접속 주소:

```txt
http://localhost:3001
http://localhost:4001/api/health
```

로컬 개발 실행이 필요한 경우:

```bash
cd server
npm install
npm run dev
```

```bash
cd client
npm install
npm run dev
```

_____________________
<br>

## 5. 사용자 경험(UI/UX) 설계

<table align="center">
   <tr>
     <td width="100%" align="center">
<img width="80%" alt="스크린샷 2026-08-05 오후 12 27 02" src="https://github.com/user-attachments/assets/5c4737bb-be6b-4b70-b56a-fcf44136bd87" /><br>
       <sub><b> 메인화면 개요 </b></sub>
       </td>
      </tr>
</table>


<table align="center">
  <tr>
    <td width="33.33%" align="center">
      <img width="100%" src="https://github.com/user-attachments/assets/fb2e0137-3fdd-435c-9d20-b0fcd60a1d3b" /><br>
      <sub><b>1. 메인 화면 (검색 | 가이드북 조회)</b></sub>
    </td>
    <td width="33.33%" align="center">
      <img width="100%" src="https://github.com/user-attachments/assets/20420a95-69a1-4195-ba75-b0c7c60b6875" /><br>
      <sub><b>2. 검색</b></sub>
    </td>
    <td width="33.33%" align="center">
      <img width="100%"  src="https://github.com/user-attachments/assets/604b1995-06e9-42fd-965a-7efd9f9fa82f" /><br>
      <sub><b>3. 가이드북 상세화면</b></sub>
    </td>
  </tr>

  <tr>
    <td width="33.33%" align="center">
      <img width="100%" src="https://github.com/user-attachments/assets/bb76253e-243f-42ac-9c4e-45a5c35db41b" /><br>
      <sub><b>4. 내 화면 (가이드북 생성 | 관리)</b></sub>
    </td>
    <td width="33.33%" align="center">
      <img width="100%" src="https://github.com/user-attachments/assets/f06d6278-5e8f-448d-9170-d0d2f200d033" /><br>
      <sub><b>5. 가이드북 생성</b></sub>
    </td>
    <td width="33.33%" align="center">
      <img width="100%"  src="https://github.com/user-attachments/assets/e9cb6350-5965-4aba-b22a-3b57a70bd664" /><br>
      <sub><b>6. 내 가이드북 삭제 및 수정</b></sub>
    </td>
  </tr>


  <tr>
    <td width="33.33%" align="center">
      <img width="100%" src="https://github.com/user-attachments/assets/46123d4a-dd66-4eb3-8bfd-2957ca369a69" /><br>
      <sub><b>7. 우측상단 고정버튼(주문 인쇄 | 관리 조회)</b></sub>
    </td>
    <td width="33.33%" align="center">
      <img width="100%" src="https://github.com/user-attachments/assets/72901931-ad0f-4490-9a36-0d11e4f05eb3" /><br>
      <sub><b>8. 주문목록 인쇄하기</b></sub>
    </td>
    <td width="33.33%" align="center">
      <img width="100%"  src="https://github.com/user-attachments/assets/910a812c-d589-4f65-b966-998b3056395f" /><br>
      <sub><b>9. 판매목록 조회하기</b></sub>
    </td>
  </tr>
  
</table>


____________
<br>

## 기술적 문제해결 과정

<details>
<summary><strong>1. 로그인 관리자 검증 JWT 토큰 발행</strong></summary>

> #### 문제
> 기존에는 프론트에서 currentUser를 들고있다가 API요청에 넘기는 데모용 userId를 사용했습니다.
> 실제 로그인과 접근제한 등을 구현하기 위해서는 토큰검증방식이 필요했습니다.


✅ 로그인/ 회원가입시 JWT토큰발행 

초기에는 프론트에서 userId를 직접 전달하는 데모 방식으로 사용자별 데이터를 구분했습니다.
이후 JWT 인증을 도입해 로그인 성공 시 Access Token을 발급하고, API 요청마다 Authorization 헤더로 토큰을 전달하도록 개선했습니다.

서버는 토큰을 검증해 현재 로그인 사용자를 조회하고, 관리자 API는 requireAdminUser 미들웨어성 함수로 보호했습니다.
이를 통해 관리자 권한이 없는 사용자는 사용자/가이드북/주문 관리 API에 접근할 수 없도록 했고, 로그인하지 않은 사용자는 크리에이터 화면과 관리자 화면에 접근하지 못하도록 처리했습니다.

현재 주문내역 조회는 JWT 기준으로 본인 주문만 조회되도록 구현했으며, 인쇄목록과 가이드북 수정/삭제 API도 JWT 기반 소유자 검증으로 확장할 예정입니다.

```
// 관리자를 검증하는 requireAdminUser
function requireAdminUser(request, response) {
  const currentUser = getRequestUser(request);

  if (!currentUser) {
    response.status(401).json({ message: '로그인이 필요합니다.' });
    return null;
  }

  if (!currentUser.isAdmin) {
    response.status(403).json({ message: '관리자 권한이 필요합니다.' });
    return null;
  }

  return currentUser;
}
```

</details>


_____________________
<br>

## 6. AI 도구 사용 내역

### Codex

- 프로젝트 설계 : 전체적인 디렉터리 구조와 컴포넌트 분리, 상태 관리 방식을 함께 설계하며 개발 방향을 구체화했습니다.
- 코드 구현 및 리팩토링 : Next.js, Express, SQLite 기반의 CRUD 기능 구현과 컴포넌트 리팩토링, 반복 코드 개선에 활용했습니다.
- 디버깅 : API 연동 오류, 라우팅 문제, 비동기 처리, 타입 오류 등을 분석하고 원인을 빠르게 찾아 수정했습니다.
- 코드 리뷰 : 작성한 코드를 검토하며 불필요한 로직 제거, 가독성 향상, 유지보수성을 개선했습니다.
- 과제 요구사항 검증 : 과제 요구사항과 현재 구현 상태를 비교하며 누락된 기능과 README 문서를 점검했습니다.

### Gemini

- 콘텐츠,데이터 제작 : 더미 데이터에 사용할 여행 크리에이터 이미지, 가이드북 썸네일, 상세 이미지를 생성했습니다.
- 콘텐츠 생성 : 여행 소개 문구, 태그, 설명 등 실제 서비스와 유사한 더미 콘텐츠를 제작했습니다.

### AI 사용 중 겪은 문제

- 초기에 AI가 제안한 구조가 실제 서비스 흐름과 맞지 않아 컴포넌트 이름과 화면 역할을 여러 차례 정리했습니다.
- 더미 데이터를 생성함에 있어, 원하는 이미지나 컨셉에 맞지않아 여러차례 프롬프트를 수정하며 데이터를 초안을 정리했습니다.


_____________________
<br>

## 7. 앞으로 개선할 부분

- 주문 흐름 UI/상태 정리
- MySQL 전환
- AWS EC2 또는 Render/Vercel 배포
- 영상 분석 더미 플로우 추가

