import { forwardRef, useState } from 'react';

// material
import { Slide, Dialog, Button, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import { useSelector, useDispatch } from '../../redux/store';
import { createTimeTable } from '../../redux/slices/amesti';
// ----------------------------------------------------------------------
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function GuardarModeloButtom(files) {
  const [open, setOpen] = useState(false);
  const { user, token } = useAuth();
  const dispatch = useDispatch();

  const { load, cantidad, time, model } = useSelector((state) => state.amesti);

  const modelSelected = model.map((selected, idx) => files.file[model[idx]]);
  const archivo = model.map((selected, idx) => files.file[model[idx]].archivo);

  const modelo = modelSelected[0] ? modelSelected[0] : 'no';
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    const type = {
      MODELO: modelo.modelo,
      archivo,
      tiempo: time
    };

    dispatch(createTimeTable(type, token));
    console.log(type);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="success" onClick={handleClickOpen}>
        Guardar Modelo
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Desea crear el modelo {modelo.modelo}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            El modelo {modelo.modelo} se guardara en la base de datos. Solo se guarda el nombre del modelo y el tiempo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
