/* eslint-disable no-plusplus */
import { useState } from 'react';
import { Icon } from '@iconify/react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
// utils
import { useDispatch } from '../../../redux/store';
import { hasTime, hasModel } from '../../../redux/slices/amesti';
// components
import { MIconButton } from '../../@material-extend';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 60,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'archivo',
    headerName: 'archivo',
    width: 180,
    editable: true,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'folder',
    headerName: 'folder',
    width: 180,
    editable: true,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'cantidadPlancha',
    headerName: 'Cantidad por plancha',
    width: 180,
    editable: true,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'modelo',
    headerName: 'modelo',
    width: 180,
    editable: true,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'tiempoPorEstufa',
    headerName: 'tiempoPorEstufa',
    type: 'number',
    width: 210,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'action',
    headerName: ' ',
    width: 20,
    align: 'right',
    sortable: false,
    disableColumnMenu: true,
    renderCell: () => (
      <MIconButton>
        <Box component={Icon} icon={moreVerticalFill} sx={{ width: 20, height: 20 }} />
      </MIconButton>
    )
  }
];

export default function DataGridBasicSelected(data) {
  const [selectionModel, setSelectionModel] = useState([]);
  const dispatch = useDispatch();

  if (selectionModel) {
    let time = selectionModel.map((selected, idx) => parseFloat(data.files[selectionModel[idx]].tiempoPorEstufa));

    time = time.reduce((a, b) => a + b, 0);
    dispatch(hasModel(selectionModel));
    dispatch(hasTime(time));
  }

  return (
    <DataGrid
      columns={columns}
      rows={data.files}
      checkboxSelection
      disableSelectionOnClick
      onSelectionModelChange={(newSelectionModel) => {
        setSelectionModel(newSelectionModel);
      }}
      selectionModel={selectionModel}
    />
  );
}
