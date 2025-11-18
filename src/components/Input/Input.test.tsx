import { fireEvent, render, screen } from '@testing-library/react';
import { Input } from './Input';

/**
 * 테스트 항목
 * 1. Input 컴포넌트 미입력 시 X 버튼이 보이지 않아야 한다.
 * 2. Input 컴포넌트 입력값이 있을 때 X 버튼이 보여야 한다.
 * 3. X 버튼 클릭 시 입력값이 없어져야 한다.
 */

test('Input 컴포넌트 미입력 시 X 버튼이 보이지 않는지 테스트', () => {
  render(<Input />);

  const input = screen.getByRole('textbox');
  const deleteButton = screen.queryByRole('button', { name: '입력값 지우기' });

  // 입력값이 없고,
  expect(input).toHaveValue('');
  // X 버튼이 보이지 않아야 한다.
  expect(deleteButton).not.toBeInTheDocument();
});

test('Input 컴포넌트 입력값 있을 때 X 버튼 보이는지 테스트', () => {
  const defaultValue = '테스트입니다.';

  render(<Input defaultValue={defaultValue} />);

  const input = screen.getByRole('textbox');
  const deleteButton = screen.queryByRole('button', { name: '입력값 지우기' });

  // 입력값이 있고,
  expect(input).toHaveValue(defaultValue);
  // X 버튼이 보여야 한다.
  expect(deleteButton).toBeInTheDocument();
});

test('X 버튼 클릭 시 입력값이 없어지는지 테스트', () => {
  const defaultValue = '테스트입니다.';

  render(<Input defaultValue={defaultValue} />);

  const input = screen.getByRole('textbox');
  const deleteButton = screen.getByRole('button', { name: '입력값 지우기' });

  fireEvent.click(deleteButton);

  // 입력값이 없고,
  expect(input).toHaveValue('');
  // X 버튼이 보이지 않아야 한다.
  expect(deleteButton).not.toBeInTheDocument();
});

test('Input 컴포넌트에 (유효성) 에러 시 에러 메세지가 발생하는지 확인', () => {
  const defaultErrorMsg = '유효하지 않은 메시지입니다.';
  render(<Input isError={true} errorMessage={defaultErrorMsg} />);

  const errorMessage = screen.getByText(defaultErrorMsg);

  expect(errorMessage).toBeInTheDocument();
});
