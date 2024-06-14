import React from 'react'
import './ApplyJob.css'
import { Link } from 'react-router-dom';
import { Container, TextField } from '@mui/material'
import Box from '@mui/material/Box';
import Button from '@mui/joy/Button';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import DragAndDropZone from './DragAndDropZone/DragAndDropZone';
import EnterCoverLetter from './EnterCoverLetter';
import MenuLink from '../Header/MenuLink';

function ApplyJob() {
  return (
    <>
      <div id="container" className='div-margins'>
        <div id="leftContainer">
          <div>
            <h2 style={{ color: 'rgb(60, 60, 60)' }}>Apply for this job</h2>
            <p>Please fill in your details below, then click 'Apply' button to submit your application. Your application will be treated with absolute confidentiality.</p>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                id="outlined-required"
                label="Full Name"
                defaultValue=""
                margin="normal"
              />
              <TextField
                required
                id="outlined-required"
                label="Email"
                defaultValue=""
                margin="normal"
              />
            </Box>
          </div>
          <div >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <h6>CV*</h6>
              <p style={{ maxWidth: '50%' }}>Please note, current CV displayed on the left will be sent to the recruiter when you hit the apply button. Once the application is sent out, the CV cannot be changed or updated. Please send out the latest CV available.</p>
              < DragAndDropZone />
            </div>
          </div>

          <div>
            <h6>Cover Letter(Optional)</h6>
            <EnterCoverLetter />
            <p className="text-center justify-center mx-10 my-10 text-xs">Please make sure to complete the 'questionnaire' at the next stage of application. We recommend the jobseekers to have two working phone numbers on the CV.</p>
          </div>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }} className=' justify-center'>
            {/* <Link to="/screening" style={{ textDecoration: 'none' }}> */}
            <Button endDecorator={<KeyboardArrowRight />} className=' bg-green-300'>
              Apply For Job
            </Button>
            {/* </Link> */}
            <MenuLink url="/jobs/screening" urlText="screening" />
          </Box>

        </div>
      </div >
    </>

  )
}

export default ApplyJob
