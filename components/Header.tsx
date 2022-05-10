import React, { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';

interface props {
  activeDarkMode: (value: boolean) => void;
}

const Header:React.FC<props> = ({ activeDarkMode }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    activeDarkMode(darkMode);
  }, [darkMode])

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Covid-19 Dataset
        </Typography>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => setDarkMode(!darkMode)}
        >
          { darkMode ? <LightModeIcon /> : <NightsStayIcon /> }
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
