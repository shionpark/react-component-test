import useInputs from './useInputs';
import { act, renderHook } from '@testing-library/react';
describe('useInputs 훅', () => {
  test('useInputs 훅을 사용하여 입력값을 관리할 수 있다.', () => {
    const { result } = renderHook(() =>
      useInputs({ name: 'email', value: 'test@example.com' })
    );

    expect(result.current.inputs).toEqual({
      name: 'email',
      value: 'test@example.com',
    });
  });

  test('handleChange 함수로 여러 값을 업데이트할 때 올바르게 작동하는지 확인', () => {
    const { result } = renderHook(() => useInputs({ name: '', nickname: '' }));

    const nameEvent = {
      target: { name: 'name', value: '김철수' },
    } as React.ChangeEvent<HTMLInputElement>;

    const nicknameEvent = {
      target: { name: 'nickname', value: '철수' },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChange(nameEvent);
      result.current.handleChange(nicknameEvent);
    });

    expect(result.current.inputs.name).toBe('김철수');
    expect(result.current.inputs.nickname).toBe('철수');
  });

  test('handleDelete 함수가 특정 필드를 올바르게 삭제하는지 확인', () => {
    const { result } = renderHook(() =>
      useInputs({ name: '김철수', nickname: '철수' })
    );

    act(() => {
      result.current.handleDelete('name');
    });

    expect(result.current.inputs.name).toBe('');
    expect(result.current.inputs.nickname).toBe('철수');
  });
});
