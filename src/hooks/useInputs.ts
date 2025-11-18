import { useState } from 'react';

export default function useInputs<T extends Record<string, unknown>>(
  initialValue: T
) {
  const [inputs, setInputs] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleDelete = (name: keyof T) => {
    setInputs({ ...inputs, [name]: '' });
  };

  return { inputs, handleChange, handleDelete };
}
