import React, { useState } from 'react';
import { App } from 'antd';
import {
  Card,
  Table,
  Input,
  Button,
  Space,
  Tag,
  DatePicker,
  Select,
  Dropdown,
  Modal,
  Drawer,

  Typography,
  Row,
  Col,
  Statistic,
  Tooltip,
} from 'antd';
import {
  FilterOutlined,
  DownloadOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ExportOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

import dayjs from 'dayjs';
import type { Bill, FilterOptions } from '../types';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Search } = Input;

const Bills: React.FC = () => {
  const { message } = App.useApp();
  const [bills, setBills] = useState<Bill[]>([
    {
      id: '1',
      billNumber: 'INV-2024-001',
      vendor: 'Office Depot',
      amount: 456.78,
      dueDate: '2024-02-15',
      status: 'pending',
      category: 'Office Supplies',
      description: 'Monthly office supplies',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
    },
    {
      id: '2',
      billNumber: 'INV-2024-002',
      vendor: 'Microsoft',
      amount: 1299.00,
      dueDate: '2024-02-20',
      status: 'paid',
      category: 'Software',
      description: 'Annual software license',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-20',
    },
    {
      id: '3',
      billNumber: 'INV-2024-003',
      vendor: 'Electric Company',
      amount: 320.50,
      dueDate: '2024-01-30',
      status: 'overdue',
      category: 'Utilities',
      description: 'January electricity bill',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-05',
    },
    {
      id: '4',
      billNumber: 'INV-2024-004',
      vendor: 'Landlord LLC',
      amount: 5000.00,
      dueDate: '2024-02-01',
      status: 'paid',
      category: 'Rent',
      description: 'February office rent',
      createdAt: '2024-01-25',
      updatedAt: '2024-02-01',
    },
    {
      id: '5',
      billNumber: 'INV-2024-005',
      vendor: 'Travel Agency',
      amount: 1250.00,
      dueDate: '2024-03-15',
      status: 'pending',
      category: 'Travel',
      description: 'Business trip expenses',
      createdAt: '2024-01-28',
      updatedAt: '2024-01-28',
    },
  ]);

  const [filteredBills, setFilteredBills] = useState<Bill[]>(bills);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  const categories = ['Office Supplies', 'Software', 'Utilities', 'Rent', 'Travel', 'Other'];
  const statusOptions = ['pending', 'paid', 'overdue', 'cancelled'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'pending': return 'processing';
      case 'overdue': return 'error';
      case 'cancelled': return 'default';
      default: return 'default';
    }
  };

  const applyFilters = () => {
    let filtered = [...bills];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(bill =>
        bill.billNumber.toLowerCase().includes(searchLower) ||
        bill.vendor.toLowerCase().includes(searchLower) ||
        bill.description?.toLowerCase().includes(searchLower)
      );
    }

    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter(bill => filters.status!.includes(bill.status));
    }

    if (filters.category && filters.category.length > 0) {
      filtered = filtered.filter(bill => filters.category!.includes(bill.category));
    }

    if (filters.dateRange) {
      filtered = filtered.filter(bill => {
        const billDate = dayjs(bill.dueDate);
        return billDate.isAfter(filters.dateRange![0]) && billDate.isBefore(filters.dateRange![1]);
      });
    }

    if (filters.amountRange) {
      filtered = filtered.filter(bill =>
        bill.amount >= filters.amountRange![0] && bill.amount <= filters.amountRange![1]
      );
    }

    setFilteredBills(filtered);
  };

  React.useEffect(() => {
    applyFilters();
  }, [filters, bills]);

  const handleExport = (format: 'csv' | 'excel') => {
    console.log(`Exporting ${selectedRowKeys.length || filteredBills.length} bills as ${format}`);
    message.success(`Your bills are being exported as ${format.toUpperCase()}. The file will be downloaded shortly.`);
  };

  const handleView = (bill: Bill) => {
    setSelectedBill(bill);
    setViewModalOpen(true);
  };

  const handleDelete = (billId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this bill?',
      content: 'This action cannot be undone.',
      onOk: () => {
        setBills(bills.filter(bill => bill.id !== billId));
        message.success('Bill deleted successfully');
      },
    });
  };

  const columns: ColumnsType<Bill> = [
    {
      title: 'Bill Number',
      dataIndex: 'billNumber',
      key: 'billNumber',
      sorter: (a, b) => a.billNumber.localeCompare(b.billNumber),
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
      sorter: (a, b) => a.vendor.localeCompare(b.vendor),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toFixed(2)}`,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date: string) => dayjs(date).format('MMM DD, YYYY'),
      sorter: (a, b) => dayjs(a.dueDate).unix() - dayjs(b.dueDate).unix(),
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
      filters: statusOptions.map(status => ({
        text: status.charAt(0).toUpperCase() + status.slice(1),
        value: status,
      })),
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => <Tag>{category}</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handleView(record)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => console.log('Edit bill:', record.id)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const exportMenuItems = [
    {
      key: 'csv',
      label: 'Export as CSV',
      onClick: () => handleExport('csv'),
    },
    {
      key: 'excel',
      label: 'Export as Excel',
      onClick: () => handleExport('excel'),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={2}>Bills</Title>
        <Space>
          <Button icon={<DownloadOutlined />} disabled={selectedRowKeys.length === 0}>
            Export Selected
          </Button>
          <Dropdown menu={{ items: exportMenuItems }} placement="bottomRight">
            <Button icon={<ExportOutlined />}>
              Export All
            </Button>
          </Dropdown>
        </Space>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Bills"
              value={filteredBills.length}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending"
              value={filteredBills.filter(b => b.status === 'pending').length}
              styles={{ content: { color: '#faad14' } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Paid"
              value={filteredBills.filter(b => b.status === 'paid').length}
              styles={{ content: { color: '#52c41a' } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Overdue"
              value={filteredBills.filter(b => b.status === 'overdue').length}
              styles={{ content: { color: '#f5222d' } }}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Search
            placeholder="Search bills..."
            allowClear
            style={{ width: 300 }}
            onSearch={(value) => setFilters({ ...filters, search: value })}
            onChange={(e) => !e.target.value && setFilters({ ...filters, search: undefined })}
          />
          <Button
            icon={<FilterOutlined />}
            onClick={() => setFilterDrawerOpen(true)}
          >
            Filters
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={filteredBills}
          rowKey="id"
          rowSelection={rowSelection}
          pagination={{
            total: filteredBills.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} bills`,
          }}
        />
      </Card>

      <Drawer
        title="Filter Bills"
        placement="right"
        onClose={() => setFilterDrawerOpen(false)}
        open={filterDrawerOpen}
        size={300}
      >
        <Space orientation="vertical" style={{ width: '100%' }} size="large">
          <div>
            <Text strong>Status</Text>
            <Select
              mode="multiple"
              placeholder="Select status"
              style={{ width: '100%', marginTop: '8px' }}
              value={filters.status}
              onChange={(value) => setFilters({ ...filters, status: value })}
            >
              {statusOptions.map(status => (
                <Select.Option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div>
            <Text strong>Category</Text>
            <Select
              mode="multiple"
              placeholder="Select categories"
              style={{ width: '100%', marginTop: '8px' }}
              value={filters.category}
              onChange={(value) => setFilters({ ...filters, category: value })}
            >
              {categories.map(category => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div>
            <Text strong>Date Range</Text>
            <RangePicker
              style={{ width: '100%', marginTop: '8px' }}
              onChange={(dates) => setFilters({ ...filters, dateRange: dates as any })}
            />
          </div>

          <div>
            <Text strong>Amount Range</Text>
            <Space.Compact style={{ marginTop: '8px', width: '100%' }}>
              <Input
                style={{ width: '50%' }}
                placeholder="Min"
                type="number"
                onChange={(e) => setFilters({
                  ...filters,
                  amountRange: [Number(e.target.value), filters.amountRange?.[1] || 0]
                })}
              />
              <Input
                style={{ width: '50%' }}
                placeholder="Max"
                type="number"
                onChange={(e) => setFilters({
                  ...filters,
                  amountRange: [filters.amountRange?.[0] || 0, Number(e.target.value)]
                })}
              />
            </Space.Compact>
          </div>

          <Button
            type="primary"
            block
            onClick={() => setFilterDrawerOpen(false)}
          >
            Apply Filters
          </Button>
        </Space>
      </Drawer>

      <Modal
        title="Bill Details"
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalOpen(false)}>
            Close
          </Button>,
        ]}
        width={600}
      >
        {selectedBill && (
          <Space orientation="vertical" style={{ width: '100%' }} size="middle">
            <Row gutter={16}>
              <Col span={12}>
                <Text strong>Bill Number:</Text>
                <br />
                <Text>{selectedBill.billNumber}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Status:</Text>
                <br />
                <Tag color={getStatusColor(selectedBill.status)}>
                  {selectedBill.status.charAt(0).toUpperCase() + selectedBill.status.slice(1)}
                </Tag>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Text strong>Vendor:</Text>
                <br />
                <Text>{selectedBill.vendor}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Amount:</Text>
                <br />
                <Text>${selectedBill.amount.toFixed(2)}</Text>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Text strong>Due Date:</Text>
                <br />
                <Text>{dayjs(selectedBill.dueDate).format('MMMM DD, YYYY')}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Category:</Text>
                <br />
                <Tag>{selectedBill.category}</Tag>
              </Col>
            </Row>
            {selectedBill.description && (
              <div>
                <Text strong>Description:</Text>
                <br />
                <Text>{selectedBill.description}</Text>
              </div>
            )}
            <Row gutter={16}>
              <Col span={12}>
                <Text strong>Created:</Text>
                <br />
                <Text>{dayjs(selectedBill.createdAt).format('MMMM DD, YYYY')}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Last Updated:</Text>
                <br />
                <Text>{dayjs(selectedBill.updatedAt).format('MMMM DD, YYYY')}</Text>
              </Col>
            </Row>
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default Bills;