import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Alert,
  Link,
} from '@mui/material';
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Use same styling as login

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setErrors([]);
    setSuccessMessage('');
  }, [formData, agreeTerms]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errorList: string[] = [];

    if (!formData.email) errorList.push('Email is required.');
    if (!formData.username) errorList.push('Username is required.');
    if (!formData.password) errorList.push('Password is required.');
    if (formData.password !== formData.confirmPassword)
      errorList.push('Passwords do not match.');
    if (!agreeTerms) errorList.push('You must agree to the Terms of Service.');

    if (errorList.length > 0) {
      setErrors(errorList);
      return;
    }

    try {
      await UserService.register({
        email: formData.email,
        password: formData.password,
      });
      setSuccessMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err: any) {
      const message = err.response?.data?.error || 'Registration failed.';
      setErrors([message]);
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
              Register
            </Typography>
            <hr style={{ borderColor: '#2bb673', marginBottom: 24 }} />

            {errors.length > 0 && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errors.map((err, i) => (
                  <div key={i}>{err}</div>
                ))}
              </Alert>
            )}

            {successMessage && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {successMessage}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Email"
              name="email"
              placeholder="name@example.com"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
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
              label="Username"
              name="username"
              placeholder="Username"
              variant="outlined"
              value={formData.username}
              onChange={handleChange}
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
              name="password"
              type="password"
              placeholder="Password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
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
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              variant="outlined"
              value={formData.confirmPassword}
              onChange={handleChange}
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
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  sx={{
                    transform: 'scale(1.5)',
                    color: '#36d286',
                  }}
                />
              }
              label={
                <Typography sx={{ color: 'white' }}>
                  I agree with the{' '}
                  <Link href="/terms-of-service" underline="hover" target="_blank" sx={{ color: '#2bb673' }}>
                    Terms of Service
                  </Link>
                  .
                </Typography>
              }
              sx={{ alignItems: 'center', mt: 1 }}
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!agreeTerms}
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
            Register
          </Button>

          <Box className="form-content">
            <Grid container justifyContent="center" spacing={1}>
              <Link href="/login" underline="hover">
                Already have an account? Log in
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Register;
