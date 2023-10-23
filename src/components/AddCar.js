import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions  from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle  from "@mui/material/DialogTitle";

import Button  from "@mui/material/Button";
import TextField  from "@mui/material/TextField";
import Stack from "@mui/material/Stack";


function AddCar(props) {
    const [open, setOpen]= useState(false);
    const [car, setCar]= useState(
        {
            brand:"",
            model:"",
            color:"",
            year:"",
            fuel:"",
            price:"",
        }
    );
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = event => {
        setCar({...car, [event.target.name]: event.target.value});
     }
    
    const handleSave = () => {
        props.addCar(car);
        handleClose();
    }
    return(
    <div>
        <Button  variant="contained" onClick={handleClickOpen}>
         +
        </Button>
        
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New car</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mb={1}>
                <TextField
                placeholder="Brand"
                name="brand"
                autoFocus
                variant= "standard"
                value={car.brand}
                onChange={handleChange}
                />
                <TextField
                placeholder="Model"
                name="model"
                autoFocus
                variant= "standard"
                value={car.model}
                onChange={handleChange}
                />
                <TextField
                placeholder="Color"
                name="color"
                autoFocus
                variant= "standard"
                value={car.color}
                onChange={handleChange}
                />
                <TextField
                placeholder="Year"
                name="year"
                autoFocus
                variant= "standard"
                value={car.year}
                onChange={handleChange}
                />
                <TextField
                placeholder="Price"
                name="price"
                autoFocus
                variant= "standard"
                value={car.price}
                onChange={handleChange}
                />
                
                </Stack>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={handleSave}>Enregistrer</Button>
                </DialogActions>








        </Dialog>
    </div>
    ) ;
}

export default AddCar;