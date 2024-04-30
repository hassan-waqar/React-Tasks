import { Dropdown, Menu, Button } from 'antd';
import {useState} from "react";
import {changeStatus} from "../api/UserProducts";

const GenExtra = ({order}) => {
    const [status, setStatus] = useState(order.status || "Awaiting Confirmation");

    const handleMenuClick = async (newStatus) => {
        try {
            // Make API call to change the status of the order
            await changeStatus(order, newStatus);
            // Update the status state with the new status value
            setStatus(newStatus);
        } catch (error) {
            // Handle error or display error message
        }
    };

    const menu = (
        <Menu onClick={(e) => handleMenuClick(e.key)}>
            <Menu.Item key="Confirmed">Confirmed</Menu.Item>
            <Menu.Item key="Shipped">Shipped</Menu.Item>
            <Menu.Item key="Delivered">Delivered</Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <Button type="text">{status}</Button>
        </Dropdown>
    );
};

export default GenExtra