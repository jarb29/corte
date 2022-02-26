import { useState, useEffect, useCallback } from 'react';

// material
import { any } from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box, Card, Container, CardHeader, Stack } from '@mui/material';
import { getTodosFiles, getTodosNest } from '../../redux/slices/todos-api';
// routes

import useAuth from '../../hooks/useAuth';
import { PATH_PAGE } from '../../routes/paths';

import LoadingScreen from '../../components/LoadingScreen';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
//
import CollapsibleTable from '../../components/amesti/table/collapsible-table';
//
import { useDispatch, useSelector } from '../../redux/store';
import { createEvent } from '../../redux/slices/amesti';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

export default function TableNestS3() {
  const { user, token } = useAuth();
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const { load, cantidad, time } = useSelector((state) => state.amesti);

  const fetchData = useCallback(async () => {
    try {
      const response = await getTodosFiles(token);
      const respo = await getTodosNest(token);

      console.log(respo, ' THE NEST SELECTEDDDDDD');
      setFiles(response);
    } catch (error) {
      alert(error.message);
    }
  }, []);

  console.log(cantidad, load, 'CANTIDA');

  useEffect(() => {
    fetchData();
  }, [fetchData, cantidad]);

  useEffect(() => {
    if (load !== 'undefined') {
      const tiempo = load['TIEMPO MECANIZADO NEST (min)'];
      const can = parseInt(cantidad, 10);
      const factor = load.CANTIDAD / can;
      const tiempoEstufa = tiempo / factor;
      const item = {
        load,
        cantidadPlancha: load.CANTIDAD,
        pieza: load['NOMBRE PIEZA'],
        modelo: load.MODELO,
        programa: load['NOMBRE PROGRAMA:'],
        piezasPorEstufa: cantidad,
        tiempo: load['TIEMPO MECANIZADO NEST (min)'],
        folder: load.FOLDER,
        tiempoPorEstufa: tiempoEstufa.toFixed(2)
      };
      dispatch(createEvent(item, token));
    }
  }, [dispatch, cantidad]);

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
      {files.length <= 0 ? (
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
