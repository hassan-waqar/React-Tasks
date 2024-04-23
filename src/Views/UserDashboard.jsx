import React, { useState } from 'react';
import {
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined, OrderedListOutlined, ShoppingCartOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import Search from "../components/Search";
import {Link, Outlet} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const App = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleMenuClick = (key) => {
        switch (key) {
            case '1':
                navigate('/user');
                break;
            case '2':
                navigate('/user/cart');
                break;
            case '3':
                navigate('/user/orders');
                break;
            case '4':
                navigate('/user/profile');
                break;
            default:
                break;
        }
    };

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{
                height: "100vh"
            }}>
                <div className="demo-logo-vertical">E-commerce</div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={({ key }) => handleMenuClick(key)}
                >
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        Home
                    </Menu.Item>
                    <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
                        Shopping Cart
                    </Menu.Item>
                    <Menu.Item key="3" icon={<OrderedListOutlined />}>
                        Orders
                    </Menu.Item>
                    <Menu.Item key="4" icon={<UserOutlined />}>
                        Profile
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        display: "flex",
                        margin: 0,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <Search/>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
};
export default App;