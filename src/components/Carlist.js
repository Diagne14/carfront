import { useEffect, useState } from "react";
import { SERVER_URL } from "../constants";
import { DataGrid, GridBody } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import AddCar from './AddCar.js';
import React from "react";
import EditCar from './EditCar.js';
import Stack  from "@mui/material/Stack";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';



function Carlist(){
    const [open, setOpen] = useState(false);
    
    const [ cars, setCars]=useState([]);
    
    useEffect(() => {
        fetchCars();
    }, []);


    const fetchCars =() => { 
        fetch(SERVER_URL + 'api/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err));
        
    };

    const addCar = car => {
        fetch(SERVER_URL + "api/cars",{
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(car),
        })
            .then(response => {
                if (response.ok){
                    fetchCars();
                }else{
                    alert("Something went wrong !");
                }
            })
            .catch(err => console.error(err));
    };
    
    const updateCar = (car, link) => {
        fetch(link, {
            method: "PUT" , 
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(car),

        })
            .then(response => {
                if (response.ok){
                    fetchCars();
                }else {
                    alert("Smoething went wrong!");
                }
            })
            .catch(err => console.error(err));
    };


    const onDeClick = url => {
        if (window.confirm("Etes-vous sure de vouloir supprimer")){
        fetch(url, {method: "DELETE"})
        .then(response =>{
            if (response.ok) {
            fetchCars();
            setOpen(true);
        }else{
            alert ("Quelque chose s'est mal passe !");
        }
        })
        .catch(err => console.error(err));
        
        }
    };

    const columns = [
        { field: 'brand', headerName: 'Marque', width: 200 },
        { field: 'model', headerName: 'Modèle', width: 200 },
        { field: 'color', headerName: 'Couleur', width: 200 },
        { field: 'year', headerName: 'Année', width: 150 },
        { field: 'price', headerName: 'Prix', width: 150 },
        
        {  
            field: "_links.car.href",
            headerName:"",
            sortable: false,
            filterable: false,
            renderCell : row =>
            <EditCar data={row} updateCar={updateCar}/>,
            
        },
        
        {  
          field: "_links.self.href",
          headerName:"",
          sortable: false,
          filterable: false,
          renderCell : row => (
            <IconButton onClick={() => onDeClick(row.id)}>
                <DeleteIcon color="error"/>
            </IconButton>
            

          ),
        },
        
    ];

    
    return(
<React.Fragment>
    
    <Stack mt={2} mb={2}>
    <AddCar addCar= {addCar}/>
    </Stack>
    
    <div style={{height: 500, width:'100%'}}>
        <DataGrid
        rows={cars}
        columns={columns}
        disableRowSelectionOnClick={true}
        getRowId={row => row._links.self.href}
        />
        
        <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={() => setOpen(false)}
            message="Voiture supprimée"
        />
        
    </div>
</React.Fragment>    
); 
}
export default Carlist;