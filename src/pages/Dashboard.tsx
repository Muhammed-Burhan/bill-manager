import React from 'react';
import { Card, Row, Col, Statistic, Typography, Space } from 'antd';
import {
  FileTextOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  return (
    <div>
      <Title level={2}>Dashboard</Title>
      
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Bills"
              value={1128}
              prefix={<FileTextOutlined />}
              styles={{ content: { color: '#1890ff' } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Amount"
              value={128432}
              prefix={<DollarOutlined />}
              suffix="USD"
              styles={{ content: { color: '#52c41a' } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending"
              value={45}
              prefix={<ClockCircleOutlined />}
              styles={{ content: { color: '#faad14' } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Paid"
              value={983}
              prefix={<CheckCircleOutlined />}
              styles={{ content: { color: '#52c41a' } }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Recent Activity" extra={<a href="/bills">View all</a>}>
            <Space orientation="vertical" style={{ width: '100%' }}>
              <div style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                <Text strong>BILL-2024-001</Text>
                <br />
                <Text type="secondary">Office Supplies - $450.00</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>2 hours ago</Text>
              </div>
              <div style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                <Text strong>BILL-2024-002</Text>
                <br />
                <Text type="secondary">Software License - $1,200.00</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>5 hours ago</Text>
              </div>
              <div style={{ padding: '8px 0' }}>
                <Text strong>BILL-2024-003</Text>
                <br />
                <Text type="secondary">Utilities - $320.00</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>1 day ago</Text>
              </div>
            </Space>
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <Card title="Quick Actions">
            <Space orientation="vertical" style={{ width: '100%' }}>
              <a href="/upload" style={{ display: 'block', padding: '8px 0' }}>
                📤 Upload New Bills
              </a>
              <a href="/bills" style={{ display: 'block', padding: '8px 0' }}>
                📋 View All Bills
              </a>
              <a href="/reports" style={{ display: 'block', padding: '8px 0' }}>
                📊 Generate Reports
              </a>
              <a href="/users" style={{ display: 'block', padding: '8px 0' }}>
                👥 Manage Users
              </a>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;