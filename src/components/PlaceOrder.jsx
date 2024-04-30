import React from 'react';
import { TinyColor } from '@ctrl/tinycolor';
import {Button, Col, ConfigProvider, Row, Statistic} from 'antd';
const App = ({placeOrder, totalPrice}) => {

    const colors3 = ['#40e495', '#30dd8a', '#2bb673'];
    const getHoverColors = (colors) =>
        colors.map((color) => new TinyColor(color).lighten(5).toString());
    const getActiveColors = (colors) =>
        colors.map((color) => new TinyColor(color).darken(5).toString());
    return (
        <Row gutter={10}>
            <Col span={22} align="center">
                <Statistic title="Total Amount (Rs.)" value={totalPrice} precision={2} />
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                colorPrimary: `linear-gradient(116deg,  ${colors3.join(', ')})`,
                                colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(colors3).join(', ')})`,
                                colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(colors3).join(', ')})`,
                                lineWidth: 0,
                            },
                        },
                    }}
                >
                    <Button type="primary" size="large" onClick={placeOrder}>
                        Place Order
                    </Button>
                </ConfigProvider>

            </Col>
        </Row>
    );
}
export default App;