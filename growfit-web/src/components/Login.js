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
  useToast as useChakraToast,
} from '@chakra-ui/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useChakraToast();

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setLoading(true);
      const userCredential = await login(email, password);
      console.log('Login successful:', userCredential.user.email);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error.code);
      
      let errorMessage;
      let showSignUpLink = false;
      
      if (error.code === 'auth/invalid-credential') {
        errorMessage = 'No account found with this email.';
        showSignUpLink = true;
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
        showSignUpLink = true;
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else {
        errorMessage = 'Failed to log in. Please try again.';
      }
      
      toast({
        title: showSignUpLink ? 'Account Not Found' : 'Login Error',
        description: (
          <Text>
            {errorMessage}
            {showSignUpLink && (
              <>
                <br />
                <Link color="blue.500" onClick={() => navigate('/signup')}>
                  Click here to create an account
                </Link>
              </>
            )}
          </Text>
        ),
        status: 'info',
        duration: 7000,
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
