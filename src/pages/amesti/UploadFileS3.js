// material
import { styled } from '@mui/material/styles';
import { Box, Grid, Container } from '@mui/material';
// components

import { PATH_PAGE } from '../../routes/paths';
// components
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

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
      <Box
        sx={{
          pt: 6,
          pb: 1,
          mb: 10,
          bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800')
        }}
      >
        <Container maxWidth="lg">
          <HeaderBreadcrumbs
            heading="Cargue los archivos que desea analizar"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'DataGrid' }]}
          />
        </Container>
      </Box>

      <Grid item xs={12} md={6}>
        <UploadS3 />
      </Grid>
    </RootStyle>
  );
}
