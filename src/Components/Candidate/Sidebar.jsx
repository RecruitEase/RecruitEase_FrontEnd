// src/components/Sidebar.js
import React from 'react';
import { Box, Typography, Button, TextField, FormControlLabel, Checkbox, FormControl, Select, MenuItem, InputLabel, Chip, OutlinedInput } from '@mui/material';
import { positions } from '@mui/system';


const Sidebar = () => {
  const [industries, setIndustries] = React.useState([]);
  const [jobType, setJobType] = React.useState('');
  const [jobLevel, setJobLevel] = React.useState('');
  const [posted, setPosted] = React.useState('');

  const handleIndustryChange = (event) => {
    setIndustries(event.target.value);
  };

  const handleJobTypeChange = (event) => {
    setJobType(event.target.value);
  };

  const handleJobLevelChange = (event) => {
    setJobLevel(event.target.value);
  };

  const handlePostedChange = (event) => {
    setPosted(event.target.value);
  };

  return (
    <Box sx={{ p: 2, borderRight: '1px solid #e0e0e0', height: '100%' }} >
      <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
        <InputLabel>Industries</InputLabel>
        <Select
          multiple
          value={industries}
          onChange={handleIndustryChange}
          label="Industry"
          input={<OutlinedInput label="Industry" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          <MenuItem value="Information Technology">Information Technology</MenuItem>
          <MenuItem value="Engineering">Engineering</MenuItem>
          <MenuItem value="Healthcare">Healthcare</MenuItem>
          <MenuItem value="Finance">Finance</MenuItem>
          <MenuItem value="Education">Education</MenuItem>
          <MenuItem value="Administration">Administration</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
        <InputLabel>Job Type</InputLabel>
        <Select
          value={jobType}
          onChange={handleJobTypeChange}
          label="Job Type"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Full-Time">Full-Time</MenuItem>
          <MenuItem value="Part-Time">Part-Time</MenuItem>
          <MenuItem value="Contract">Contract</MenuItem>
          <MenuItem value="Temporary">Temporary</MenuItem>
          <MenuItem value="Internship">Internship</MenuItem>
          <MenuItem value="Freelance">Freelance</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
        <InputLabel>Job Level</InputLabel>
        <Select
          value={jobLevel}
          onChange={handleJobLevelChange}
          label="Job Level"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Entry Level">Entry Level</MenuItem>
          <MenuItem value="Mid Level">Mid Level</MenuItem>
          <MenuItem value="Senior Level">Senior Level</MenuItem>
          <MenuItem value="Executive Level">Executive Level</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
        <InputLabel>Posted</InputLabel>
        <Select
          value={posted}
          onChange={handlePostedChange}
          label="Posted"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Last 24 hours">Last 24 hours</MenuItem>
          <MenuItem value="Last 7 days">Last 7 days</MenuItem>
          <MenuItem value="Last 14 days">Last 14 days</MenuItem>
          <MenuItem value="Last 30 days">Last 30 days</MenuItem>
        </Select>
      </FormControl>

      
      <FormControlLabel control={<Checkbox />} label=" Remote/ Work From Home" />

    
    </Box>
  );
};

export default Sidebar;
