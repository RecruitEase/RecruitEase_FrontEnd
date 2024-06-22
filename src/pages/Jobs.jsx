import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Sidebar from '../Components/Candidate/Sidebar';
import JobList from '../Components/Candidate/JobList';




export default function Jobs() {


  return (
    <Container maxWidth="lg">
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} md={9}>
        <JobList />
      </Grid>
    </Grid>
  </Container>
  );
}
