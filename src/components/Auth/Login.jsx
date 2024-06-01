import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, FormControl, FormLabel, Heading, Card, CardHeader, CardBody } from '@chakra-ui/react';
import { AuthContext } from '../../context/AuthContext';
import ThemeToggle from '../ThemeToggle';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'user' && password === 'password') {
      login();
      navigate('/active-orders', { replace: true });
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Card maxW="lg" mx="auto" mt={10}>
      <CardHeader>
        <ThemeToggle />
        <Heading size='lg' textAlign={'center'}>Login</Heading>
      </CardHeader>
      <CardBody>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Login
        </Button>
      </form>
      </CardBody>
    </Card>
  );
};

export default Login;
