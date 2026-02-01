## 🚀 Next.js 13 Full-Stack Forum Project
#### Next.js + MongoDB를 활용한 SSR + CSR 통합 게시판 서비스

### 🛠 Tech Stack
- **Framework**: Next.js 13.4.13

- **Database**: MongoDB 5.7.0

- **Auth**: Next-Auth 4.23.1 (Credentials & OAuth)

- **Language & Tool**: TypeScript, Node.js 20.5.0, Axios, TailwindCSS, bcrypt, clsx

---

### 📌 전체 기능 요약
- **인가/인증**: 회원가입/로그인, Access·Refresh Token 발급, 세션 기반 유저 관리 및 페이지 라우팅 제어

- **회원관리**: 유저 고유 ID 기반 프로필 정보 수정 (닉네임 등)

- **게시판**: 게시글 및 댓글의 CRUD(생성, 조회, 수정, 삭제) 기능 실무 구현

---

### 💻 Frontend 상세 구현
**1. 고도화된 폼 제어 (Controlled Form)**
- **실시간 유효성 검사**: State 관리를 통해 정규식 기반 에러 메시지를 실시간으로 노출합니다.

- **비정상 요청 차단**: 유효성 검사 미통과 시 Submit을 제한하여 불필요한 API 통신을 방지합니다.

- **스팸 클릭 방지**: API 통신 중 버튼을 비활성화하고, 통신 결과(status)에 따라 재활성 로직을 적용했습니다.

**2. 인증 및 보안 라우팅**
- **접근 권한 제어**: 세션 유무를 확인하여 비회원이 회원 전용 URL 접근 시 로그인 페이지로 리다이렉트합니다.

- **Next-Auth 활용**:

  - 커스텀 로그인 폼 정보를 signIn 함수를 통해 백엔드와 통신합니다.

  - 인증이 필요한 API 요청 시 헤더에 accessToken을 포함하여 보안을 강화했습니다.

- **실시간 세션 업데이트**: 닉네임 변경 등 프로필 정보 수정 시, 수동 세션 업데이트(update)를 통해 UI에 즉시 반영합니다.

**3. 게시판 및 유저 인터랙션**
- **Dynamic Routing & SSR**:

  - 게시글 고유 ID를 파라미터로 활용하며, SSR을 통해 SEO 최적화 및 게시글 공유 시 메타데이터 노출이 가능합니다.

- **소유권 기반 UI 렌더링**:

  - 게시글/댓글 작성자와 현재 로그인 유저의 ID를 대조하여 본인의 글에만 수정/삭제 버튼을 노출합니다.

  - URL 변조를 통한 타인 글 수정 접근 시 목록 페이지로 강제 이동시키는 방어 로직을 구축했습니다.

 ---

⚙️ Backend 상세 구현
**1. 인증 시스템 (Next-Auth API)**

- **Credentials Provider**: 회원가입 시 bcrypt를 활용해 비밀번호를 암호화하여 저장합니다.

- **oAuth Integration**: 소셜 로그인 정보를 자체 DB에 매핑하여 저장함으로써, 소셜 로그인 유저도 프로필 수정이 가능하도록 설계했습니다.

- **Token Management**: oAuth 기반 Token/Refresh Token 발급 및 만료 시 재발급 요청 로직을 구현했습니다.

**2. RESTful API 설계**

- **규격 준수**: 리소스 성격에 맞는 HTTP Method(GET, POST, PUT, DELETE)를 사용합니다.

- **데이터 정합성**: 프론트엔드와 백엔드에서 정규식 및 NULL 검사를 수행하는 크로스 검증 시스템을 갖췄습니다.

**3. 데이터 관계 설계 및 가공**

- **Relationship Mapping**:

  - 게시글 조회 시 작성자 ID를 기반으로 DB 유저 정보를 Join하여 최신 닉네임을 반환합니다.

  - 이를 통해 유저가 닉네임을 변경해도 과거 작성글의 닉네임이 실시간으로 반영됩니다.

- **CRUD 로직 최적화**:

  - **PUT/DELETE**: 세션 ID와 리소스 소유자 ID를 검증한 후 작업을 수행합니다.

  - **댓글 시스템**: 게시글 도큐먼트 내 배열 형태로 댓글을 저장하며, 고유 Object ID를 부여하여 개별 댓글 제어가 가능합니다.

### 📅 To-Do List (향후 고도화 계획)

- [ ] 게시글 조회수 카운팅 기능 추가

- [ ] 커서 기반 또는 오프셋 기반 Pagination 구현

- [ ] 키워드 검색 기능 (Search 엔진 고도화)

🚀 실행 방법
```Bash
Bash
npm run dev
# or
yarn dev
```

이 프로젝트는 프론트엔드 역량을 넘어, 데이터의 흐름과 보안 메커니즘을 깊이 이해하고 설계한 풀스택 기반의 결과물입니다.
