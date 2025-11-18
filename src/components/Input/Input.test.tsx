import { fireEvent, render, screen } from '@testing-library/react';
import { Input } from './Input';
import { useState } from 'react';

test('X 버튼 클릭 시 onDelete props에 전달된 함수가 호출되는지 확인한다.', () => {
  const onDelete = jest.fn();
  render(<Input value="입력값" onChange={jest.fn()} onDelete={onDelete} />);

  const deleteButton = screen.getByRole('button', { name: '입력값 지우기' });

  // X 버튼 클릭
  fireEvent.click(deleteButton);

  // onDelete 함수가 호출된다.
  expect(onDelete).toHaveBeenCalled();
});

test('X 버튼 클릭 시 입력값이 지워지는지 확인한다', () => {
  // 삭제 기능을 테스트하기 위해 Wrapper 컴포넌트를 생성
  const Wrapper = () => {
    const [value, setValue] = useState('입력값');
    const handleDelete = () => setValue('');

    return (
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onDelete={handleDelete}
      />
    );
  };
  render(<Wrapper />);

  const input = screen.getByRole('textbox');
  const deleteButton = screen.getByRole('button', { name: '입력값 지우기' });

  // X 버튼 클릭
  fireEvent.click(deleteButton);

  // 입력값이 지워지고,
  expect(input).toHaveValue('');
  // X 버튼이 사라진다.
  expect(deleteButton).not.toBeInTheDocument();
});
