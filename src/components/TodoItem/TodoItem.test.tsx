import { render, screen } from '@testing-library/react';
import TodoItem from './TodoItem';

/**
 * 1. 텍스트 내용 확인
 * 2. 체크박스 체크 여부 & 비활성화 여부 확인
 * 3. 수정 버튼 비활성화 여부 확인
 * 4. 항목에 'completed' 클래스 존재 여부 확인
 */
test('할 일 목록 테스트', () => {
  render(<TodoItem task="할일" completed={true} />);

  // 1.
  const taskText = screen.getByText('할일');
  expect(taskText).toHaveTextContent('할일');

  // 2
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).toBeChecked();
  expect(checkbox).toBeDisabled();

  // 3
  const editBtn = screen.getByRole('button', { name: '수정' });
  expect(editBtn).toBeDisabled();

  // 4
  const li = screen.getByRole('listitem');
  expect(li).toHaveClass('completed');
});
