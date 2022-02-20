// material
import { styled } from '@mui/material/styles';
import { Box, Card, Container, CardHeader, Stack } from '@mui/material';
// routes
import { PATH_PAGE } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
//
import CollapsibleTable from '../../components/amesti/table/collapsible-table';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

export default function TableNestS3() {
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
            heading="Programa Nest disponibles para seleccionar la pieza critica"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'DataGrid' }]}
          />
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Stack spacing={5}>
          <Card>
            <CardHeader title="Programas Nest" />
            <CollapsibleTable />
          </Card>
        </Stack>
      </Container>
    </RootStyle>
  );
}
