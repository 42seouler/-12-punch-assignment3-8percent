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
| 김남형 | [42seouler](https://github.com/)                | DB분산 저장, 계좌API, 유닛 테스트          |          |
| 김서경 | [riley909](https://github.com/riley909)         | 거래내역 조회 API, 유저 CRUD |          |
| 김요셉 | [kim-jos](https://github.com/kim-jos)           | 유닛테스트 작성, DB설계     |          |
| 정천우 | [codehousepig](https://github.com/codehousepig) | DB설계, entity 작성 |  [codehousepig](https://blog.naver.com/codehouse9/222567074892)          |
| 최유진 | [n12seconds](https://github.com/n12seconds)     | 입금,출금 API, JWT로그인 |          |

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

### [Back-End] ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

### [Deploy] <img src="https://img.shields.io/badge/AWS_EC2-232F3E?style=for-the-badge&logo=Amazon&logoColor=white"/>

### [Etc.] <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white"/> <img src="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white">


<br>
<br>

## DB Schema
<img src="https://user-images.githubusercontent.com/61304585/141412331-fc5eb73b-7d3e-417c-8aa2-17dd9f4a38e9.png" width="700"/> </br>
### User Table
| column name | 컬럼 이름   | data type   | 제약조건  | 이유    |
| ---------- | ---------- | ----------- | -------- |-------- |
| id         | 유저 아이디 | INT         | PK       | 2021년도 인구수가 약 5,200만 명 되는데 INT 타입을 사용하면 약 43억까지 수용이 가능하므로 INT를 사용함.
| name       | 이름       | VARCHAR(10) | NotNull  | 법적으로 성을 제외한 이름이 5글자로 정해져있어 외국 이름을 고려하여 10글자까지 가능하게 타입을 잡음.
| password   | 비밀번호    | VARCHAR(45) | NotNull  | -
| created_at | 만든시각    | DATETIME    | NotNull  | 값 자동 부여
| updated_at | 수정시각    | DATETIME    | NotNull  | 값 자동 부여
</br>

### Account Table
| column name | 컬럼 이름   | data type   | 제약조건  | 이유     |
| ---------- | -----------| ----------- | -------- |-------- |
| account    | 계좌번호    | BIGINT      | PK       | 최대 20자리까지 표현하는 데이터 타입. |
| balance    | 잔액        | BIGINT      | NotNull  | INT 타입은 42억 9천만 원까지밖에 표현을 못 하여 돈 관련 모든 column은 BIGINT 타입으로 설정.
| created_at | 만든시각    | DATETIME    | NotNull  | 값 자동 부여, 계좌 생성 날짜 기록.
| updated_at | 수정시각    | DATETIME    | NotNull  | 값 자동 부여, Account 테이블 중에서 balance 잔액만이 변동이 되는데 마지막 업데이트 시간을 기록하기 위함.
| userId     | 유저 아이디 | INT         | FK       | -
</br>

### Record Table
| column name   | 컬럼 이름   | data type   | 제약조건  | 이유     |
| ------------ | --------- | ----------- | -------- |-------- |
| account      | 계좌번호    | BIGINT      | PK, FK   | -
| date         | 거래일시    | DATETIME    | PK       | MySQL 에서 account 와 같이 clustered index 를 생각하여 PK 설정.
| recordAmount | 거래금액    | BIGINT      | NotNull  | -
| balance      | 잔액       | BIGINT      | NotNull  | -
| recordType   | 출/입금    | CHAR(2)     | NotNull  | MySQL 환경에서는 enum 타입이지만 SQLite 환경에서는 enum 타입이 불가능하여 '출금', '입금' 2개의 단어만을 받을 수 있는 크기 설정.
| note         | 적요    | VARCHAR(7)   |         | 실제 은행들에서 최대 7글자만 기록한다는 것을 보고 최대 크기를 정함.

<br>
<br>

## API Test 방법

1. 다음 링크로 이동합니다. [swagger 링크](http://ec2-3-36-50-211.ap-northeast-2.compute.amazonaws.com:3000/api/)
2. user 탭의 회원가입, auth 탭의 로그인 요청을 통하여 accessToken을 획득합니다.
- 테스트 위해서 user를 미리 생성했습니다
- {
    "name": "test",
    "password": "testtest123"
  }
- {
    "name": "test2",
    "password": "testtest123"
  }
3. 권한이 필요한 api는 별도의 자물쇠 아이콘이 표기되어 있습니다. 자물쇠 아이콘을 클릭한 후, 로그인 시 획득한 accessToken을 입력하면 해당 api를 요청할 수 있습니다.</br>
<img src="https://user-images.githubusercontent.com/42341135/141495860-824c8656-ce8d-438b-ab5d-0f94768d6b65.PNG" width="500"/> </br>
<br>
<br>


## 📌 구현 기능

<br>
<br>

## 가산점
#### Unit test의 구현

#### Functional Test 의 구현 (입금, 조회, 출금에 대한 시나리오 테스트)

#### 거래내역이 1억건을 넘어갈 때에 대한 고려
- 입력 순서대로 10만건의 데이터가 저장되어 있는 데이터베이스에서 조회 시간 </br>
<img src="https://user-images.githubusercontent.com/61304585/141457063-998c799c-6f49-4fef-83f6-e30bba687c19.png" width="300"/> </br>

- 고려 (1) </br>
<img src="https://user-images.githubusercontent.com/61304585/141457610-9175135a-4bc9-42b5-93d9-25548ef3debf.png" width="300"/> </br>
로컬 PC의 사양이 좋지 않아 1억 건의 테스트는 못 하였지만 10만 건의 데이터를 가지고 테스트 해보았습니다. </br>
클러스터드 인덱스를 활용하려는 생각을 했습니다. 한 계좌의 거래내역 조회는 한 건의 결과가 아닌 해당 계좌의 거의 모든 값을 가져오게 됩니다. </br> 
정렬이 없는 테이블에서 조건에 만족하는 데이터를 찾아 불러오는 것보다 필요한 정보가 모여 정렬되어 있는 곳에서 한 번에 가져오는 것이 성능에서 이점이 있을 거라 생각했습니다. </br>
그렇다면 어떠한 기준으로 정렬할 것인가에 문제가 생기는데  </br>
(계좌번호 / 거래일시 / 거래금액 / 잔액 / 거래종류 / 적요) 중에서 인증 절차를 거쳐야 알 수 있는 정보인 계좌번호를 선택하였고, </br>
PK로 선택한 계좌번호의 중복을 피할 수 없어서 같은 계좌번호로 중복이 나올 수 없는 ‘거래일시’ 를 같이 PK 로 설정하였습니다. </br>
클러스터드 인덱스를 사용하게 되면 삽입, 삭제, 수정 시 재배열 문제가 있을 수 있지만 거래내역에서 삭제, 수정은 이루어지지 않고, 요즘 활성화된 핀테크에서 금융 정보를 제공해 주는 상황이라면  </br>
여러 곳에서의 조회 요청에 대해 빠른 응답을 해줄 수 있는 클러스터 인덱스를 선택하는 것이 더 좋은 결과가 있을 것이라 생각되어 ‘계좌번호’ 와 ‘거래일시’에 PK 값을 사용했습니다.  </br>

고려 (2)

문제: FK는 데이터베이스 유지를 깨끗하게 해주지만 건수가 커질 수록 조회 속도가 매우 느려집니다.
해결: FK를 제거한 entity를 생성하는 방법이 있습니다.
방법: 
1) 아래와 같이 createForeignKeyConstraints를 false으로 해서 FK를 제거합니다.
```
@@ManyToOne(() => Account, { createForeignKeyConstraints: false })
```
2) Index값을 records(거래내역) entity의 "account"와 "date"에 추가했습니다. Index를 추가하면 insert나 delete은 더 느리지만 read할 때는 상대적으로 굉장한 속도를 낼 수 있는 이유는 insert할 때 data를 정리해서 저장하기 때문입니다. 해당 프로젝트 같은 경우는 계좌 번호와 날짜로 정리가 됐습니다.
```
@Index(['account', 'date'])
```



### DB 거래내역 1억건 가정 상황에서 대응

# CQRS를 고려하자!

![](https://images.velog.io/images/42seouler/post/4d3e7e80-09b5-44da-b0df-2119d2f4d911/image.png)

CQRS는 Command and Query Responsibility Segregation(명령과 조회의 책임 분리)을 나타냅니다. 이름처럼 시스템에서 명령을 처리하는 책임과 조회를 처리하는 책임을 분리하는 것이 CQRS의 핵심입니다. 굉장히 단순한 아이디어이지만 명령과 조회를 나누는것이 모호할때도 있고
무엇보다 디비의 동기화가 중요합니다. nestjs의 배치 모듈과 sqlite3의 backup 명령어를 통해 마스터(쓰기) -> 슬레이브(읽기)형식으로
구현하고자 했습니다.

### 무결성 보장을 위한 격리 수준은 SERIALIZABLE!

SQLite의 기본 격리 수준은 SERIALIZABLE입니다. SQLite는 실제로 쓰기를 직렬화하여 직렬화 가능한 트랜잭션을 구현합니다.
격리 수준을 설정하는 것에서 가장 큰 고민과 시간을 들이게 되었습니다. 동시성을 위해 격리 수준을 낮추는 것을 고려해봤지만 금융거래에서 가장 큰 치명적인 이슈를 데이터의 무결성이라고 생각했습니다. 아래와 같은 읽기-쓰기, 쓰기-읽기, 쓰기-쓰기 충돌로 인한 데데이터 무결성이 동시성보다 우선되어야 한다고 생각되어 시리얼라이저블을 선택하게 되었습니다.</br>
<img src="https://images.velog.io/images/42seouler/post/9f252869-8d90-47f5-9f8e-86cb38269c10/image.png" width="500"/> </br>


### DB분산 처리

이번 과제에서는 거래내역 1억건 이상이라는 가정이 있었고 이에 따라 하나의 디비에 데이터를 저장하게 되면 아래와 같은 이슈를 만날 수 있다고 판단 했습니다.
- CRUD속도 
- 용량이슈

요구 사항
- 라우팅 구분을 위해 유저 PK를 샤딩을 위해 사용합니다.</br>

<img src="https://images.velog.io/images/42seouler/post/b93eeec3-1bf7-411b-b1f0-be5423520863/image.png" width="500"/> </br>

모듈러 샤딩을 사용해서 얻게 되는 이점과 단점
- 데이터 균등 분배
- DB추가 증설시 모듈러 연산을 통해 재배치 필요

예측 가능한 범위에서 분산처리 할 데이터베이스를 미리 정하고 그에 따라 안정적으로 분산 저장하고 디비 리소스를 잘 활용 할 수 있습니다. 과제를 위해 유저와 계좌정보를 갖고 있는 마스터 DB와 유저 아이디를 기반으로 한 홀수, 짝수 두개의 디비에 분산 저장하기로 했습니다.

### 분산 저장 된 계좌번호에 Index
아무리 분산 저장되어 하나의 DB에 저장된 데이터가 적다하더라도 결국 검색 과정에서 풀 스캔 하게 됩니다.
하지만 다행히 sqlite는 인덱싱을 지원합니다. 따라서 효율성을 높이기 위해 쿼리 빈도가 높은 필드인 계좌번호에 인덱싱을 했습니다.

### 무결성을 보존하기 위한 로직 </br>
<img src="https://images.velog.io/images/42seouler/post/025b8082-8321-4afd-83a0-f8f9df3b9b6d/image.png" width="500"/> </br>

### 하지만 실제 구현은! </br>
<img src="https://images.velog.io/images/42seouler/post/a41aa83f-399c-40be-8f46-5a8ff2a956fb/image.png" width="500"/> </br>

마스터 트랜잭션 과정 중에 로그를 남기고 그 로그를 통해 입출금 내역의 동기화를 시도하려고 했으나 시간이 부족했습니다.
분산 데이터 저장, 디비격리 수준, 멀티 데이터베이스 설정 등 부족한 지식을 채우면서 정말 이렇게 구현하는게 맞을까? 옳은 판단인지 정보를 수집하고 실험하는데 시간을 사용하게 되었습니다. <br>
CQRS를 적용하기 위해 쓰기 디비에서 읽기 전용을 만들기 위해 sqlite 백업 명렁어를 통해 구현하고자 했는데 일정시간마다 디비 싱크를 맞추기 위한 배치모듈을 만들지 못해서 도입하지 못했습니다.

### 분산 저장 Master: 유저,계좌 A: 홀수 유저 거래내역 B: 짝수 유저 거래내역
![image](https://user-images.githubusercontent.com/77034008/141512446-eeae1abc-af40-4301-8a75-59851ba7eddc.png)
위와 같이 3개의 Sqlite에 3개의 connection을 연결해서 분산 저장이 되고 있습니다. <br>
다른 데이터베이스 간에는 외래키 관계를 사용 할 수 없지만 인덱스를 통해 외래키 처럼 사용 할 수 있습니다.


<br/><br/>

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


3. 서버를 구동합니다.

```bash
$ npm start
```

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

<br/>
<br/>

## Reference

이 프로젝트는 [원티드 프리온보딩 백엔드 코스](https://www.wanted.co.kr/events/pre_onboarding_course_4) 4차 과제 일환으로 8퍼센트에서 출제한 과제를 기반으로 만들었습니다.

2021년 11월 11일(목) 오후 6시 ~ 11월 13일(토) 오전 10시
