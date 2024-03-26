// data/columnsData.js
import { Button } from "@mui/material";

export const columnsData = (handleDeleteRow, handleEditRow) => {
    return [
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
};
