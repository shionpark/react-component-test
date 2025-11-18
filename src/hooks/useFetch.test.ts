import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from './useFetch';

describe('useFetch 훅', () => {
  test('useFetch 훅을 사용하여 데이터를 가져올 수 있다.', async () => {
    const mockData = { name: 'Test Data' };
    const url = 'https://jsonplaceholder.typicode.com/posts';

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { result } = renderHook(() => useFetch<typeof mockData>(url));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(mockData);
      expect(result.current.error).toBeNull();
      expect(global.fetch).toHaveBeenCalledWith(url);
    });
  });

  describe('useFetch 훅을 사용하여 에러 처리가 잘 되는지 확인', () => {
    test('fetch는 성공했으나 response.ok가 false인 경우', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 404,
      });

      const { result } = renderHook(() =>
        useFetch('https://api.example.com/data')
      );

      // 로딩 상태가 변경되었는가
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // fetch 실패하여 data는 null, error는 에러 메시지를 반환
      expect(result.current.data).toBeNull();
      expect(result.current.error).toBe('네트워크 응답이 정상적이지 않습니다.');
    });

    test('네트워크 에러 시 error 상태가 업데이트 되는지 확인', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error());

      const { result } = renderHook(() =>
        useFetch('https://api.example.com/data')
      );

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
    });
  });
});
