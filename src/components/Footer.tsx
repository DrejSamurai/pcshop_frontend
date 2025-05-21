import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#19181a',
        color: 'white',
        textAlign: 'center',
        py: 2,
        mt: 'auto',
      }}
    >
      <Typography variant="body2">
        Diplomski Trud 2025
      </Typography>
    </Box>
  );
};

export default Footer;