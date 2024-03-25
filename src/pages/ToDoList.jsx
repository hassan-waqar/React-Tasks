import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, TextField, Autocomplete, Button } from "@mui/material";
import AddToList from "./AddToList"

function ToDoList() {
    const [rows, setRows] = useState([
        { id: 1, itemName: 'Item 1', priority: 'High', status: 'Pending' },
        { id: 2, itemName: 'Item 2', priority: 'Medium', status: 'In Progress' },
        { id: 3, itemName: 'Item 3', priority: 'Low', status: 'Completed' },

    ]);

    // Define columns
    const columns = [
        { field: 'id', headerName: 'Item Number', width: 150 },
        { field: 'itemName', headerName: 'Item Name', width: 150 },
        { field: 'priority', headerName: 'Priority', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
        {
            field: 'delete',
            headerName: 'Delete',
            sortable: false,
            width: 100,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    onClick={() => handleDeleteRow(params.row.id)}
                >
                    Delete
                </Button>
            )
        },
        {
            field: 'edit',
            headerName: 'Edit',
            sortable: false,
            width: 100,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    onClick={() => handleEditRow(params.row.id)}
                >
                    Edit
                </Button>
            )
        }
    ];

    const handleDeleteRow = (id) => {
        setRows(prevRows => prevRows.filter(row => row.id !== id));
    };


    const [editItem, setEditItem] = useState({
        itemName: '',
        priority: '',
        status: ''
    });

    const handleEditRow = (id) => {
        const rowToEdit = rows.find(row => row.id === id);
        setEditItem({
            itemName: rowToEdit.itemName,
            priority: rowToEdit.priority,
            status: rowToEdit.status
        })
        handleDeleteRow(id)
    }



    const addToList = (newItem) => {
        setRows(prevRows => [
            ...prevRows,
            {
                id: prevRows.length + 1,
                itemName: newItem.itemName,
                priority: newItem.priority,
                status: newItem.status
            }
        ]);
    };

    return (
        <>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
            />
            <Container style={{ height: '30px' }} />
            <AddToList addToList={addToList} handleEditRow={handleEditRow} editItem={editItem} />

        </>
    )
}

export default ToDoList;
