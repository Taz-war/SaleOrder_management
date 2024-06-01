import React from 'react';
import { useColorMode, IconButton } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle theme"
      icon={colorMode === 'light' ? <MoonIcon color={'black'} /> : <MoonIcon color={'white'}/>}
      onClick={toggleColorMode}
      m={2}
      zIndex="overlay"
    />
  );
};

export default ThemeToggle;
