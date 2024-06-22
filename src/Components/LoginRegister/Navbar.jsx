import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from 'react-router-dom';
import { useState } from 'react';



function Navbar() {
    const [alignment, setAlignment] = React.useState('web');
    const [user, setUser] = React.useState('candidate');

    const handleChange = (event, newAlignment) => {
      setAlignment(newAlignment);
    };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClickedCandidate = () => {
    setUser('candidate');
    setAnchorElUser(null);
  };

const CandidateMenu = () => {
  return (
    <>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
          
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Jobs</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Contact Us</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">About Us</Typography>
                </MenuItem>
           
            </Menu>
          </Box>
 
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        
              <Button
              
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
               Home
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Jobs
              </Button>

              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Contact Us
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                About Us
              </Button>

         
          </Box>

          </>
  );
};

const RecruiterMenu = () => {
  return (
    <>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
          
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">FEWA</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">qwF</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">erag</Typography>
                </MenuItem>
           
            </Menu>
          </Box>
 
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        
              <Button
              
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
               Home
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Pricing
              </Button>

              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Features
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                contact us
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                About us
              </Button>

         
          </Box>

          </>
  );
};

const toggleCandidate = () => {
  return (
    <>
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="Login" component={Link} to="/candidate/login">Login</ToggleButton>
      <ToggleButton value="Register" component={Link} to="/candidate/register">Register</ToggleButton>

    </ToggleButtonGroup>
    </>
  );
};

const toggleRecruiter = () => {
  return (
    <>
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="Login" component={Link} to="/recruiter/login">Login</ToggleButton>
      <ToggleButton value="Register" component={Link} to="/recruiter/register">Register</ToggleButton>

    </ToggleButtonGroup>
    </>
  );
};
  

  return (
    <>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
         
         {user === 'candidate' ? <CandidateMenu /> : <RecruiterMenu />}


          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            RecruitEase
          </Typography>
          <ButtonGroup variant="contained" aria-label="Basic button group">
      <Button
        onClick={handleClickedCandidate}
        sx={{ color: 'white' }}
        component={Link}
        to="/candidate/login"
      
      >Candidate</Button>
      <Button
        onClick={() => setUser('recruiter')}
        sx={{ color: 'white' }}
        component={Link}
        to="/recruiter/login"
      >Recruiter</Button>
    </ButtonGroup>
        </Toolbar>
      </Container>

    </AppBar>
    
  
    <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  marginTop="20px"
>
  {user === 'candidate' ? toggleCandidate() : toggleRecruiter()}
</Box>
    </>
  );
}
export default Navbar;