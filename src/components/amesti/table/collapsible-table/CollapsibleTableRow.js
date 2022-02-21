import { Icon } from '@iconify/react';
import { useState } from 'react';
import arrowIosUpwardFill from '@iconify/icons-eva/arrow-ios-upward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import {
  Box,
  Table,
  Collapse,
  TableRow,
  Container,
  Stack,
  Card,
  CardHeaderTableHead,
  CardHeader,
  TableBody,
  TableCell,
  Typography,
  IconButton
} from '@mui/material';

// ----------------------------------------------------------------------
import DataGridBasic from '../../data-grid/DataGridBasic';

export default function CollapsibleTable({ row }) {
  const [open, setOpen] = useState(false);

  const data = JSON.parse(row[0]);

  console.log(data.FOLDER[0]);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            <Icon icon={open ? arrowIosUpwardFill : arrowIosDownwardFill} />
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {data.FOLDER[0]}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <Container maxWidth="lg">
                  <Stack spacing={8}>
                    <Card>
                      <CardHeader title="Basic" sx={{ mb: 2 }} />
                      <Box sx={{ height: 390 }}>
                        <DataGridBasic data={data} />
                      </Box>
                    </Card>
                  </Stack>
                </Container>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
