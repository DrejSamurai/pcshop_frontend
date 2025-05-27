import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Link,
  Alert,
} from '@mui/material';
import UserService from '../services/UserService'; // Adjust the path as necessary

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const { token } = await UserService.login({ email, password });

      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }

      setError('');
      window.location.href = '/'; 
    } catch (err: any) {
      const message =
        err?.response?.data?.message || 'Invalid email or password.';
      setError(message);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="custom-form"
        sx={{
          backgroundColor: '#2e323c',
          p: 6,
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: 700,
          margin: '0 auto',
          minHeight: 600,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box className="form-content" sx={{ mb: 3 }}>
          <Typography variant="h4" align="center" sx={{ color: '#F6A000', mb: 2 }}>
            Log in
          </Typography>
          <hr style={{ borderColor: '#F6A000', marginBottom: 24 }} />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Email"
            placeholder="name@example.com"
            variant="outlined"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              sx: {
                backgroundColor: 'lightgray',
                borderRadius: 2,
                fontSize: 16,
              },
            }}
            InputLabelProps={{
              sx: {
                fontWeight: 600,
                fontSize: 14,
                color: '#495057',
              },
            }}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Password"
            placeholder="Password"
            variant="outlined"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              sx: {
                backgroundColor: 'lightgray',
                borderRadius: 2,
                fontSize: 16,
              },
            }}
            InputLabelProps={{
              sx: {
                fontWeight: 600,
                fontSize: 14,
                color: '#495057',
              },
            }}
            sx={{ mb: 3 }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                sx={{
                  transform: 'scale(1.5)',
                  color: '#F6A000',
                }}
              />
            }
            label={
              <Typography sx={{ fontSize: 16, color: 'white' }}>
                Remember me
              </Typography>
            }
            sx={{ alignItems: 'center', mt: 2 }}
          />
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: '#F6A000',
            color: 'white',
            fontSize: 18,
            borderRadius: 2,
            py: 1.5,
            '&:hover': {
              backgroundColor: '#C48000',
            },
          }}
        >
          Log in
        </Button>

        <Box className="form-content" sx={{ mt: 3 }}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Link href="/forgot-password" underline="hover" sx={{ color: '#F6A000', fontSize: 16 }}>
                Forgot your password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" underline="hover" sx={{ color: '#F6A000', fontSize: 16 }}>
                Register as a new user
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
