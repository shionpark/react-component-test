import { fireEvent, render, screen } from '@testing-library/react';
import { LoginButton } from './LoginButton';
import { AuthContext, AuthProvider } from '@/contexts/AuthContext';

describe('LoginButton 테스트', () => {
  test('인증되지 않은 경우 로그인 버튼이 렌더링되는지 확인', () => {
    render(
      <AuthProvider>
        <LoginButton />
      </AuthProvider>
    );

    const loginButton = screen.getByRole('button', {
      name: '로그인',
    });

    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveClass('bg-blue-500');
  });

  test('인증이 된 경우에는 로그아웃 버튼이 렌더링되는지 확인', () => {
    render(
      <AuthContext.Provider
        value={{ isAuthenticated: true, login: jest.fn(), logout: jest.fn() }}
      >
        <LoginButton />
      </AuthContext.Provider>
    );

    const loginButton = screen.getByRole('button', {
      name: '로그인',
    });

    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveClass('bg-red-500');
  });

  test('로그인 버튼 클릭 시 로그인 함수가 호출이 되는지 확인', () => {
    const authValue = {
      isAuthenticated: false,
      login: jest.fn(),
      logout: jest.fn(),
    };

    render(
      <AuthContext.Provider value={authValue}>
        <LoginButton />
      </AuthContext.Provider>
    );

    const loginButton = screen.getByRole('button', { name: '로그인' });
    fireEvent.click(loginButton);

    expect(authValue.login).toHaveBeenCalled();
  });
});
