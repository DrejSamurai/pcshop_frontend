import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './styles/header.css'


const navLinks = [
  { label: 'GPU', path: '/gpus' },
  { label: 'CPU', path: '/cpus' },
  { label: 'Motherboard', path: '/motherboards' },
  { label: 'Cooler', path: '/coolers' },
  { label: 'Case', path: '/cases' },
  { label: 'Storage', path: '/storage' },
  { label: 'Memory', path: '/memory' },
   { label: 'Power Supply', path: '/powersupply' },
];

const Header = () => {
  return (
    <AppBar position="static" className="AppBar">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            PCShops
          </Link>
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {navLinks.map((link) => (
            <Button
              key={link.label}
              color="inherit"
              component={Link}
              to={link.path}
              sx={{ textTransform: 'none' }}
            >
              {link.label}
            </Button>
          ))}
        </Box>

        <Box>
          <Button
            variant="contained"
            className="customButton"
            component={Link}
            to="/configure"
            sx={{ textTransform: 'none' }}
          >
            Sign In
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;