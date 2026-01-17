import React, { useState } from 'react';
import {
  Card,
  Typography,
  Row,
  Col,
  Select,
  DatePicker,
  Button,
  Space,
  Table,
  Tag,
  Statistic,
  Progress,
  Divider,
} from 'antd';
import {
  BarChartOutlined,
  PieChartOutlined,
  DownloadOutlined,
  FileTextOutlined,
  DollarOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';


const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState<any>(null);
  const [reportType, setReportType] = useState<string>('monthly');

  const monthlyData = [
    { month: 'Jan', amount: 12500, bills: 45 },
    { month: 'Feb', amount: 15200, bills: 52 },
    { month: 'Mar', amount: 11800, bills: 38 },
    { month: 'Apr', amount: 16800, bills: 61 },
    { month: 'May', amount: 14200, bills: 48 },
    { month: 'Jun', amount: 18900, bills: 67 },
  ];

  const categoryData = [
    { category: 'Office Supplies', amount: 8900, percentage: 28, color: '#1890ff' },
    { category: 'Software', amount: 12500, percentage: 39, color: '#52c41a' },
    { category: 'Utilities', amount: 4200, percentage: 13, color: '#faad14' },
    { category: 'Rent', amount: 5000, percentage: 16, color: '#f5222d' },
    { category: 'Travel', amount: 1200, percentage: 4, color: '#722ed1' },
  ];

  const vendorData = [
    { vendor: 'Microsoft', amount: 12500, bills: 3 },
    { vendor: 'Office Depot', amount: 8900, bills: 12 },
    { vendor: 'Landlord LLC', amount: 5000, bills: 1 },
    { vendor: 'Electric Company', amount: 4200, bills: 6 },
    { vendor: 'Travel Agency', amount: 1200, bills: 2 },
  ];

  const categoryColumns: ColumnsType<typeof categoryData[0]> = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toLocaleString()}`,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (percentage: number) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Progress percent={percentage} size="small" style={{ flex: 1 }} />
          <Text>{percentage}%</Text>
        </div>
      ),
    },
  ];

  const vendorColumns: ColumnsType<typeof vendorData[0]> = [
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toLocaleString()}`,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Bills',
      dataIndex: 'bills',
      key: 'bills',
      render: (bills: number) => `${bills} bills`,
    },
  ];

  const handleExport = (format: 'pdf' | 'excel') => {
    console.log(`Exporting ${reportType} report as ${format}`);
  };

  const totalAmount = monthlyData.reduce((sum, item) => sum + item.amount, 0);
  const totalBills = monthlyData.reduce((sum, item) => sum + item.bills, 0);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={2}>Reports & Analytics</Title>
        <Space>
          <Button icon={<DownloadOutlined />} onClick={() => handleExport('pdf')}>
            Export PDF
          </Button>
          <Button icon={<DownloadOutlined />} onClick={() => handleExport('excel')}>
            Export Excel
          </Button>
        </Space>
      </div>

      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Text strong>Report Type:</Text>
            <Select
              value={reportType}
              onChange={setReportType}
              style={{ width: '100%', marginTop: '8px' }}
            >
              <Select.Option value="monthly">Monthly Summary</Select.Option>
              <Select.Option value="quarterly">Quarterly Summary</Select.Option>
              <Select.Option value="yearly">Yearly Summary</Select.Option>
              <Select.Option value="custom">Custom Range</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Date Range:</Text>
            <RangePicker
              value={dateRange}
              onChange={setDateRange}
              style={{ width: '100%', marginTop: '8px' }}
            />
          </Col>
          <Col xs={24} sm={24} md={10}>
            <Button type="primary" icon={<BarChartOutlined />} style={{ marginTop: '24px' }}>
              Generate Report
            </Button>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={totalAmount}
              prefix={<DollarOutlined />}
              suffix="USD"
              styles={{ content: { color: '#1890ff' } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Bills"
              value={totalBills}
              prefix={<FileTextOutlined />}
              styles={{ content: { color: '#52c41a' } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Average Bill"
              value={Math.round(totalAmount / totalBills)}
              prefix={<BarChartOutlined />}
              suffix="USD"
              styles={{ content: { color: '#faad14' } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Growth Rate"
              value={15.3}
              prefix={<BarChartOutlined />}
              suffix="%"
              styles={{ content: { color: '#52c41a' } }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card
            title="Monthly Trend"
            extra={<CalendarOutlined />}
            style={{ marginBottom: '24px' }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1890ff" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#1890ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#8c8c8c" />
                <YAxis stroke="#8c8c8c" />
                <Tooltip 
                  formatter={(value: any, name: any) => [
                    name === 'amount' ? `$${value?.toLocaleString() || 0}` : value,
                    name === 'amount' ? 'Amount' : 'Bills'
                  ]}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#1890ff" 
                  fillOpacity={1} 
                  fill="url(#colorAmount)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card
            title="Category Distribution"
            extra={<PieChartOutlined />}
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.category} ${entry.percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => `$${value?.toLocaleString() || 0}`} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ marginTop: '16px' }}>
              <Table
                columns={categoryColumns}
                dataSource={categoryData}
                rowKey="category"
                pagination={false}
                size="small"
              />
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title="Top Vendors"
            extra={<BarChartOutlined />}
            style={{ marginBottom: '24px' }}
          >
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={vendorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="vendor" stroke="#8c8c8c" />
                <YAxis stroke="#8c8c8c" />
                <Tooltip formatter={(value: any) => `$${value?.toLocaleString() || 0}`} />
                <Bar dataKey="amount" fill="#52c41a" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ marginTop: '16px' }}>
              <Table
                columns={vendorColumns}
                dataSource={vendorData}
                rowKey="vendor"
                pagination={false}
                size="small"
              />
            </div>
          </Card>

          <Card title="Quick Insights">
            <Space orientation="vertical" style={{ width: '100%' }}>
              <div>
                <Text strong>📈 Highest Spending Month:</Text>
                <br />
                <Text>June 2024 - $18,900</Text>
              </div>
              <Divider />
              <div>
                <Text strong>🏆 Top Category:</Text>
                <br />
                <Text>Software - $12,500 (39%)</Text>
              </div>
              <Divider />
              <div>
                <Text strong>👥 Most Active Vendor:</Text>
                <br />
                <Text>Office Depot - 12 bills</Text>
              </div>
              <Divider />
              <div>
                <Text strong>💡 Cost Saving Opportunity:</Text>
                <br />
                <Text>Consider consolidating software licenses</Text>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reports;