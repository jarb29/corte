import { useState, useEffect, useCallback } from 'react';

// material
import { any } from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box, Grid, Card, Container, CardHeader, Stack } from '@mui/material';
import { getTodosFiles, getTodosNest } from '../../redux/slices/todos-api';
// routes

import useAuth from '../../hooks/useAuth';
import { PATH_PAGE } from '../../routes/paths';

import LoadingScreen from '../../components/LoadingScreen';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
//
import DataGridBasicSelected from '../../components/amesti/data-grid/DataGridBasicSelected';
//
import { useDispatch, useSelector } from '../../redux/store';
import { createEvent } from '../../redux/slices/amesti';
import { GuardarModeloButtom, Tiempo } from '../../components/amesti';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

export default function TableSelectedNest() {
  const { user, token } = useAuth();
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const { load, cantidad, time } = useSelector((state) => state.amesti);

  const fetchData = useCallback(async () => {
    try {
      const respo = await getTodosNest(token);
      setFiles(respo);
    } catch (error) {
      alert(error.message);
    }
  }, []);

  console.log(files, 'FILES INSIDE DataGridBasicSelected');

  useEffect(() => {
    fetchData();
  }, [fetchData, cantidad]);

  const a = files.map((v, idx) => ({ ...v, id: idx }));

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
            heading="Programa Nest disponibles para seleccionar el tiempo"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'DataGrid' }]}
          />
        </Container>
      </Box>
      {files.length <= 0 ? (
        <LoadingScreen size={32} color="info" />
      ) : (
        <Container maxWidth="lg">
          <Stack spacing={5}>
            <Card>
              <CardHeader title="Programas Nest" />
              <Box sx={{ height: 390 }}>
                <DataGridBasicSelected files={a} />
              </Box>
            </Card>
          </Stack>
          <br />
          {time ? (
            <>
              <Card>
                <Tiempo tiempo={time} files={a} />
              </Card>
              <br />
              <Box>
                <GuardarModeloButtom file={a} />
              </Box>
            </>
          ) : null}
        </Container>
      )}
    </RootStyle>
  );
}
