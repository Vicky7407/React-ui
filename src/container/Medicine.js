import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik, Form, useFormik } from 'formik';
import * as yup from 'yup';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Medicine = () => {

  const [openDlg, setOpenDlg] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [params, setParams] = useState();
  const [update, setUpdate] = useState(false);

  const handleClickOpen = () => {
    setOpenDlg(true);
    formik.resetForm()
  };

  const handleClose = () => {
    setOpenDlg(false);
  };

  let schema = yup.object().shape({
    name: yup.string().required("Please Enter Name"),
    price: yup.number().required("Please Enter Price"),
    quantity: yup.number().required("Please Enter Quantity"),
    expiry: yup.number().required("Please Enter Expiry Year"),
  })

  const loadData = () => {
    let localD = JSON.parse(localStorage.getItem('medicines'));
    if (localD !== null) {
      setData(localD);
    }
  }


  const addData = (value) => {
    let localData = JSON.parse(localStorage.getItem("medicines"));
    value = {
      id: Math.floor(Math.random() * 1000),
      ...value
    }

    if (localData === null) {
      localStorage.setItem('medicines', JSON.stringify([value]))
    } else {
      localData.push(value);
      localStorage.setItem('medicines', JSON.stringify(localData))
    }

    loadData();
  }

  const updData = (val) => {
    let localD = JSON.parse(localStorage.getItem('medicines'));
    
    localD.map((data) => {
      if (data.id === val.id) {
        data.name = val.name;
        data.price = val.price;
        data.quantity = val.quantity;
        data.expiry = val.expiry;
      }
    })

    localStorage.setItem('medicines' , JSON.stringify(localD));
    loadData();
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      quantity: '',
      expiry: ''
    },
    validationSchema: schema,
    onSubmit: values => {
      update ? updData(values) : addData(values);
    },
    enableReinitialize: true,
  });

  const { handleSubmit, handleBlur, errors, touched, handleChange, values } = formik;


  const handleDelete = () => {
    let localData = JSON.parse(localStorage.getItem('medicines'));
    let fData = localData.filter((d) => d.id !== params.id);
    localStorage.setItem('medicines', JSON.stringify(fData));
    setData(fData);

    handleAlertClose();
    loadData();
  }

  const columns = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 },
    { field: 'quantity', headerName: 'Quantity', width: 130 },
    { field: 'expiry', headerName: 'Expiry', width: 130 },
    {
      field: 'action', headerName: 'Action',
      renderCell: (params) => (
        <>
          <IconButton aria-label="delete" onClick={() => {
            setUpdate(true);
            handleClickOpen();
            formik.setValues(params.row);
          }}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => {
            setOpen(true);
            setParams(params);
          }}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ];
  useEffect(() => {
    loadData();
  }, [])


  const handleAlertClose = () => {
    setOpen(false);
  };

  return (
    <>
      <h1>Medicine</h1>
      <div>
        <Button variant="outlined" onClick={handleClickOpen} sx={{ marginBottom: '20px' }}>
          Add Medicines
        </Button>
        <Dialog fullWidth open={openDlg} onClose={handleClose}>
          <DialogTitle> {update ? 'Update Medicine' : 'Add Medicine'}</DialogTitle>
          <Formik values={formik}>
            <Form onSubmit={handleSubmit}>
              <DialogContent>
                <TextField
                  value={values.name}
                  margin="dense"
                  name="name"
                  label="Add Medicine"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                <TextField
                  value={values.price}
                  margin="dense"
                  name="price"
                  label="Add Price"
                  type="number"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.price && touched.price ? <p>{errors.price}</p> : ''}

                <TextField
                  value={values.quantity}
                  margin="dense"
                  name="quantity"
                  label="Add Quantity"
                  type="number"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.quantity && touched.quantity ? <p>{errors.quantity}</p> : ''}

                <TextField
                  value={values.expiry}
                  margin="dense"
                  name="expiry"
                  label="Add Expiry Year"
                  type="number"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.expiry && touched.expiry ? <p>{errors.expiry}</p> : ''}

              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {
                  update ? <Button onClick={handleClose} type='submit'>Update</Button>
                    : <Button onClick={handleClose} type='submit'>Submit</Button>
                }
              </DialogActions>
            </Form>
          </Formik>
        </Dialog>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Sure ! You Want to Delete ?'}
        </DialogTitle>
        <DialogContent>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Medicine
