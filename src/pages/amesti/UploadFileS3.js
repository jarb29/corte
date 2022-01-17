// material
import { styled } from '@mui/material/styles';
import { Box, Grid, Container } from '@mui/material';
// components

import { Block } from './Block';

// import { Box, Grid, Checkbox, Container, TextField, Typography, Autocomplete } from '@mui/material';
import Page from '../../components/Page';
import { NameUploadFileS3, UploadS3 } from '../../components/amesti';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11)
  }
}));

// ----------------------------------------------------------------------

export default function UploadFileS3() {
  return (
    <RootStyle title="Upload File S3">
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <NameUploadFileS3 />
          </Grid>
          <Grid item xs={12} md={6}>
            <UploadS3 />
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
