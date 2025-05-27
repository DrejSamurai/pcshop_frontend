import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Alert,
} from '@mui/material';
import { styled } from '@mui/system';
import UserService from '../services/UserService'; 
import { useNavigate } from 'react-router-dom';

const FormContainer = styled(Box)({
  backgroundColor: '#2e323c',
  padding: '60px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  maxWidth: '700px',
  margin: '40px auto',
  minHeight: '600px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const CustomTextField = styled(TextField)({
  backgroundColor: 'lightgray',
  borderRadius: '8px',
  '& .MuiInputBase-root': {
    padding: '15px',
  },
  '& .MuiInputLabel-root': {
    fontWeight: 600,
    fontSize: '14px',
    color: '#495057',
  },
});

const CustomButton = styled(Button)({
  backgroundColor: '#F6A000',
  color: 'white',
  fontSize: '18px',
  padding: '12px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: '#C48000',
  },
});

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setCanSubmit(agreeTerms);
  }, [agreeTerms]);

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

    setErrors(errorList);
    setSuccessMessage('');

    if (errorList.length === 0) {
      try {
        const response = await UserService.register({
          email: formData.email,
          password: formData.password,
        });
        navigate('/login');
      } catch (err: any) {
        const message = err.response?.data?.error || 'Registration failed.';
        setErrors([message]);
      }
    }
  };

  return (
    <FormContainer component="form" onSubmit={handleSubmit}>
      <Box>
        <Typography variant="h4" textAlign="center" color="#F6A000" gutterBottom>
          Register
        </Typography>
        <hr />
        {errors.length > 0 && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            {errors.map((err, i) => (
              <div key={i}>{err}</div>
            ))}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" sx={{ mt: 2, mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} md={6}>
            <CustomTextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
          </Grid>
        </Grid>
      </Box>

      <Box mt={3}>
        <FormControlLabel
          control={
            <Checkbox
              checked={agreeTerms}
              onChange={e => setAgreeTerms(e.target.checked)}
              sx={{ transform: 'scale(1.5)', color: '#F6A000' }}
            />
          }
          label={
            <Typography sx={{ color: 'white', fontSize: 16 }}>
              I agree with the{' '}
              <a href="/terms-of-service" target="_blank" style={{ color: '#F6A000' }}>
                Terms of Service
              </a>
              .
            </Typography>
          }
        />
      </Box>

      <CustomButton
        type="submit"
        variant="contained"
        fullWidth
        disabled={!canSubmit}
        sx={{ mt: 3 }}
      >
        Register
      </CustomButton>
    </FormContainer>
  );
};

export default Register;
