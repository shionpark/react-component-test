import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jest-fixed-jsdom',
  // 테스트 전에 실행할 설정 파일을 지정
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

const jestConfig = async () => {
  const nextConfig = await createJestConfig(config)();

  // Allow Jest to transform ESM-only packages from MSW (pnpm installs them under .pnpm)
  nextConfig.transformIgnorePatterns = [
    '/node_modules/(?!.pnpm)(?!(geist|msw|@mswjs|@open-draft|until-async)/)',
    '/node_modules/.pnpm/(?!(geist|msw|until-async|@mswjs\\+[^/]+|@open-draft\\+[^/]+)@)',
    '^.+\\.module\\.(css|sass|scss)$',
  ];

  return nextConfig;
};

export default jestConfig;
