import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider, theme, App as AntdApp } from 'antd';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Bills from './pages/Bills';
import Upload from './pages/Upload';
import Users from './pages/Users';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import './App.css';

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#092635',
          colorInfo: '#1890ff',
          borderRadius: 8,
          fontSize: 14,
          fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontWeightStrong: 600,
        },
        components: {
          Layout: {
            siderBg: '#ffffff',
            headerBg: '#ffffff',
            bodyBg: '#f5f7fa',
          },
          Menu: {
            itemBg: 'transparent',
            itemSelectedBg: 'rgba(9, 38, 53, 0.06)',
            itemSelectedColor: '#092635',
            itemHoverBg: 'rgba(9, 38, 53, 0.03)',
          },
          Card: {
            borderRadius: 12,
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
          },
          Table: {
            borderRadius: 8,
          },
        },
      }}
    >
      <AntdApp>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="bills" element={<Bills />} />
              <Route path="upload" element={<Upload />} />
              <Route path="users" element={<Users />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;