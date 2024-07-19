import { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import i18next from "i18next";

export default function LanguagesList() {
  const [language, setLanguage] = useState(
    localStorage.getItem("i18nextLng") || "ru"
  );

  function languageSwitcher(event: React.ChangeEvent<{ value: unknown }>) {
    const newLanguage = event.target.value as string;
    i18next.changeLanguage(newLanguage);
    setLanguage(newLanguage);
    localStorage.setItem("i18nextLng", newLanguage);
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <StyledNativeSelect
          value={language}
          onChange={languageSwitcher}
          inputProps={{
            name: "language",
            id: "uncontrolled-native",
          }}
        >
          <CreateOption value="ru" label="Русский" />
          <CreateOption value="en" label="English" />
          <CreateOption value="ua" label="Українська" />
        </StyledNativeSelect>
      </FormControl>
    </Box>
  );
}

interface CreateOptionProps {
  value: string;
  label: string;
}

const CreateOption = ({ value, label }: CreateOptionProps) => {
  return <StyledLanguageOption value={value}>{label}</StyledLanguageOption>;
};

const StyledLanguageOption = styled.option`
  color: ${(props) => props.theme.textColor};

  &:hover {
    background-color: ${(props) => props.theme.backgroundColor};
  }
`;

const StyledNativeSelect = styled(NativeSelect)`
  & .MuiNativeSelect-icon {
    color: ${(props) => props.theme.textColor};
  }
  & .MuiNativeSelect-select {
    color: ${(props) => props.theme.textColor};
  }
`;
