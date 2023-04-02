import { useTranslation } from "react-i18next";
import { Select, MenuItem, useMediaQuery, useTheme } from "@mui/material";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const onClickLanguageChange = (e: any) => {
    const language = e.target.value;
    i18n.changeLanguage(language);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "260px",
        display: "flex",
        zIndex: 1000,
      }}
    >
      <Select
        label="Language"
        defaultValue="en"
        onChange={onClickLanguageChange}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="hu">Magyar</MenuItem>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
