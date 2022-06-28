import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import { Form, Formik, useFormik } from "formik";
import { DataGrid } from "@mui/x-data-grid";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

function Medicine(props) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let schema = yup.object().shape({
    Name: yup.string().required("Enter Medicine name"),
    price: yup
      .number()
      .required("Enter medicine price")
      .positive("price can't be negative"),
    Quantity: yup.string().required("Enter Quantity"),
    Expiry: yup.string().required("Enter Expiry date"),
   
  });

  // to local storage
  const handleData = (data) => {
    let localdata = JSON.parse(localStorage.getItem("data"));
    let id=Math.floor(Math.random()*1000);
    const addId={
      id:id,
      ...data
    }
    if (localdata === null) {
      localStorage.setItem("data", JSON.stringify([addId]));
    } else {
      localdata.push(addId);
      localStorage.setItem("data", JSON.stringify(localdata));
    }
    formikObj.resetForm();
    handleClose();
  };
  
  useEffect(() => {
      const data= JSON.parse(localStorage.getItem('data'));

     
      if(data){
        setData(data);
      }
      

  },[data])
  const formikObj = useFormik({
    initialValues: {
      Name: "",
      price: "",
      Quantity: "",
      Expiry: "",
    },
    validationSchema: schema,
    onSubmit: (data) => {
      handleData(data);
    },
  });
  const columns = [
    { field: "Name", headerName: "Medicine Name", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "Quantity", headerName: "Quantity", width: 150 },
    { field: "Expiry", headerName: "Expiry", width: 150 },
  ];

  const { errors, handleBlur, handleChange, handleSubmit, touched } = formikObj;

  return (
    <div>
      <h2>Medicine.</h2>
      <Button variant="outlined" onClick={handleClickOpen}>
            Add Medicine
          </Button>
       
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <Formik values={formikObj}>
          <Form onSubmit={handleSubmit}>
            <DialogTitle>Add Medicine</DialogTitle>
            <DialogContent>
              {/* <DialogContentText></DialogContentText> */}
              <TextField
                margin="dense"
                name="Name"
                label="Name"
                type="text"
                // fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name ? (
                <p style={{ color: "red" }}>{errors.name}</p>
              ) : (
                ""
              )}
              <TextField
                margin="dense"
                name="price"
                label="price"
                type="number"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.price && touched.price ? (
                <p style={{ color: "red" }}>{errors.price}</p>
              ) : (
                ""
              )}
              <TextField
                margin="dense"
                name="Quantity"
                label="Quantity"
                type="number"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.Quantity && touched.Quantity ? (
                <p style={{ color: "red" }}>{errors.Quantity}</p>
              ) : (
                ""
              )}
              <TextField
                margin="dense"
                name="Expiry"
                label="Expiry"
                type="number"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.Expiry && touched.Expiry ? (
                <p style={{ color: "red" }}>{errors.Expiry}</p>
              ) : (
                ""
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Add</Button>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
    </div>
  );
}

export default Medicine;
