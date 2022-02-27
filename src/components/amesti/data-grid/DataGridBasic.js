/* eslint-disable no-plusplus */
import { useState } from 'react';
import { Icon } from '@iconify/react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
// utils
import { useDispatch } from '../../../redux/store';
import { startLoading, hasSet } from '../../../redux/slices/amesti';
// components
import { MIconButton } from '../../@material-extend';
import FormDialogsTablaNest from '../FormDialogsTablaNest';

// ----------------------------------------------------------------------

const columns = [
  {
    field: 'NOMBRE PIEZA',
    headerName: 'PIEZA',
    width: 200,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'CANTIDAD',
    headerName: 'CANTIDAD',
    width: 200,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'NOMBRE PROGRAMA:',
    headerName: 'PROGRAMA:',
    width: 160,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'TIEMPO MECANIZADO NEST (min)',
    headerName: 'TIEMPO',
    type: 'number',
    width: 200,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'LONGITUD DE CORTE TOTAL (mm)',
    headerName: 'LONGITUD',
    width: 160,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'DESPERDICIO (%)',
    headerName: 'DESPERDICIO',
    width: 200,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'MODELO',
    headerName: 'MODELO',
    width: 200,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'FOLDER',
    headerName: 'FOLDER',
    width: 260,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'ESPESOR (mm)',
    headerName: 'ESPESOR',
    width: 160,
    align: 'center',
    headerAlign: 'center'
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
        <FormDialogsTablaNest />
        <Box component={Icon} icon={moreVerticalFill} sx={{ width: 10, height: 10 }} />
      </MIconButton>
    )
  }
];

export default function DataGridBasic(ro) {
  const [selectionModel, setSelectionModel] = useState([]);
  const dispatch = useDispatch();
  const key = Object.keys(ro.data);
  const a = [];
  for (let i = 0; i < Object.keys(ro.data.CANTIDAD).length; i++) {
    const obj = {};
    for (let a = 0; a < key.length; a++) {
      obj[key[a]] = Object.values(ro.data[key[a]])[i];
    }
    obj.id = i;
    a.push(obj);
  }

  return (
    <DataGrid
      columns={columns}
      rows={a}
      checkboxSelection
      disableSelectionOnClick
      onSelectionModelChange={(newSelectionModel) => {
        setSelectionModel(newSelectionModel);
        dispatch(startLoading(a[newSelectionModel]));
      }}
      selectionModel={selectionModel}
    />
  );
}
