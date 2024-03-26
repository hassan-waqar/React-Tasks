import React, { useState, useRef } from 'react';
import { Container, TextField, Autocomplete, Button } from "@mui/material";

function AddToList({ addToList }) {
    const itemNameRef = useRef(null);
    const priorityRef = useRef(null);
    const statusRef = useRef(null);

    const [priorityOptions] = useState(["High", "Medium", "Low"]);
    const [statusOptions] = useState(["Pending", "In Progress", "Complete"]);

    const handleAddToList = () => {
        const newItem = {
            itemName: itemNameRef.current.value,
            priority: priorityRef.current,
            status: statusRef.current
        };
        addToList(newItem);
        // Clear input fields after adding item
        itemNameRef.current.value = '';
        priorityRef.current = null; // Reset the reference
        statusRef.current = null; // Reset the reference
    };

    return (
        <Container maxWidth="sm" style={{ textAlign: "center", display: "flex", justifyContent: "space-around" }}>
            <TextField
                inputRef={itemNameRef}
                id="itemName"
                name="itemName"
                label="Item Name"
                variant="outlined"
                style={{ marginRight: '10px' }}
            />
            <Autocomplete
                disablePortal
                id="combo-box-priority"
                options={priorityOptions}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Priority" />}
                onChange={(event, newValue) => { priorityRef.current = newValue; }}
                style={{ marginRight: '10px' }}
            />
            <Autocomplete
                disablePortal
                id="combo-box-status"
                options={statusOptions}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Status" />}
                onChange={(event, newValue) => { statusRef.current = newValue; }}
                style={{ marginRight: '10px' }}
            />
            <Button variant="outlined" onClick={handleAddToList}>Add</Button>
        </Container>
    )
}

export default AddToList;


// import React, { useState, useRef, useReducer } from 'react';
// import { Container, TextField, Autocomplete, Button } from "@mui/material";
//
// const initialState = {
//     itemName: '',
//     priority: null,
//     status: null
// };
//
// function reducer(state, action) {
//     switch (action.type) {
//         case 'SET_ITEM_NAME':
//             return { ...state, itemName: action.payload };
//         case 'SET_PRIORITY':
//             return { ...state, priority: action.payload };
//         case 'SET_STATUS':
//             return { ...state, status: action.payload };
//         case 'RESET':
//             return initialState;
//         default:
//             return state;
//     }
// }
//
// function AddToList({ addToList }) {
//     const [state, dispatch] = useReducer(reducer, initialState);
//
//     const itemNameRef = useRef(null);
//     const priorityRef = useRef(null);
//     const statusRef = useRef(null);
//
//     const priorityOptions = ["High", "Medium", "Low"];
//     const statusOptions = ["Pending", "In Progress", "Complete"];
//
//     const handleAddToList = () => {
//         const newItem = {
//             itemName: itemNameRef.current.value,
//             priority: state.priority,
//             status: state.status
//         };
//         addToList(newItem);
//         dispatch({ type: 'RESET' });
//     };
//
//     return (
//         <Container maxWidth="sm" style={{ textAlign: "center", display: "flex", justifyContent: "space-around" }}>
//             <TextField
//                 inputRef={itemNameRef}
//                 id="itemName"
//                 name="itemName"
//                 label="Item Name"
//                 variant="outlined"
//                 style={{ marginRight: '10px' }}
//                 value={state.itemName}
//                 onChange={(e) => dispatch({ type: 'SET_ITEM_NAME', payload: e.target.value })}
//             />
//             <Autocomplete
//                 disablePortal
//                 id="combo-box-priority"
//                 options={priorityOptions}
//                 sx={{ width: 300 }}
//                 renderInput={(params) => <TextField {...params} label="Priority" />}
//                 value={state.priority}
//                 onChange={(event, newValue) => dispatch({ type: 'SET_PRIORITY', payload: newValue })}
//                 style={{ marginRight: '10px' }}
//             />
//             <Autocomplete
//                 disablePortal
//                 id="combo-box-status"
//                 options={statusOptions}
//                 sx={{ width: 300 }}
//                 renderInput={(params) => <TextField {...params} label="Status" />}
//                 value={state.status}
//                 onChange={(event, newValue) => dispatch({ type: 'SET_STATUS', payload: newValue })}
//                 style={{ marginRight: '10px' }}
//             />
//             <Button variant="outlined" onClick={handleAddToList}>Add</Button>
//         </Container>
//     )
// }
//
// export default AddToList;
//
