import { useState, useRef } from 'react';
// material
import { Button, Dialog, TextField, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';

import { useSelector, useDispatch } from '../../redux/store';
import { hasCantidad } from '../../redux/slices/amesti';

// ----------------------------------------------------------------------

export default function FormDialogsTablaNest() {
  const dispatch = useDispatch();
  const valueRef = useRef('');
  const [open, setOpen] = useState(false);

  const { load, cantidad } = useSelector((state) => state.amesti);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseII = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(hasCantidad(valueRef.current.value));
  };

  return (
    <div>
      <Button variant="outlined" color="error" onClick={handleClickOpen}>
        Seleccionar
      </Button>

      <Dialog open={open} onClose={handleCloseII}>
        <DialogTitle>Seleccionar</DialogTitle>
        <DialogContent>
          <DialogContentText>Introduzca la cantidad de piezas por estufa usadas.</DialogContentText>
          <TextField
            inputRef={valueRef}
            autoFocus
            fullWidth
            type="email"
            margin="dense"
            variant="outlined"
            label="Piezas"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseII} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleClose} variant="contained">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
