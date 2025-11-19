## React 컴포넌트 테스트

Next.js 16 + React 19 기반의 컴포넌트 테스트 실습 프로젝트입니다. `axios`로 JSON 서버에서 게시글을 조회하고, Jest/Testing Library/MSW로 UI와 에러 케이스를 검증합니다.

## 기술 스택
- Next.js 16, React 19, TypeScript
- axios
- json-server (로컬 API 모킹)
- Jest 30 + Testing Library + MSW

## 실행 방법
1. **의존성 설치**
   ```bash
   pnpm install
   ```
2. **로컬 API 서버 실행**  
   `db.json`을 기반으로 한 JSON 서버가 필요합니다. 다른 터미널에서 다음 명령을 실행하세요.
   ```bash
   pnpm dlx json-server --watch db.json --port 4000
   ```
3. **Next.js 개발 서버 실행**
   ```bash
   pnpm dev
   ```
   브라우저에서 http://localhost:3000 에 접속하면 `/posts/1` 응답이 화면에 표시됩니다.  
   *만약 “데이터를 불러오는데 실패했습니다” 문구가 보인다면 JSON 서버가 켜져 있는지 확인하세요.*

## 테스트
Jest 환경에서 MSW 서버를 자동으로 구동하도록 `jest.setup.ts`에 설정해 두었습니다.  
```bash
pnpm test
```
테스트 중에는 `server.use(...)`로 개별 API 응답을 덮어쓰며 에러/성공 케이스를 검증합니다.

> **참고**  
> pnpm의 `.pnpm/` 디렉터리 구조 때문에, `msw`가 의존하는 ESM 모듈(`until-async`)이 트랜스폼 대상에서 제외되지 않도록 `jest.config.ts`의 `transformIgnorePatterns`를 재정의했습니다.
