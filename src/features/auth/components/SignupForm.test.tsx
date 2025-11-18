import { fireEvent, render, screen } from '@testing-library/react';
import { SignupForm } from './SignupForm';

test('회원가입 버튼 클릭시 콘솔로그 출력?', () => {
  render(<SignupForm />);

  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  const signupForm = screen.getByRole('form');
  fireEvent.submit(signupForm);

  expect(consoleSpy).toHaveBeenCalledWith('회원가입!');

  consoleSpy.mockRestore();
});

test('이메일, 비번, 확인 비번 입력후 제출 이벤트 테스트', () => {
  render(<SignupForm />);

  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

  const emailInput = screen.getByLabelText('이메일');
  const pwInput = screen.getByLabelText('비밀번호');
  const confirmPwInput = screen.getByLabelText('비밀번호 확인');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(pwInput, { target: { value: 'password123' } });
  fireEvent.change(confirmPwInput, { target: { value: 'password123' } });

  // 제출 이벤트 발생
  const signupForm = screen.getByRole('form');
  fireEvent.submit(signupForm);

  expect(alertSpy).toHaveBeenCalledWith('test@example.com님 반갑습니다.');

  alertSpy.mockRestore();
});
