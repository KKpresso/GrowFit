import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Link,
  useToast,
} from '@chakra-ui/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius={8} boxShadow="lg">
      <VStack spacing={4}>
        <Heading>Log In</Heading>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              width="100%"
              isLoading={loading}
            >
              Log In
            </Button>
          </VStack>
        </form>
        <Text>
          Need an account?{' '}
          <Link color="blue.500" onClick={() => navigate('/signup')}>
            Sign Up
          </Link>
        </Text>
      </VStack>
    </Box>
  );
}
