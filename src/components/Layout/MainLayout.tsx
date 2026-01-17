import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Typography,
  Space,
  Badge,
  Button,
  theme,
  Drawer,
} from 'antd';
import {
  DashboardOutlined,
  FileTextOutlined,
  CloudUploadOutlined,
  UserOutlined,
  BarChartOutlined,
  SettingOutlined,
  BellOutlined,
  MenuOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems: MenuProps['items'] = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/bills',
      icon: <FileTextOutlined />,
      label: 'Bills',
    },
    {
      key: '/upload',
      icon: <CloudUploadOutlined />,
      label: 'Upload',
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: 'User Management',
    },
    {
      key: '/reports',
      icon: <BarChartOutlined />,
      label: 'Reports',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: 'Profile',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
    setMobileDrawerOpen(false);
  };

  const handleUserMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      console.log('Logout clicked');
    }
  };

  const siderContent = (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
        <Text strong style={{ fontSize: collapsed ? '14px' : '18px', color: '#092635' }}>
          {collapsed ? 'EBM' : 'Enterprise Bill Manager'}
        </Text>
      </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ flex: 1, borderRight: 0, fontSize: '14px' }}
        />
    </div>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Desktop Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={240}
        style={{
          display: window.innerWidth >= 992 ? 'block' : 'none',
          background: colorBgContainer,
          borderRight: '1px solid #f0f0f0',
        }}
        breakpoint="lg"
        collapsedWidth="0"
      >
        {siderContent}
      </Sider>

      {/* Mobile Drawer */}
      <Drawer
        title="Enterprise Bill Manager"
        placement="left"
        onClose={() => setMobileDrawerOpen(false)}
        open={mobileDrawerOpen}
        styles={{ body: { padding: 0 } }}
        size={240}
      >
        {siderContent}
      </Drawer>

      <Layout>
        <Header
          style={{
            padding: '0 32px',
            background: colorBgContainer,
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
          }}
        >
          <Space>
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                display: window.innerWidth >= 992 ? 'flex' : 'none',
              }}
            />
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileDrawerOpen(true)}
              style={{
                display: window.innerWidth < 992 ? 'flex' : 'none',
              }}
            />
          </Space>

          <Space size="middle">
            <Badge count={5} size="small">
              <Button type="text" icon={<BellOutlined />} />
            </Badge>
            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: handleUserMenuClick,
              }}
              placement="bottomRight"
              arrow
            >
              <Space style={{ cursor: 'pointer' }}>
                <Avatar size="small" icon={<UserOutlined />} />
                <Text>Admin User</Text>
              </Space>
            </Dropdown>
          </Space>
        </Header>

        <Content
          style={{
            margin: '0',
            padding: '24px',
            background: '#f5f7fa',
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;