import React from 'react';
import { Container, Typography } from '@mui/material';
import CrimeReportForm from '../componentcrime/CrimeReportForm';
import HomeButton from '../componentcrime/HomeButton';
import PageTemplate from '../componentcrime/PageTemplate';

function CrimeReport() {
  return (
    <PageTemplate title="Report a Crime">
      <HomeButton />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        {/* <Typography variant="h4" component="h1" gutterBottom align="center">
          Report a Crime
        </Typography> */}
        <CrimeReportForm />
      </Container>
    </PageTemplate>
  );
}

export default CrimeReport; 