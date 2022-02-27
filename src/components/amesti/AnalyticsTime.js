import { merge } from 'lodash';
import { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../utils/formatNumber';

import useAuth from '../../hooks/useAuth';
//
import { BaseOptionChart } from '../charts';

import { useSelector, useDispatch } from '../../redux/store';
import { hasCantidad, getAllTimeEstufa } from '../../redux/slices/amesti';

// ----------------------------------------------------------------------

// const CHART_DATA = [{ data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380] }];

export default function AnalyticsTime(data) {
  const dispatch = useDispatch();
  const { user, token } = useAuth();

  const { estufaTime } = useSelector((state) => state.amesti);

  console.log(estufaTime, 'the time/estufa');

  const modelo = estufaTime.map((mode, idx) => mode.MODELO);
  const tiempo = estufaTime.map((mode, idx) => mode.tiempo);

  const CHART_DATA = [{ data: tiempo }];

  useEffect(() => {
    dispatch(getAllTimeEstufa(token));
  }, [dispatch]);

  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => ''
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: modelo
    }
  });

  return (
    <Card>
      <CardHeader title="Tiempo por estufa" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
