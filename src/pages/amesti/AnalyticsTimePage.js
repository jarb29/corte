import { useState, useEffect, useCallback } from 'react';

// material
import { any } from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box, Grid, Card, Container, CardHeader, Stack } from '@mui/material';
import AnalyticsTime from '../../components/amesti/AnalyticsTime';
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

export default function AnalyticsTimePage() {
  // const { user, token } = useAuth();
  // const dispatch = useDispatch();
  // const [files, setFiles] = useState([]);
  // const { load, cantidad, time, set, E } = useSelector((state) => state.amesti);

  // const a = files.map((v, idx) => ({ ...v, id: idx }));

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
