// src/components/JobCard.js
import React from 'react';
import { Box, Typography, IconButton, Grid } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const JobCard = ({ job }) => {
  return (
    <Box sx={{ p: 2, mb: 2, border: '1px solid #e0e0e0', borderRadius: '4px' }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h6">{job.title}</Typography>
          <Typography>{job.company}</Typography>
          <Typography>{job.location}</Typography>
          <Typography>{job.type}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton>
            <BookmarkIcon />
          </IconButton>
          <Box display="flex" alignItems="center">
            <AccessTimeIcon />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {job.daysLeft} days left
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default JobCard;
