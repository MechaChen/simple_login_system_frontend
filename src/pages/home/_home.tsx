import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import CompanyLogo from '../../assets/company-logo.png';

const Home = function Home() {
  return (
    <Box>
      <Stack spacing={2}>
        <Box display="flex" alignItems="center">
          <img src={CompanyLogo} width={60} />
          <Box width={20} />
          <h2>Leading Information System</h2>
        </Box>
        <Typography>Address: 台北市松山區南京東路3段311號6樓</Typography>
        <Typography>Telephone: 02-27170886</Typography>
        <Typography>Industry Type: 電腦軟體服務業</Typography>
        <Typography>Headcount: 45</Typography>
      </Stack>
    </Box>
  );
}

export default Home;
