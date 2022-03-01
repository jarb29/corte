// materia
import { Table, TableBody, TableContainer } from '@mui/material';
// components
import Scrollbar from '../../../Scrollbar';
//
import CollapsibleTableRow from './CollapsibleTableRow';

// ----------------------------------------------------------------------

export default function CollapsibleTable(file) {
  const data = [file.files.DATA];
  return (
    <Scrollbar>
      <TableContainer sx={{ minWidth: 800, mt: 3 }}>
        <Table>
          <TableBody>
            <CollapsibleTableRow key={file.files.NOMBRE_PROGRAMA} row={data} />
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
}
