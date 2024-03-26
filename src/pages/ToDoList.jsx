import {useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container } from "@mui/material";
import AddToList from "./AddToList"
import { columnsData } from "../data/columnsData";
import { rowsData } from "../data/rowsData";

function ToDoList() {

    const [rows, setRows] = useState(rowsData);

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

    const columns = columnsData(handleDeleteRow, handleEditRow);

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
