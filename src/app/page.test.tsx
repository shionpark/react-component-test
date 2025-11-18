import Home from '@/app/page';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Home 페이지 테스트', () => {
  test('메인 페이지가 제대로 렌더링되는지 테스트', () => {
    render(<Home />);

    const element = screen.getByText('Count: 0');
    expect(element).toBeInTheDocument();
  });

  test('증가 버튼 클릭 시 카운트가 증가하는지 확인', () => {
    render(<Home />);

    const incrementBtn = screen.getByRole('button', { name: '증가' });

    fireEvent.click(incrementBtn);

    const element = screen.getByText('Count: 1');
    expect(element).toBeInTheDocument();
  });

  test('감소 버튼 클릭 시 카운트가 감소하는지 확인', () => {
    render(<Home />);

    const decrementBtn = screen.getByRole('button', { name: '감소' });

    fireEvent.click(decrementBtn);

    const element = screen.getByText('Count: -1');
    expect(element).toBeInTheDocument();
  });
});
