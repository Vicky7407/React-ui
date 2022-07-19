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
import { DataGrid, renderActionsCell } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

function Medicine(props) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [dopen, setDOpen] = useState(false);
  const [did,setDid]=useState(0);
  const [update,setUpdate] =useState(false);
  const [searchdata,setSearchData] = useState([]);
 
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDClickOpen = () => {
    setDOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setDOpen(false);
    // setUpdate(false);
    formikObj.resetForm();
  };

  const handleDelete = (params) => {
    let handledelete = JSON.parse(localStorage.getItem("data"));
    let Deletedata = handledelete.filter((i) => i.id !==did);
    localStorage.setItem("data", JSON.stringify(Deletedata));
    loadData();
    handleClose();
  };
  const loadData = () => {
    let localData = JSON.parse(localStorage.getItem("data"));
    if (localData !== null) {
      setData(localData);
    }
  };

  let schema = yup.object().shape({
    Name: yup.string().required("Enter Medicine name"),
    price: yup
      .number()
      .required("Enter medicine price")
      .positive("price can't be negative"),
    Quantity: yup.string().required("Enter Quantity"),
    Expiry: yup.string().required("Enter Expiry date"),
    // createdOn: yup.date().default(function () {
    //   return new Date();
    // }),
  });

  // to local storage
  const handleData = (values) => {
    let localdata = JSON.parse(localStorage.getItem("data"));
    let id = Math.floor(Math.random() * 1000);
    const addId = {
      id: id,
      ...values,
    };
    if (localdata === null) {
      localStorage.setItem("data", JSON.stringify([addId]));
    } else {
      localdata.push(addId);
      localStorage.setItem("data", JSON.stringify(localdata));
    }
    formikObj.resetForm();
    handleClose();
  };

  const handleEdit =(params) =>{
    handleClickOpen();
    formikObj.setValues(params.row);
    updateData(values);
    setUpdate(true);
  }
  const updateData = (values) =>{
    let localdata = JSON.parse(localStorage.getItem("data"));
    const uData=localdata.map((l) =>{
      if(l.id===values.id){
       return values;
      }else{
       return l;
      }
   });
   localStorage.setItem("data",JSON.stringify(uData));
   loadData();
   setUpdate(false);
  }
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      setData(data);
    }
  }, [data]);
  const formikObj = useFormik({
    initialValues: {
      Name: "",
      price: "",
      Quantity: "",
      Expiry: "",
    },
    validationSchema: schema,
    onSubmit: (values , action) => {
        if(update){
          updateData(values);
        }else{
          handleData(values);
        }
      loadData();
      handleClose();
    },
  });

  const Searchdata=(val) =>{
     let localdata=JSON.parse(localStorage.getItem("data"));

     let  filterData=localdata.filter((item) =>(
      item.Name.toLowerCase().includes(val.toLowerCase())||
      item.price.toString().includes(val)||
      item.Quantity.toString().includes(val)||
      item.Expiry.toString().includes(val)
     ))
      console.log(filterData);
     setSearchData(filterData);
  }
  const SearchData=searchdata.length > 0 ? searchdata
        :data;
  const columns = [
    { field: "Name", headerName: "Medicine Name", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "Quantity", headerName: "Quantity", width: 150 },
    { field: "Expiry", headerName: "Expiry", width: 150 },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div>
        <Box>
          <Button onClick={() => {handleEdit(params)}}>
             <EditIcon />
          </Button>
          <Button color="error" onClick={() =>{ handleDClickOpen(params); setDid(params.id); }}>
            <DeleteIcon />
          </Button>
        </Box>
        </div>
      ),
    },
  ];

  const { errors, handleBlur, handleChange, handleSubmit, touched,values } = formikObj;

  return (
    <div>
      <h2>Medicine.</h2>
      <Box sx={{ m: 1}}>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add Medicine
          </Button>
          <TextField sx={{width:500,}}
                margin="dense"
                name="Name"
                label="Search"
                type="text"
                fullWidth
                variant="filled"
                id="filled-basic"
                onChange={(e) => Searchdata(e.target.value)}
              />
        </Stack>
      </Box>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={SearchData}
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
                value={values.Name}
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
                value={values.price}
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
                value={values.Quantity}
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
                value={values.Expiry}
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
              {
                update?
                <Button type="submit">Update</Button>
                :
                <Button type="submit">Add</Button>
              }
              
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
      <Dialog
        open={dopen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure want to delete?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Medicine;
