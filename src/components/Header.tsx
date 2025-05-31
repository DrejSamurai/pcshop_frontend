import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './styles/header.css';
import { useEffect, useState } from 'react';

import gpuIcon from '../assets/gpu.png';
import cpuIcon from '../assets/cpu.png';
import motherboardIcon from '../assets/motherboard.png';
import coolerIcon from '../assets/cooler.png';
import caseIcon from '../assets/case.png';
import storageIcon from '../assets/storage.png';
import memoryIcon from '../assets/ram.png';
import powersupplyIcon from '../assets/power supply.png';
import buildIcon from '../assets/pc-build.png';
import ThemeToggleButton from './ThemeToggleButton';
import logo from '../assets/logo.png';

const navLinks = [
  { label: 'GPU', path: '/gpu' },
  { label: 'CPU', path: '/cpu' },
  { label: 'Motherboard', path: '/motherboard' },
  { label: 'Cooler', path: '/cooler' },
  { label: 'Case', path: '/case' },
  { label: 'Storage', path: '/hard-drive' },
  { label: 'Memory', path: '/ram' },
  { label: 'Power Supply', path: '/power-supply' },
];

const iconMap: Record<string, string> = {
  gpu: gpuIcon,
  cpu: cpuIcon,
  motherboard: motherboardIcon,
  cooler: coolerIcon,
  case: caseIcon,
  storage: storageIcon,
  memory: memoryIcon,
  powersupply: powersupplyIcon,
  buildcomputer: buildIcon, // 🔧 Add this line
};

const getIconSrc = (label: string): string | undefined => {
  return iconMap[label.replace(/\s+/g, '').toLowerCase()];
};

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const authenticatedLinks = [
    ...navLinks,
    { label: 'Build Computer', path: '/pcbuilder' }, 
  ];

  return (
    <AppBar position="static" className="AppBar">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="PCShops Logo" style={{ height: 65, width: 200 }} />
        </Link>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {(isLoggedIn ? authenticatedLinks : navLinks).map((link) => {
            const iconSrc = getIconSrc(link.label);
            return (
              <Button
                key={link.label}
                color="inherit"
                component={Link}
                to={link.path}
                sx={{
                  textTransform: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                {iconSrc && (
                  <img
                    src={iconSrc}
                    alt={link.label}
                    style={{
                      width: 50,
                      height: 50,
                      objectFit: 'contain',
                      filter: 'invert(1) sepia(1) saturate(5) hue-rotate(180deg)',
                    }}
                  />
                )}
                {link.label}
              </Button>
            );
          })}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ThemeToggleButton />
          {isLoggedIn ? (
            <Button
              variant="contained"
              className="customButton"
              onClick={handleLogout}
              sx={{ textTransform: 'none' }}
            >
              Log Out
            </Button>
          ) : (
            <Button
              variant="contained"
              className="customButton"
              component={Link}
              to="/login"
              sx={{ textTransform: 'none' }}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
