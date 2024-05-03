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
import Search from "./components/Search";
const { Header, Sider, Content } = Layout;
const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
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
                    items={[
                        {
                            key: '1',
                            icon: <HomeOutlined />,
                            label: "Home",
                        },
                        {
                            key: '2',
                            icon: <ShoppingCartOutlined />,
                            label: 'Shopping Cart',
                        },
                        {
                            key: '3',
                            icon: <OrderedListOutlined />,
                            label: 'Orders',
                        },                        {
                            key: '4',
                            icon: <UserOutlined />,
                            label: 'Profile',
                        },

                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        display: "flex",
                        margin: 0,
                        // height: "100px"

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
                    Content
                </Content>
            </Layout>
        </Layout>
    );
};
export default App;