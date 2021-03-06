import { useEffect } from 'react';

// material
import { styled } from '@mui/material/styles';
import { Box, Card, Container, CardHeader, Stack } from '@mui/material';
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
import { createEvent, getTodosFilestRedux, getTodosNest, hasCantidad } from '../../redux/slices/amesti';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

export default function TableNestS3() {
  const { token } = useAuth();
  const dispatch = useDispatch();
  const { load, cantidad, filesRedux } = useSelector((state) => state.amesti);

  console.log(cantidad, 'the cantidad');
  useEffect(() => {
    if (cantidad > 0) {
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
      dispatch(hasCantidad(0));
    }
  }, [dispatch, cantidad, load, token]);

  useEffect(() => {
    dispatch(getTodosFilestRedux(token));
  }, [dispatch, cantidad, token]);

  useEffect(() => {
    dispatch(getTodosNest(token));
  }, [dispatch, cantidad, token]);

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
      {filesRedux.length <= 0 ? (
        <LoadingScreen size={32} color="info" />
      ) : (
        <Container maxWidth="lg">
          <Stack spacing={5}>
            <Card>
              <CardHeader title="Programas Nest" />
              {filesRedux.map((file, id) => (
                <CollapsibleTable key={id} files={file} />
              ))}
            </Card>
          </Stack>
        </Container>
      )}
    </RootStyle>
  );
}
