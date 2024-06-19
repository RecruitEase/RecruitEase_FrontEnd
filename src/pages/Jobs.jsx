import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(244, 244, 244)',
      dark: '#0066CC',
    },
  },
  typography: {
    body2: {
      fontSize: 14,
    },
  },
});

export default function Jobs() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={5}>
          <Grid item xs={2}>
            <Box
              sx={{
                width: '100%',
                height: 100,
                borderRadius: 1,
                margin: 1,
                bgcolor: 'primary.main',
               
              }}
            >
              <Box sx={{ minWidth: 120 }}
              width={9/10}
              >
                <FormControl
                margin='normal'
                fullWidth
                >
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Item>xs=3</Item>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
