import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import React from "react";


const Loading = () => {
    return (
        <Spin style={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}} indicator={<LoadingOutlined style={{ fontSize: 50}} spin />} />
    )
}

export default Loading