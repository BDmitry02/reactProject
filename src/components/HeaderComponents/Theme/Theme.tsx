import { useAppDispatch, useAppSelector } from '../../../utils/store/hook';
import ThemeSwitch from './ThemeSwitch';
import { activeThemeChanged } from '../../../utils/store/slices/ThemeSlice';

function Theme() {
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(activeThemeChanged(newTheme));
  };

  return <ThemeSwitch onClick={toggleTheme} checked={theme === 'dark'} />;
}

export default Theme;
