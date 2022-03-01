// material
import { styled } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
import AnalyticsTime from '../../components/amesti/AnalyticsTime';
// routes

import { PATH_PAGE } from '../../routes/paths';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
//

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

export default function AnalyticsTimePage() {
  return (
    <RootStyle title="Components: Table | Minimal-UI">
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
            heading="Tiempo/Estufa"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'DataGrid' }]}
          />
        </Container>
      </Box>
      <Container maxWidth="lg">
        <AnalyticsTime />
      </Container>
    </RootStyle>
  );
}
