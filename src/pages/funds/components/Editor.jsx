import React, { Component } from 'react';
import { Button, Modal, Form, Input, Space, message, Select } from 'antd';
import { saveFund } from '@/services/fund';
import { connect } from 'dva'
import SectorSelection from "./SectorDropdown";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

@connect(() => ({}))

class FundEditor extends Component {
  state = { visible: false };

  formRef = React.createRef();

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.formRef.current.submit();
  };

  loadData() {
      const { dispatch } = this.props;
      dispatch({
          type: 'fundList/fetch',
          payload: {
              page: 1,
              page_size: 10
          }
      });
  };

  componentDidUpdate() {
    const { visible } = this.props;
    if (!visible && this.formRef.current) {
      this.formRef.current.resetFields();
    }
  }

  onFinish = ( data ) => {
    console.log(data);
    saveFund({
      id: data.Id,
      name: data.Name,
      intro: data.Intro,
      type: data.Type,
      level: data.Level,
      bid_rate: data.Bid_rate,
      sale_week_rate: data.Sale_week_rate,
      sale_month_rate: data.Sale_month_rate,
      sale_year_rate: data.Sale_year_rate,
      sector_id: data.Sector_id
    }).then(({ code }) => {
      if (code == '200') {
        this.formRef.current.resetFields();
        this.setState({
          visible: false,
        });

        this.loadData();
        
      } else {
        message.error('服务器异常，请联系管理员！');
      }
    });
  };

  handleCancel = () => {
    this.formRef.current.resetFields();
    this.setState({
      visible: false,
    });
  };

  render() {
    const {fund} = this.props;

    return (
      <div>
        <Space>
          <a onClick={this.showModal}>编辑</a>
        </Space>
        <Modal
          wrapClassName="addUserModal"
          title="编辑"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确定"
        >
          <Form {...layout} 
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={fund}
            >

          <Form.Item name="Id" noStyle>
            <Input type="hidden" />
          </Form.Item>

          <Form.Item name="Name" label="基金名称" rules={[{ required: true, min: 3, max: 50 }]}>
            <Input placeholder="基金名称" />
          </Form.Item>

          <Form.Item name="Intro" label="基金描述" rules={[{ required: true, min: 3, max: 100 }]}>
            <Input.TextArea placeholder="基金描述" />
          </Form.Item>

          <Form.Item
            name="Type"
            id="select"
            label="基金类型"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}>
            <Select id="select" style={{ width: 150 }}>
              <Option value="指数型">指数型</Option>
              <Option value="混合型">混合型</Option>
              <Option value="股票型">股票型</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="Level"
            id="select"
            label="晨星评级"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}>
            <Select
              id="select"
              style={{ width: 150 }}
            >
              <Option value="0">无</Option>
              <Option value="1">★</Option>
              <Option value="2">★★</Option>
              <Option value="3">★★★</Option>
              <Option value="4">★★★★</Option>
              <Option value="5">★★★★★</Option>
            </Select>
          </Form.Item>

          <SectorSelection />

          <Form.Item
            name="Bid_rate"
            id="select"
            label="买入费率"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}>
            <Select
              id="select"
              style={{ width: 150 }}
              defaultValue={fund.Bid_rate}
              suffixIcon="%"
            >
              <Option value="0">0</Option>
              <Option value="0.06">0.06</Option>
              <Option value="0.08">0.08</Option>
              <Option value="0.10">0.10</Option>
              <Option value="0.12">0.12</Option>
              <Option value="0.15">0.15</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="Sale_week_rate"
            id="select"
            label="七日卖出"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}>
            <Select
              id="select"
              style={{ width: 150 }}
              defaultValue={fund.Sale_week_rate}
              suffixIcon="%"
            >
              <Option value="1.5">1.5</Option>
              <Option value="1.0">1.0</Option>
              <Option value="0.75">0.75</Option>
              <Option value="0.50">0.05</Option>
              <Option value="0.25">0.25</Option>
              <Option value="0">0</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="Sale_month_rate"
            id="select"
            label="月内卖出"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}>
            <Select
              id="select"
              style={{ width: 150 }}
              defaultValue={fund.Sale_month_rate}
              suffixIcon="%"
            >
              <Option value="1.0">1.0</Option>
              <Option value="0.75">0.75</Option>
              <Option value="0.50">0.50</Option>
              <Option value="0.10">0.10</Option>
              <Option value="0">0</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="Sale_year_rate"
            id="select"
            label="年内卖出"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}>
            <Select
              id="select"
              style={{ width: 150 }}
              defaultValue={fund.Sale_year_rate}
              suffixIcon="%"
            >
              <Option value="0">0</Option>
              <Option value="0.25">0.25</Option>
              <Option value="0.50">0.50</Option>
            </Select>
          </Form.Item>

          </Form>
        </Modal>
      </div>
    );
  }
}

export default FundEditor;
