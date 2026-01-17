import React, { useState } from 'react';
import { App } from 'antd';
import {
  Card,
  Typography,
  Form,
  Input,
  Button,
  Switch,
  Select,
  Divider,
  Space,
  Row,
  Col,
  Upload,
  Avatar,

  Tabs,
} from 'antd';
import type { TabsProps } from 'antd';
import {
  SaveOutlined,
  UserOutlined,
  LockOutlined,
  BellOutlined,

} from '@ant-design/icons';


const { Title, Text } = Typography;

const Settings: React.FC = () => {
  const { message } = App.useApp();
  const [passwordForm] = Form.useForm();
  const [profileForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('profile');

  const handleProfileSave = async (values: any) => {
    console.log('Profile settings saved:', values);
    message.success('Profile updated successfully');
  };

  const handlePasswordChange = async (values: any) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error('Passwords do not match');
      return;
    }
    console.log('Password changed');
    message.success('Password changed successfully');
    passwordForm.resetFields();
  };

  const handleNotificationSave = async (values: any) => {
    console.log('Notification settings saved:', values);
    message.success('Notification preferences updated');
  };

  const uploadProps: any = {
    name: 'avatar',
    listType: 'picture-card',
    showUploadList: false,
    beforeUpload: (file: any) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
        return false;
      }
      return false;
    },
  };

  const tabItems: TabsProps['items'] = [
    {
      key: 'profile',
      label: 'Profile',
      children: (
          <Card>
            <Form
              form={profileForm}
              layout="vertical"
              onFinish={handleProfileSave}
              initialValues={{
                name: 'Admin User',
                email: 'admin@company.com',
                phone: '+1 (555) 123-4567',
                department: 'IT',
                role: 'admin',
                timezone: 'America/New_York',
              }}
            >
              <Row gutter={24}>
                <Col xs={24} md={8}>
                  <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <Upload {...uploadProps}>
                      <Avatar size={80} icon={<UserOutlined />} />
                    </Upload>
                    <div style={{ marginTop: '8px' }}>
                      <Text type="secondary">Click to upload avatar</Text>
                    </div>
                  </div>
                </Col>
                <Col xs={24} md={16}>
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="name"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please enter your name!' }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="email"
                        label="Email Address"
                        rules={[
                          { required: true, message: 'Please enter your email!' },
                          { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="phone"
                        label="Phone Number"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="department"
                        label="Department"
                      >
                        <Select>
                          <Select.Option value="IT">IT</Select.Option>
                          <Select.Option value="Finance">Finance</Select.Option>
                          <Select.Option value="Operations">Operations</Select.Option>
                          <Select.Option value="HR">HR</Select.Option>
                          <Select.Option value="Sales">Sales</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="role"
                        label="Role"
                      >
                        <Select>
                          <Select.Option value="admin">Admin</Select.Option>
                          <Select.Option value="manager">Manager</Select.Option>
                          <Select.Option value="user">User</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="timezone"
                        label="Timezone"
                      >
                        <Select>
                          <Select.Option value="America/New_York">Eastern Time</Select.Option>
                          <Select.Option value="America/Chicago">Central Time</Select.Option>
                          <Select.Option value="America/Denver">Mountain Time</Select.Option>
                          <Select.Option value="America/Los_Angeles">Pacific Time</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                  Save Profile
                </Button>
              </Form.Item>
            </Form>
          </Card>
      ),
    },
    {
      key: 'security',
      label: 'Security',
      children: (
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Card title="Change Password">
                <Form
                  form={passwordForm}
                  layout="vertical"
                  onFinish={handlePasswordChange}
                >
                  <Form.Item
                    name="currentPassword"
                    label="Current Password"
                    rules={[{ required: true, message: 'Please enter current password!' }]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    name="newPassword"
                    label="New Password"
                    rules={[
                      { required: true, message: 'Please enter new password!' },
                      { min: 8, message: 'Password must be at least 8 characters!' }
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    label="Confirm New Password"
                    rules={[{ required: true, message: 'Please confirm new password!' }]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" icon={<LockOutlined />}>
                      Change Password
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="Two-Factor Authentication">
                <Space orientation="vertical" style={{ width: '100%' }}>
                  <div>
                    <Text strong>Status:</Text>
                    <div style={{ marginTop: '8px' }}>
                      <Switch checked={false} onChange={(checked) => {
                        if (checked) {
                          message.info('2FA setup would open here');
                        }
                      }} />
                      <Text style={{ marginLeft: '8px' }}>Disabled</Text>
                    </div>
                  </div>
                  <Divider />
                  <Text type="secondary">
                    Enable two-factor authentication to add an extra layer of security to your account.
                  </Text>
                </Space>
              </Card>
            </Col>
          </Row>
      ),
    },
    {
      key: 'notifications',
      label: 'Notifications',
      children: (
          <Card title="Notification Preferences">
            <Form
              layout="vertical"
              onFinish={handleNotificationSave}
              initialValues={{
                emailNotifications: true,
                billReminders: true,
                paymentAlerts: true,
                userActivity: false,
                systemUpdates: true,
                weeklyReports: true,
              }}
            >
              <Row gutter={[24, 16]}>
                <Col xs={24} md={12}>
                  <Text strong>Bill Notifications</Text>
                  <div style={{ marginTop: '12px' }}>
                    <Space orientation="vertical" style={{ width: '100%' }}>
                      <Form.Item name="billReminders" valuePropName="checked">
                        <Space>
                          <Switch />
                          <span>Bill due date reminders</span>
                        </Space>
                      </Form.Item>
                      <Form.Item name="paymentAlerts" valuePropName="checked">
                        <Space>
                          <Switch />
                          <span>Payment confirmation alerts</span>
                        </Space>
                      </Form.Item>
                      <Form.Item name="overdueAlerts" valuePropName="checked">
                        <Space>
                          <Switch />
                          <span>Overdue bill alerts</span>
                        </Space>
                      </Form.Item>
                    </Space>
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <Text strong>System Notifications</Text>
                  <div style={{ marginTop: '12px' }}>
                    <Space orientation="vertical" style={{ width: '100%' }}>
                      <Form.Item name="emailNotifications" valuePropName="checked">
                        <Space>
                          <Switch />
                          <span>Email notifications</span>
                        </Space>
                      </Form.Item>
                      <Form.Item name="userActivity" valuePropName="checked">
                        <Space>
                          <Switch />
                          <span>User activity updates</span>
                        </Space>
                      </Form.Item>
                      <Form.Item name="systemUpdates" valuePropName="checked">
                        <Space>
                          <Switch />
                          <span>System maintenance updates</span>
                        </Space>
                      </Form.Item>
                      <Form.Item name="weeklyReports" valuePropName="checked">
                        <Space>
                          <Switch />
                          <span>Weekly summary reports</span>
                        </Space>
                      </Form.Item>
                    </Space>
                  </div>
                </Col>
              </Row>
              <Divider />
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<BellOutlined />}>
                  Save Preferences
                </Button>
              </Form.Item>
            </Form>
          </Card>
      ),
    },
    {
      key: 'system',
      label: 'System',
      children: (
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Card title="Data Management">
                <Space orientation="vertical" style={{ width: '100%' }}>
                  <Button block>Export All Data</Button>
                  <Button block>Import Data</Button>
                  <Button block danger>Delete All Data</Button>
                </Space>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="System Information">
                <Space orientation="vertical" style={{ width: '100%' }}>
                  <div>
                    <Text strong>Version:</Text>
                    <br />
                    <Text>1.0.0</Text>
                  </div>
                  <Divider />
                  <div>
                    <Text strong>Last Backup:</Text>
                    <br />
                    <Text>January 28, 2024 at 2:30 AM</Text>
                  </div>
                  <Divider />
                  <div>
                    <Text strong>Database Size:</Text>
                    <br />
                    <Text>124.5 MB</Text>
                  </div>
                  <Divider />
                  <Button type="primary" block>Backup Now</Button>
                </Space>
              </Card>
            </Col>
          </Row>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Settings</Title>
      
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
    </div>
  );
};

export default Settings;