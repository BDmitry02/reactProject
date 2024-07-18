import { useDispatch, useSelector } from "react-redux";
import ThemeSwitch from "../ThemeSwitch";
import { activeThemeChanged } from "../../../store/slices/ThemeSlice";
import { RootState } from "../../../store/store";

function Theme() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(activeThemeChanged(newTheme));
  };

  return <ThemeSwitch onClick={toggleTheme} checked={theme === "dark"} />;
}

export default Theme;
