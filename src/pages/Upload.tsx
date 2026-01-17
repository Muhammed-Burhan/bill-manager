import React, { useState } from 'react';
import { App } from 'antd';
import {
  Card,
  Typography,
  Upload as AntUpload,
  Button,
  Table,
  Space,
  Tag,
  Progress,
  Alert,
  Divider,
  Row,
  Col,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,

} from 'antd';
import {
  InboxOutlined,
  UploadOutlined,
  DeleteOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import type { UploadFile } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Bill } from '../types';

const { Title, Text } = Typography;
const { Dragger } = AntUpload;
const { TextArea } = Input;

const Upload: React.FC = () => {
  const { message } = App.useApp();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewData, setPreviewData] = useState<Partial<Bill>[]>([]);
  const [form] = Form.useForm();

  const mockPreviewData: Partial<Bill>[] = [
    {
      billNumber: 'INV-2024-001',
      vendor: 'Office Depot',
      amount: 456.78,
      dueDate: '2024-02-15',
      category: 'Office Supplies',
      description: 'Monthly office supplies',
    },
    {
      billNumber: 'INV-2024-002',
      vendor: 'Microsoft',
      amount: 1299.00,
      dueDate: '2024-02-20',
      category: 'Software',
      description: 'Annual software license',
    },
  ];

  const uploadProps: any = {
    name: 'file',
    multiple: true,
    accept: '.pdf,.jpg,.jpeg,.png,.csv,.xlsx',
    fileList,
    beforeUpload: (file: any) => {
      const isValidType = ['application/pdf', 'image/jpeg', 'image/png', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(file.type);
      if (!isValidType) {
        console.error('You can only upload PDF, Image, CSV or Excel files!');
        return false;
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        console.error('File must smaller than 10MB!');
        return false;
      }
      return false;
    },
    onChange(info: any) {
      setFileList(info.fileList);
    },
    onDrop(e: any) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const handlePreview = () => {
    setPreviewData(mockPreviewData);
    setShowPreviewModal(true);
  };

  const handleUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            message.success(`${fileList.length} files have been uploaded and processed successfully.`);
            setFileList([]);
            setUploadProgress(0);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleManualSubmit = async (values: any) => {
    console.log('Manual bill entry:', values);
    message.success('Bill has been added successfully.');
    form.resetFields();
  };

  const columns: ColumnsType<Partial<Bill>> = [
    {
      title: 'Bill Number',
      dataIndex: 'billNumber',
      key: 'billNumber',
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount?.toFixed(2)}`,
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => <Tag color="blue">{category}</Tag>,
    },
  ];

  return (
    <div>
      <Title level={2}>Upload Bills</Title>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={14}>
          <Card title="Bulk Upload" style={{ marginBottom: '24px' }}>
            <Dragger {...uploadProps} style={{ padding: '20px' }}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
              </p>
              <p className="ant-upload-text">Click or drag files to this area to upload</p>
              <p className="ant-upload-hint">
                Support for single or bulk upload. PDF, Images, CSV, and Excel files are accepted.
                Maximum file size: 10MB per file.
              </p>
            </Dragger>
            
            {fileList.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <Space>
                  <Button icon={<EyeOutlined />} onClick={handlePreview}>
                    Preview Data
                  </Button>
                  <Button
                    type="primary"
                    icon={<UploadOutlined />}
                    onClick={handleUpload}
                    loading={isUploading}
                    disabled={fileList.length === 0}
                  >
                    Upload Files
                  </Button>
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => setFileList([])}
                    disabled={isUploading}
                  >
                    Clear All
                  </Button>
                </Space>
                
                {isUploading && (
                  <div style={{ marginTop: '16px' }}>
                    <Text>Uploading files...</Text>
                    <Progress percent={uploadProgress} />
                  </div>
                )}
              </div>
            )}
          </Card>

          <Card title="Manual Entry">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleManualSubmit}
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="billNumber"
                    label="Bill Number"
                    rules={[{ required: true, message: 'Please enter bill number!' }]}
                  >
                    <Input placeholder="e.g., INV-2024-001" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="vendor"
                    label="Vendor"
                    rules={[{ required: true, message: 'Please enter vendor name!' }]}
                  >
                    <Input placeholder="e.g., Office Depot" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={16}>
                <Col xs={24} sm={8}>
                  <Form.Item
                    name="amount"
                    label="Amount"
                    rules={[{ required: true, message: 'Please enter amount!' }]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder="0.00"
                      min={0}
                      precision={2}
                      prefix="$"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item
                    name="dueDate"
                    label="Due Date"
                    rules={[{ required: true, message: 'Please select due date!' }]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item
                    name="category"
                    label="Category"
                    rules={[{ required: true, message: 'Please select category!' }]}
                  >
                    <Select placeholder="Select category">
                      <Select.Option value="Office Supplies">Office Supplies</Select.Option>
                      <Select.Option value="Software">Software</Select.Option>
                      <Select.Option value="Utilities">Utilities</Select.Option>
                      <Select.Option value="Rent">Rent</Select.Option>
                      <Select.Option value="Travel">Travel</Select.Option>
                      <Select.Option value="Other">Other</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                name="description"
                label="Description"
              >
                <TextArea rows={3} placeholder="Optional description..." />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Add Bill
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card title="Upload Guidelines" style={{ marginBottom: '24px' }}>
            <Space orientation="vertical" style={{ width: '100%' }}>
              <div>
                <Text strong>Supported Formats:</Text>
                <ul style={{ marginTop: '8px', marginBottom: '0' }}>
                  <li>PDF files (*.pdf)</li>
                  <li>Image files (*.jpg, *.png)</li>
                  <li>CSV files (*.csv)</li>
                  <li>Excel files (*.xlsx)</li>
                </ul>
              </div>
              
              <Divider />
              
              <div>
                <Text strong>File Requirements:</Text>
                <ul style={{ marginTop: '8px', marginBottom: '0' }}>
                  <li>Maximum file size: 10MB</li>
                  <li>Clear and readable text</li>
                  <li>Bill number visible</li>
                  <li>Amount clearly stated</li>
                  <li>Vendor name included</li>
                </ul>
              </div>
              
              <Divider />
              
              <Alert
                title="Processing Time"
                description="Uploaded files are typically processed within 2-5 minutes. You'll receive a notification when processing is complete."
                type="info"
                showIcon
              />
            </Space>
          </Card>

          <Card title="Recent Uploads">
            <Space orientation="vertical" style={{ width: '100%' }}>
              <div style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                <Space>
                  <CheckCircleOutlined style={{ color: '#52c41a' }} />
                  <div>
                    <Text>office_supplies.pdf</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      2 files processed successfully
                    </Text>
                  </div>
                </Space>
              </div>
              <div style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                <Space>
                  <ExclamationCircleOutlined style={{ color: '#faad14' }} />
                  <div>
                    <Text>invoices_batch.csv</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      Processing... 50%
                    </Text>
                  </div>
                </Space>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Modal
        title="Preview Upload Data"
        open={showPreviewModal}
        onCancel={() => setShowPreviewModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowPreviewModal(false)}>
            Cancel
          </Button>,
          <Button key="upload" type="primary" onClick={handleUpload}>
            Confirm Upload
          </Button>,
        ]}
        width={800}
      >
        <Table
          columns={columns}
          dataSource={previewData}
          rowKey="billNumber"
          pagination={false}
        />
        <Alert
          title="Please review the extracted data before confirming the upload."
          type="info"
          style={{ marginTop: '16px' }}
        />
      </Modal>
    </div>
  );
};

export default Upload;