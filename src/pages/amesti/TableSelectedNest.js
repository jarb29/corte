import { useEffect } from 'react';

// material
import { styled } from '@mui/material/styles';
import { Box, Grid, Card, Container, CardHeader, Stack } from '@mui/material';
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
import { useSelector, useDispatch } from '../../redux/store';
import { GuardarModeloButtom, Tiempo } from '../../components/amesti';
import { createEvent, getTodosFilestRedux, getTodosNest } from '../../redux/slices/amesti';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

export default function TableSelectedNest() {
  const { token } = useAuth();
  const { cantidad, time, load, filesNest } = useSelector((state) => state.amesti);
  const dispatch = useDispatch();

  useEffect(() => {
    if (load) {
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
  }, [dispatch, cantidad, load, token]);

  useEffect(() => {
    dispatch(getTodosNest(token));
  }, [dispatch, cantidad, token]);

  useEffect(() => {
    dispatch(getTodosFilestRedux(token));
  }, [dispatch, cantidad, token]);

  const a = filesNest.map((v, idx) => ({ ...v, id: idx }));

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
      {filesNest.length <= 0 ? (
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
            <Container maxWidth="lg">
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Tiempo tiempo={time} files={a} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <GuardarModeloButtom file={a} />
                </Grid>
              </Grid>
            </Container>
          ) : null}
        </Container>
      )}
    </RootStyle>
  );
}
