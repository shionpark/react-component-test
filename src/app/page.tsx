'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Post } from '@/mocks/handlers/posts';

export default function Home() {
  const [data, setData] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/posts/1');
        setData(response.data);
      } catch {
        setError('데이터를 불러오는데 실패했습니다.');
      }
    };
    fetchData();
  }, []);

  return (
    <ul>
      {data && (
        <li key={data.id} className="border p-4">
          <h3 className="font-bold">
            {data.id}: {data.title}
          </h3>
          <p>{data.body}</p>
        </li>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </ul>
  );
}
