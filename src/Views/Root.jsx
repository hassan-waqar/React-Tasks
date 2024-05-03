import React from 'react';
import { Button, Card, Flex, Typography } from 'antd';
import {useNavigate} from "react-router-dom";

const cardStyle = {
    width: "100%",
};
const imgStyle = {
    display: 'block',
    width: 273,
};
const App = () => {

    const navigate = useNavigate()

    return (


        <div style={{
            // padding: " 20px 20px",
            height: "100vh",
            maxWidth: "800px",
            display: "flex",
            margin: "auto",
            alignItems: "space-between",
            flexDirection: "column",
            justifyContent: "center"
        }}>
            <Card
                hoverable
                style={cardStyle}
                styles={{
                    body: {
                        padding: 0,
                        overflow: 'hidden',
                    },
                }}
            >
                <Flex justify="space-between">
                    <img
                        alt="avatar"
                        src="https://os.alipayobjects.com/rmsportal/UXamdIxYSkXfoVo.jpg"
                        style={imgStyle}
                    />
                    <Flex
                        vertical
                        align="flex-end"
                        justify="space-between"
                        style={{
                            padding: 32,
                        }}
                    >
                        <Typography.Title level={3}>
                            Unlock a world of possibilities! Click here to embark on your journey by logging in
                        </Typography.Title>
                        <Flex
                            style={{
                                width: "200px",
                                justifyContent: "space-around"
                            }}
                        >
                            <Button type="primary" target="_blank" onClick={() => navigate('/user-login')}>
                                Login
                            </Button>
                            <Button type="primary" target="_blank" onClick={() => navigate('/user-signup')}>
                                Sign Up Now !
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Card>
            <Card
                hoverable
                style={cardStyle}
                styles={{
                    body: {
                        padding: 0,
                        overflow: 'hidden',
                    },
                }}
            >
                <Flex justify="space-between">
                    <Flex
                        vertical
                        align="flex-start"
                        justify="space-between"
                        style={{
                            padding: 32,
                        }}
                    >
                        <Typography.Title level={3}>
                            Enter the realm of control and power! Click here to access the admin login page.
                        </Typography.Title>
                        <Flex

                        >
                            <Button type="primary" target="_blank" onClick={() => navigate('/admin-login')}>
                                Admin Login
                            </Button>
                            {/*<Button type="primary" target="_blank" onClick={() => navigate('/admin-signup')}>*/}
                            {/*    Admin SignUp*/}
                            {/*</Button>*/}
                        </Flex>
                    </Flex>
                    <img
                        alt="avatar"
                        src="https://os.alipayobjects.com/rmsportal/UXamdIxYSkXfoVo.jpg"
                        style={imgStyle}
                    />
                </Flex>
            </Card>
        </div>
    );
}
export default App;