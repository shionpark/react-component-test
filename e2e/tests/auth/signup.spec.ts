import { test, expect } from '@playwright/test';

test.describe('회원가입 페이지 E2E 테스트', () => {
  test('회원가입 페이지가 올바르게 로드되는지 확인', async ({ page }) => {
    // 회원가입 페이지로 이동
    await page.goto('/auth/signup');
    const heading = page.getByRole('heading', { name: '회원가입 페이지' });
    await expect(heading).toBeVisible();
  });
});
