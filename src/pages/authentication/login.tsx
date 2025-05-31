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
import UserService from '../../services/UserService'; 
import './Login.css';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email || !password) {
    setError('Please fill in all fields.');
    return;
  }

  try {
    const { token } = await UserService.login({ email, password });

    localStorage.setItem('token', token);

    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    setError('');
    navigate('/')
  } catch (err: any) {
    const message =
      err?.response?.data?.message || 'Invalid email or password.';
    setError(message);
  }
};

  return (
    <div className="login-background">
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          className="custom-form"
          sx={{
            backgroundColor: '#2d2d2f',
            p: 6,
            borderRadius: 2,
            boxShadow: 3,
            maxWidth: 550,
            margin: '0 auto',
            minHeight: 600,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box className="form-content" sx={{ mb: 3 }}>
            <Typography variant="h4" align="center" sx={{ color: '#2bb673', mb: 2 }}>
              Log in
            </Typography>
            <hr style={{ borderColor: '#2bb673', marginBottom: 24 }} />

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
                  backgroundColor: '#2d2d2f',
                  borderRadius: 2,
                
                },
              }}
              InputLabelProps={{
                sx: {
                  fontWeight: 600,
                  fontSize: 14,
                  color: 'white',
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
                  backgroundColor: '#2d2d2f',
                  borderRadius: 2,
        
                },
              }}
              InputLabelProps={{
                sx: {
                  fontWeight: 600,
                  fontSize: 14,
                  color: 'white',
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
                    color: '#36d286',
                  }}
                />
              }
              label={
                <Typography sx={{ color: 'white' }}>
                  Remember me
                </Typography>
              }
              sx={{ alignItems: 'center', mt: 1 }}
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#36d286',
              color: 'white',
              borderRadius: 2,
              py: 1.5,
              '&:hover': {
                backgroundColor: '#2bb673',
              },
            }}
          >
            Log in
          </Button>

          <Box className="form-content" >
            <Grid container justifyContent="center" spacing={1}>
                <Link href="/register" underline="hover">
                  Register as a new user
                </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default LoginPage;