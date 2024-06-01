import React from 'react';
import { Box, Flex, Button, Heading, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <Flex as="nav" bg="teal.500" p={4} color="white" align="center">
      <Heading size="lg">Sale Order Management</Heading>
      <Spacer />
      {isAuthenticated && (
        <>
          <ThemeToggle />
          <Button colorScheme="teal" variant="outline" color={'white'} onClick={logout}>
            Logout
          </Button>
        </>
      )}
    </Flex>
  );
};

export default Navbar;
