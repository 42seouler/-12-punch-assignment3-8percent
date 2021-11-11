<div align="center">

# [Assignment 4] 8퍼센트

### 원티드x위코드 백엔드 프리온보딩 과제 4

### **[과제 출제 기업 정보]**

[기업명] **8퍼센트**

[🔗 8퍼센트 사이트](https://8percent.kr/)

[🔗 원티드 채용 링크](https://www.wanted.co.kr/wd/64695)

</br>

## 😎 Members of 12-Punch

| 이름   | github                                          | 담당 기능 | TIL/회고 |
| ------ | ----------------------------------------------- | --------- | -------- |
| 김남형 | [42seouler](https://github.com/)                |           |          |
| 김서경 | [riley909](https://github.com/riley909)         |           |          |
| 김요셉 | [kim-jos](https://github.com/kim-jos)           |           |          |
| 정천우 | [codehousepig](https://github.com/codehousepig) |           |          |
| 최유진 | [n12seconds](https://github.com/n12seconds)     |           |          |

</div>

<br>
<br>
<br>
<br>

## 📖 과제 내용

### [필수 포함 사항]

- READ.ME 작성
  - 프로젝트 빌드, 자세한 실행 방법 명시
  - 구현 방법과 이유에 대한 간략한 설명
  - 완료된 시스템이 배포된 서버의 주소
  - Swagger나 Postman을 통한 API 테스트할때 필요한 상세 방법
  - 해당 과제를 진행하면서 회고 내용 블로그 포스팅
- Swagger나 Postman을 이용하여 API 테스트 가능하도록 구현

</br>

### [개발 요구사항]

**✔️ API 목록**

- 거래내역 조회 API
- 입금 API
- 출금 API

<br>

**✔️ 주요 고려 사항**

- 계좌의 잔액을 별도로 관리해야 하며, 계좌의 잔액과 거래내역의 잔액의 무결성의 보장
- DB를 설계 할때 각 칼럼의 타입과 제약

<br>

**✔️ 제약사항**

- (**8퍼센트가 직접 로컬에서 실행하여 테스트를 원하는 경우를 위해**) 테스트의 편의성을 위해 mysql, postgresql 대신 sqllite를 사용해 주세요.

<br>

**✔️ 구현하지 않아도 되는 부분**

- 문제와 관련되지 않은 부가적인 정보. 예를 들어 사용자 테이블의 이메일, 주소, 성별 등
- 프론트앤드 관련 부분

<br>

<details>
<summary><b>✔️  상세설명</b></summary>

**1)** 거래내역 조회 **API**

- 아래와 같은 조회 화면에서 사용되는 API를 고려하시면 됩니다.

  [https://lh6.googleusercontent.com/PdtI4YvVu3biJ0TyEGCHVrR0fAPOQsILYHEczQHmR3UMKEINxlIjjp\_-3gOGu5yGh3YXpxbegNYqNCEosUosq3nKRTMpte6ZiRUccX8iRlD5rxLJ1HWFy6E2HcMFMIMGZO7eVQl5](https://lh6.googleusercontent.com/PdtI4YvVu3biJ0TyEGCHVrR0fAPOQsILYHEczQHmR3UMKEINxlIjjp_-3gOGu5yGh3YXpxbegNYqNCEosUosq3nKRTMpte6ZiRUccX8iRlD5rxLJ1HWFy6E2HcMFMIMGZO7eVQl5)
  거래내역 API는 다음을 만족해야 합니다.

- 계좌의 소유주만 요청 할 수 있어야 합니다.
- 거래일시에 대한 필터링이 가능해야 합니다.
- 출금, 입금만 선택해서 필터링을 할 수 있어야 합니다.
- Pagination이 필요 합니다.
- 다음 사항이 응답에 포함되어야 합니다.
  - 거래일시
  - 거래금액
  - 잔액
  - 거래종류 (출금/입금)
  - 적요

<br>

**2)** 입금 **API**

입금 API는 다음을 만족해야 합니다.

- 계좌의 소유주만 요청 할 수 있어야 합니다.

<br>

**3)** 출금 **API**

출금 API는 다음을 만족해야 합니다.

- 계좌의 소유주만 요청 할 수 있어야 합니다.
- 계좌의 잔액내에서만 출금 할 수 있어야 합니다. 잔액을 넘어선 출금 요청에 대해서는 적절한 에러처리가 되어야 합니다.

<br>

**4)** 가산점

다음의 경우 가산점이 있습니다.

- Unit test의 구현
- Functional Test 의 구현 (입금, 조회, 출금에 대한 시나리오 테스트)
- 거래내역이 1억건을 넘어갈 때에 대한 고려 - 이를 고려하여 어떤 설계를 추가하셨는지를 README에 남겨 주세요.

<br>

</details>

</br>
</br>

## 🛠 사용 기술 및 Tools

### [Back-End]

### [Deploy]

### [Etc.]

<br>
<br>

## DB Schema

</br>
</br>

## 📌 구현 기능

### [회원가입, 로그인]

- 인증방식은 JWT를 쿠키에 저장하는 방식으로 구현 하였습니다.

<br>

### [ 조회수 수정, 좋아요 API]

- 프로젝트 당 배포 할수 있는 개수는 하나로 구현하고, 배포한 게임은 수정 가능, 수정 후 재배포시 기존 배포된 프로젝트도 수정 가능하게 기능 구현 하였습니다.

<br>

### [ 게임 혹은 사용자로 검색 API]

- 게임(프로젝트명) 또는 사용자를 키워드로 하여 검색이 가능하게 기능 구현 하였습니다.

<br>

### [ 에러 핸들링 ]

- 자바스크립트 자체 내장 Error 클래스를 상속 받아서, 커스텀 에러를 생성해서 관리했습니다.

<br>

### [게임 제작 API]

- 기존의 RestFul Api 설계의 경우, 실시간 저장이라는 개념이 성립할 수 없었습니다. 어쩔 수 없이 게임을 제작하는 사용자부분은 **브라우저** 를 이용한 가상의 게임제작 페이지를 사용하기로 하였습니다.
- socket.io를 이용하여 서버와 클라이언트간의 실시간 연결을 유지하고, 게임 프로젝트 데이터의 변경 시 데이터를 서버에 저장합니다.

<br>
<br>

## 📖 API Document

[🔗 Postman Document]()

### API Test 방법

1. 다음 링크로 이동합니다. [postman 링크]()
2. user폴더 안의 회원가입, 로그인 요청을 통하여 accessToken을 획득합니다.
3. 권한이 필요한 api 요청 시 header의 Authorization 항목에 accessToken을 입력하여 요청할 수 있습니다.

- 로그인, 회원가입을 제외한 api 호출시 accessToken이 필요합니다.

<br>
<br>


## 📖 작업 효율 개선 방안


<br>
<br>

## 🪄 설치 및 실행 방법

### 설치

1. 레포지토리를 clone 받습니다

```bash
$ git clone
```

2. clone한 경로에 들어간 후 의존성을 설치하고 환경 셋팅을 진행합니다.

```bash
$ cd 12-punch-assignment4-8percent
$ npm install
```

<span style="color:red"><b>[수정]</b> 3. src 폴더에 .env 파일을 만들어 환경변수를 설정합니다.</span>

- [.env설정 노션 링크]()
- <details><summary><b>링크 접속불가 시 .env 파일 설정 방법</b></summary>

  ```
  MONGO_URL= 'db 주소'
  PORT= '서버의 포트'
  JWT_SECERT= '원하는 시크릿코드'
  JWT_ALGO="HS256"
  ```

</details>

4. 서버를 구동합니다.

```bash
$ npm start
```

<span style="color:red"><b>[수정]</b>5. Unit test 및 End-to-End test를 진행합니다.</span>

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

</br>
</br>

## 😺 컨벤션 설정

</br>
</br>

## 🛠 Dependencies

</br>

<div align=center>

</div>

</br>
</br>

## 🌲 File Tree

```

📦 12-punch-assignment4-8percent
 ├─📂 src
 │  ├─📂 auth
 │  │  ├─📂 guards
 │  │  │  ├─📄 jwt-auth.guard.ts
 │  │  │  └─📄local-auth.guard.ts
 │  │  ├─📂 strategies
 │  │  │  ├─📄 jwt.strategy.ts
 │  │  │  ├─📄 local.strategy.ts
 │  │  │  └─📄 role.guard.ts
 │  │  ├─📄 auth.module.ts
 │  │  ├─📄 auth.service.spec.ts
 │  │  ├─📄 auth.service.ts
 │  │  └─📄 constants.ts
 │  ├─📂 common
 │  │  └─📄 base-common.entity.ts
 │  ├─📂 decorators
 │  │  └─📄 roles.decorator.ts
 │  ├─📂 enums
 │  │  └─📄 user.role.enum.ts
 │  ├─📂 users
 │  │  ├─📂 dto
 │  │  │  ├─📄 create-user.dto.spec.ts
 │  │  │  ├─📄 create-user.dto.ts
 │  │  │  ├─📄 login-user.dto.ts
 │  │  │  ├─📄 read-user.dto.ts
 │  │  │  └─📄 update-user.dto.ts
 │  │  ├─📄 user.entity.ts
 │  │  ├─📄 users.controller.spec.ts
 │  │  ├─📄 users.controller.ts
 │  │  ├─📄 users.module.ts
 │  │  ├─📄 users.repository.spec.ts
 │  │  ├─📄 users.repository.ts
 │  │  ├─📄 users.service.spec.ts
 │  │  └─📄 users.service.ts
 │  ├─📄 app.controller.spec.ts
 │  ├─📄 app.controller.ts
 │  ├─📄 app.module.ts
 │  ├─📄 app.service.ts
 │  └─📄 main.ts
 ├─📂 test
 │  ├─📄 app.e2e-spec.ts
 │  └─📄 jest-e2e.json
 ├─📄 .eslintrc.js
 ├─📄 .gitignore
 ├─📄 .prettierrc
 ├─📄 README.MD
 ├─📄 docker-compose.yml
 ├─📄 nest-cli.json
 ├─📄 ormconfig.json
 ├─📄 package-lock.json
 ├─📄 package.json
 ├─📄 tsconfig.build.json
 └─📄 tsconfig.json

```

<br>
<br>

## Reference

이 프로젝트는 [원티드 프리온보딩 백엔드 코스](https://www.wanted.co.kr/events/pre_onboarding_course_4) 4차 과제 일환으로 8퍼센트에서 출제한 과제를 기반으로 만들었습니다.

2021년 11월 11일(목) 오후 6시 ~ 11월 13일(토) 오전 10시