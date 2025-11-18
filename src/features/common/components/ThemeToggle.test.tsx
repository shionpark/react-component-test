import { ThemeContext, ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from './ThemeToggle';
import { fireEvent, render, screen } from '@testing-library/react';

describe('ThemeToggle 테스트', () => {
  test('라이트 모드 버튼 초기 렌더링', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    expect(screen.getByText('다크 모드로 전환')).toBeInTheDocument();
  });

  test('다크 모드 버튼 초기 렌더링', () => {
    render(
      <ThemeContext value={{ theme: 'dark', toggleTheme: jest.fn() }}>
        <ThemeToggle />
      </ThemeContext>
    );
    expect(screen.getByText('라이트 모드로 전환')).toBeInTheDocument();
  });

  test('다크 모드 버튼 클릭 시 라이트 모드로 전환', async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const toggleButton = screen.getByText('다크 모드로 전환');

    fireEvent.click(toggleButton);

    expect(screen.getByText('라이트 모드로 전환')).toBeInTheDocument();
  });
});
