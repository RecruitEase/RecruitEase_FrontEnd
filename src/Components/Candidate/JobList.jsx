// src/components/JobList.js
import React from 'react';
import { Box, Typography, Grid, FormControl, Select, MenuItem } from '@mui/material';
import JobCard from './JobCard';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';


const JobList = () => {
    const [location, setLocation] = React.useState('');

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const jobs = [
    {
      title: 'Assistant Operations Manager | On Site - Colombo',
      company: 'Outer Space (Private) Limited',
      location: 'Colombo, Western Province',
      type: 'Full-Time',
      daysLeft: 4,
    },
    {
      title: 'Digital Media / Administration Executive',
      company: 'Dewan Consultants Sri Lanka',
      location: 'Colombo, Western Province',
      type: 'Full-Time',
      daysLeft: 4,
    },
    {
      title: 'Manager - Talent Development | Colombo',
      company: 'Anunine Holdings',
      location: 'Colombo, Western Province',
      type: 'Full-Time',
      daysLeft: 5,
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
        <Box display="flex" alignItems="center" sx={{ mb: 3, backgroundColor: 'white', p: 1, borderRadius: '4px', boxShadow: 1 }}>
      <TextField
        variant="outlined"
        placeholder="I'm looking for... (Eg: Job title, Position, Company)"
        sx={{ flex: 1, mr: 2 }}
      />
      <FormControl variant="outlined" sx={{ mr: 2, minWidth: 120 }}>
        <InputLabel>Location</InputLabel>
        <Select
          value={location}
          onChange={handleLocationChange}
          label="Location"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'Colombo'}>Colombo</MenuItem>
          <MenuItem value={'Western Province'}>Western Province</MenuItem>
          {/* Add more locations as needed */}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="success"
        endIcon={<SearchIcon />}
      >
        SEARCH
      </Button>
    </Box>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
      
        <Typography variant="h6">333 Jobs Found</Typography>
        <Box>
          <FormControl variant="outlined" sx={{ mr: 2 }}>
            <Select defaultValue="recent">
              <MenuItem value="recent">Recent</MenuItem>
              {/* Add more sorting options here */}
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <Select defaultValue={20}>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              {/* Add more pagination options here */}
            </Select>
          </FormControl>
        </Box>
      </Grid>
      {jobs.map((job, index) => (
        <JobCard key={index} job={job} />
      ))}
    </Box>
  );
};

export default JobList;
