import { Icon } from '@iconify/react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
// utils
import mockData from '../../../utils/mock-data';
// components
import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------

const columns = [
  {
    field: 'NOMBRE PIEZA',
    headerName: 'PIEZA',
    width: 160
  },
  {
    field: 'CANTIDAD',
    headerName: 'CANTIDAD',
    width: 160
  },
  {
    field: 'PROGRAMA:',
    headerName: 'PROGRAMA:',
    width: 160
  },
  {
    field: 'TIEMPO MECANIZADO',
    headerName: 'TIEMPO',
    type: 'number',
    width: 160,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'LONGITUD DE CORTE',
    headerName: 'LONGITUD',
    width: 160
  },
  {
    field: 'DESPERDICIO',
    headerName: 'DESPERDICIO',
    width: 160
  },
  {
    field: 'action',
    headerName: ' ',
    width: 160,
    align: 'right',
    sortable: false,
    disableColumnMenu: true,
    renderCell: () => (
      <MIconButton>
        <Box component={Icon} icon={moreVerticalFill} sx={{ width: 10, height: 10 }} />
      </MIconButton>
    )
  }
];

const rows = [...Array(30)].map((_, index) => ({
  id: mockData.id(index),
  lastName: mockData.name.lastName(index),
  firstName: mockData.name.firstName(index),
  age: mockData.number.age(index)
}));

export default function DataGridBasic(row) {
  const column = Object.keys(row.data);
  // console.log(row.data.CANTIDAD[0]);
  const rows = Object.keys(row.data).map(function (key, index) {
    pieza: row[key][index];
    // lastName: mockData.name.lastName(index),
    // firstName: mockData.name.firstName(index),
    // age: mockData.number.age(index)
  });
  console.log(rows, 'inside de component');
  return <DataGrid columns={columns} rows={rows} checkboxSelection disableSelectionOnClick />;
}
