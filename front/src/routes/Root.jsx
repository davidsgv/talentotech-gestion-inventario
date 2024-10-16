import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    ProductOutlined,
    LogoutOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Outlet } from "react-router-dom";
import useSesion from '../hooks/useSesion';


const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Productos', '1', <ProductOutlined />),
    // getItem('Option 2', '2', <DesktopOutlined />),
    // getItem('User', 'sub1', <UserOutlined />, [
    //     getItem('Tom', '3'),
    //     getItem('Bill', '4'),
    //     getItem('Alex', '5'),
    // ]),
    // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    // getItem('Files', '9', <FileOutlined />),
];

const Root = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { logout } = useSesion()

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: "10px",
                        background: colorBgContainer,
                        display: "flex",
                        justifyContent: "flex-end"
                    }}
                >
                    <LogoutOutlined onClick={logout} />
                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Outlet />
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Gestion inventario
                </Footer>
            </Layout>
        </Layout>
    );
};
export default Root;