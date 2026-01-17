import React, { useState } from 'react';
import { App } from 'antd';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Avatar,
  Typography,
  Row,
  Col,
  Statistic,
  Tooltip,

  Popconfirm,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  MailOutlined,
  TeamOutlined,

} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { User } from '../types';

const { Title } = Typography;
const { Search } = Input;

const Users: React.FC = () => {
  const { message } = App.useApp();
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'admin',
      department: 'IT',
      status: 'active',
      createdAt: '2023-01-15',
      lastLogin: '2024-01-28',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'manager',
      department: 'Finance',
      status: 'active',
      createdAt: '2023-02-20',
      lastLogin: '2024-01-27',
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@company.com',
      role: 'user',
      department: 'Operations',
      status: 'active',
      createdAt: '2023-03-10',
      lastLogin: '2024-01-26',
    },
    {
      id: '4',
      name: 'Emily Brown',
      email: 'emily.brown@company.com',
      role: 'user',
      department: 'HR',
      status: 'inactive',
      createdAt: '2023-04-05',
      lastLogin: '2024-01-15',
    },
    {
      id: '5',
      name: 'David Lee',
      email: 'david.lee@company.com',
      role: 'manager',
      department: 'Sales',
      status: 'active',
      createdAt: '2023-05-12',
      lastLogin: '2024-01-28',
    },
  ]);

  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  const departments = ['IT', 'Finance', 'Operations', 'HR', 'Sales', 'Marketing'];
  const roles = ['admin', 'manager', 'user'];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'red';
      case 'manager': return 'blue';
      case 'user': return 'green';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'success' : 'default';
  };

  const handleSearch = (value: string) => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(value.toLowerCase()) ||
      user.email.toLowerCase().includes(value.toLowerCase()) ||
      user.department.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    message.success('User deleted successfully');
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingUser) {
        setUsers(users.map(user =>
          user.id === editingUser.id
            ? { ...user, ...values }
            : user
        ));
        message.success('User updated successfully');
      } else {
        const newUser: User = {
          id: Date.now().toString(),
          ...values,
          status: 'active',
          createdAt: new Date().toISOString().split('T')[0],
        };
        setUsers([...users, newUser]);
        message.success('User added successfully');
      }
      
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const columns: ColumnsType<User> = [
    {
      title: 'User',
      key: 'user',
      render: (_, record) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 500 }}>{record.name}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.email}</div>
          </div>
        </Space>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={getRoleColor(role)}>
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </Tag>
      ),
      filters: roles.map(role => ({
        text: role.charAt(0).toUpperCase() + role.slice(1),
        value: role,
      })),
      onFilter: (value, record) => record.role === value,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      filters: departments.map(dept => ({
        text: dept,
        value: dept,
      })),
      onFilter: (value, record) => record.department === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (date: string) => date ? new Date(date).toLocaleDateString() : 'Never',
      sorter: (a, b) => {
        const dateA = a.lastLogin ? new Date(a.lastLogin).getTime() : 0;
        const dateB = b.lastLogin ? new Date(b.lastLogin).getTime() : 0;
        return dateB - dateA;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEditUser(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  React.useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={2}>User Management</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddUser}
        >
          Add User
        </Button>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Users"
              value={users.length}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Active Users"
              value={users.filter(u => u.status === 'active').length}
              styles={{ content: { color: '#52c41a' } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Admins"
              value={users.filter(u => u.role === 'admin').length}
              styles={{ content: { color: '#f5222d' } }}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <div style={{ marginBottom: '16px' }}>
          <Search
            placeholder="Search users by name, email, or department..."
            allowClear
            style={{ width: 300 }}
            onSearch={handleSearch}
            onChange={(e) => !e.target.value && handleSearch('')}

          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          pagination={{
            total: filteredUsers.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} users`,
          }}
        />
      </Card>

      <Modal
        title={editingUser ? 'Edit User' : 'Add New User'}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: 'Please enter full name!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="John Doe" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: 'Please enter email!' },
                  { type: 'email', message: 'Please enter a valid email!' }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="john.doe@company.com" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: 'Please select a role!' }]}
              >
                <Select placeholder="Select role">
                  {roles.map(role => (
                    <Select.Option key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="department"
                label="Department"
                rules={[{ required: true, message: 'Please select a department!' }]}
              >
                <Select placeholder="Select department">
                  {departments.map(dept => (
                    <Select.Option key={dept} value={dept}>
                      {dept}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {editingUser && (
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: 'Please select status!' }]}
            >
              <Select placeholder="Select status">
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inactive">Inactive</Select.Option>
              </Select>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default Users;