import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import createEmotionCache from '../utility/createEmotionCache';
import lightThemeOptions from '../styles/theme/lightThemeOptions';
import darkThemeOptions from '../styles/theme/darkThemeOptions';
import '../styles/globals.css';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

const darkTheme = createTheme(darkThemeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [darkMode, setDarkMode] = useState(false);
  const activeDarkMode = (value: boolean) => setDarkMode(value);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={ darkMode ? darkTheme : lightTheme }>
        <CssBaseline />
        <Component {...pageProps} activeDarkMode={activeDarkMode} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
