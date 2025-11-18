'use client';

import { useFetch } from '@/hooks/useFetch';

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export default function Home() {
  const { data, error, loading } = useFetch<Post[]>(
    'https://jsonplaceholder.typicode.com/posts'
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="flex h-screen items-center justify-center">
      <ul>
        {data?.map((post) => (
          <li key={post.id} className="mb-4">
            <h2 className="text-lg font-bold">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
