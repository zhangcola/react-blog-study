
import { Layout, Menu, Popconfirm } from "antd";
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined,
  } from '@ant-design/icons'
  import './index.scss'
import { Outlet } from "react-router-dom";

const {Header,  Sider } = Layout;

const items = [
    {
      label: '首页',
      key: '/',
      icon: <HomeOutlined />,
    },
    {
      label: '文章管理',
      key: '/article',
      icon: <DiffOutlined />,
    },
    {
      label: '创建文章',
      key: '/publish',
      icon: <EditOutlined />,
    },
  ]

const GeekLayout = (props) => {
    return(
        <Layout>
            <Header className="header" >
                <div className="logo" />
                <div className="user-info">
                    <span className="user-name">可乐</span>
                    <span className="user-logout">
                        <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
                            <LogoutOutlined /> 退出
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        defaultSelectedKeys={['1']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={items}
                    />
                </Sider>
                <Layout className="layout-content">
                    <Outlet />
              </Layout> 
            </Layout>
        </Layout>
    )
}

export default GeekLayout;