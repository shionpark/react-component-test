'use client';

import { Input } from '../Input/Input';

export default function LoginForm() {
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">이메일:</label>
      <input
        id="email"
        type="email"
        placeholder="이메일을 입력하세요"
        data-testid="email-input"
      />
      <Input type="text" name="email" placeholder="이메일" />
      <Input type="password" name="password" placeholder="비밀번호" />
      <button type="submit">로그인</button>
    </form>
  );
}
