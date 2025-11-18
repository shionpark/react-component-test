import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';

test('로그인 폼 렌더링 테스트', () => {
  render(<LoginForm />);

  const emailByLabel = screen.getByLabelText('이메일:');
  const emailByPlaceholder = screen.getByPlaceholderText('이메일을 입력하세요');
  const loginButton = screen.getByRole('button', { name: '로그인' });
  const emailByTestId = screen.getByTestId('email-input');

  expect(emailByLabel).toBeInTheDocument();
  expect(emailByPlaceholder).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
  expect(emailByTestId).toBeInTheDocument();

  expect(emailByLabel).toBe(emailByPlaceholder);
  expect(emailByLabel).toBe(emailByTestId);
});
