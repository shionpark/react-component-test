import { http, HttpResponse } from 'msw';

export type Post = {
  id: number;
  title: string;
  body: string;
};

export const postsHandlers = [
  http.get('http://localhost:4000/posts', () => {
    return HttpResponse.json<Post[]>([
      { id: 1, title: '첫 번째 게시글', body: '내용 1' },
      { id: 2, title: '두 번째 게시글', body: '내용 2' },
    ]);
  }),
  // 상세 데이터 조회
  http.get('http://localhost:4000/posts/:id', ({ params }) => {
    return HttpResponse.json({
      id: Number(params.id),
      title: '첫 번째 게시글',
      body: '내용 1',
    });
  }),
];
