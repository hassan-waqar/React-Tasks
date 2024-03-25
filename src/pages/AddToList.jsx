import { useState } from 'react';
import { Container, TextField, Autocomplete, Button } from "@mui/material";

function AddToList({addToList, editItem}) {


    const [priority, setPriority] = useState(["High", "Medium", "Low"]);
    const [status, setStatus] = useState(["Pending", "In Progress", "Complete"]);

    const [newItem, setNewItem] = useState({
        itemName: '',
        priority: '',
        status: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewItem(prevState => ({
            ...prevState,
            [name]: value
        }));
    };



    return (
        <>
            <Container maxWidth="sm" style={{ textAlign: "center", display: "flex", justifyContent: "space-around" }}>
                <TextField
                    id="itemName"
                    name="itemName"
                    label="Item Name"
                    variant="outlined"
                    value={newItem.itemName}
                    onChange={handleInputChange}
                    style={{ marginRight: '10px' }}
                />
                <Autocomplete
                    disablePortal
                    id="combo-box-priority"
                    options={priority}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Priority" />}
                    value={newItem.priority}
                    onChange={(event, newValue) => {
                        setNewItem(prevState => ({ ...prevState, priority: newValue }));
                    }}
                    style={{ marginRight: '10px' }}
                />
                <Autocomplete
                    disablePortal
                    id="combo-box-status"
                    options={status}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Status" />}
                    value={newItem.status}
                    onChange={(event, newValue) => {
                        setNewItem(prevState => ({ ...prevState, status: newValue }));
                    }}
                    style={{ marginRight: '10px' }}
                />
                <Button variant="outlined" onClick={() => addToList(newItem)}>Add</Button>
            </Container>
        </>
    )
}

export default AddToList;
