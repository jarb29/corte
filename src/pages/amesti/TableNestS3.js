import { useState, useEffect } from 'react';

// material

import { styled } from '@mui/material/styles';
import { Box, Card, Container, CardHeader, Stack } from '@mui/material';
import { getTodosFiles } from '../../redux/slices/todos-api';
// routes
import useAuth from '../../hooks/useAuth';
import { PATH_PAGE } from '../../routes/paths';

import LoadingScreen from '../../components/LoadingScreen';
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
  const { user, token } = useAuth();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const data = await getTodosFiles(token);
      // set state with the result
      setFiles(data);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

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
      {files.length < 0 ? (
        <LoadingScreen size={32} color="info" />
      ) : (
        <Container maxWidth="lg">
          <Stack spacing={5}>
            <Card>
              <CardHeader title="Programas Nest" />
              {files.map((file, id) => (
                <CollapsibleTable key={id} files={file} />
              ))}
            </Card>
          </Stack>
        </Container>
      )}
    </RootStyle>
  );
}
