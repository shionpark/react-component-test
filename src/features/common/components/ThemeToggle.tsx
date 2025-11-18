import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const isLightMode = theme === 'light';

  const buttonStyle = isLightMode
    ? 'rounded-md bg-gray-200 px-4 py-2 text-black hover:bg-gray-300'
    : 'rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-900';

  return (
    <div className="p-4">
      <button onClick={toggleTheme} className={buttonStyle}>
        {isLightMode ? '다크 모드로 전환' : '라이트 모드로 전환'}
      </button>
    </div>
  );
};
