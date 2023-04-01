import { useTranslation } from "react-i18next";
import { Select, MenuItem, useMediaQuery, useTheme } from "@mui/material";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const theme = useTheme();

  const Mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const onClickLanguageChange = (e: any) => {
    const language = e.target.value;
    i18n.changeLanguage(language);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "50px",
        left: 0,
        display: "flex",
        zIndex: 1000,
      }}
    >
      <Select
        label="Language"
        defaultValue="en"
        onChange={onClickLanguageChange}
        sx={{ mr: Mobile ? 1 : 0 }}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="hu">Magyar</MenuItem>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
