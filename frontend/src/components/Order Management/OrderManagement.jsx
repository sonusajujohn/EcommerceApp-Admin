import React, { useState, useEffect } from 'react';
import { Table, Button, Select, Input, notification, Row, Col } from 'antd'; 
import axios from 'axios';
import './OrderManagement.css'; 

const { Option } = Select;

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch orders whenever the order status or search term changes
  useEffect(() => {
    fetchOrders();
  }, [orderStatus, searchTerm]);

  // Fetch orders from the backend
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/orders', {
        params: { status: orderStatus, search: searchTerm },
      });
      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      notification.error({ message: 'Error fetching orders', description: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.patch(`/api/orders/${orderId}/status`, { status });
      notification.success({ message: 'Order status updated successfully' });
      fetchOrders(); // Refresh orders after update
    } catch (error) {
      notification.error({ message: 'Error updating order status', description: error.message });
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Define table columns
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      sorter: (a, b) => a.orderId - b.orderId, // Adding sorting functionality
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      sorter: (a, b) => a.customerName.localeCompare(b.customerName), // Sorting by customer name
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (text, record) => <span>{record.products.map(p => p.name).join(', ')}</span>,
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (text) => `$${text.toFixed(2)}`,
      sorter: (a, b) => a.totalPrice - b.totalPrice, // Sorting by price
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Select 
          value={text} 
          style={{ width: 120 }} 
          onChange={(value) => updateOrderStatus(record.orderId, value)}
        >
          <Option value="pending">Pending</Option>
          <Option value="shipped">Shipped</Option>
          <Option value="delivered">Delivered</Option>
          <Option value="canceled">Canceled</Option>
        </Select>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => updateOrderStatus(record.orderId, record.status === 'shipped' ? 'delivered' : 'shipped')}
        >
          Mark as {record.status === 'shipped' ? 'Delivered' : 'Shipped'}
        </Button>
      ),
    },
  ];

  return (
    <div className="order-management">
      <h2>Order Management</h2>
      <Row gutter={16} className="filters">
        <Col>
          <Input
            placeholder="Search by Order ID or Customer"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: 300 }}
          />
        </Col>
        <Col>
          <Select
            value={orderStatus}
            onChange={setOrderStatus}
            style={{ width: 200 }}
          >
            <Option value="all">All Orders</Option>
            <Option value="pending">Pending</Option>
            <Option value="shipped">Shipped</Option>
            <Option value="delivered">Delivered</Option>
            <Option value="canceled">Canceled</Option>
          </Select>
        </Col>
      </Row>
      <Table
        dataSource={orders}
        columns={columns}
        loading={loading}
        rowKey="orderId"
        pagination={{ pageSize: 10 }}
        onChange={(pagination, filters, sorter) => {
          // Optionally handle sorting or other table changes
        }}
      />
    </div>
  );
};

export default OrderManagement;
