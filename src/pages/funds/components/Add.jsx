import React from 'react';
import { Button, Modal, Form, Input, Space, message, Select } from 'antd';
import { saveFund } from '@/services/fund';
import { connect } from 'dva'
import SectorSelection from "../../Components/SectorDropdown";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

@connect(() => ({}))

class FundAdd extends React.Component {
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

  onFinish = ( data ) => {
    saveFund({
      name: data.fund_name,
      intro: data.fund_intro,
      type: data.fund_type,
      level: data.fund_level,
      bid_rate: data.bid_rate,
      sale_week_rate: data.sale_week_rate,
      sale_month_rate: data.sale_month_rate,
      sale_year_rate: data.sale_year_rate,
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
    return (
      <div>
        <Space style={{ marginBottom: 10 }}>
          <Button type="primary" onClick={this.showModal}>
            新建
          </Button>
        </Space>
        <Modal
          wrapClassName="addUserModal"
          title="新建"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确定"
        >
          <Form {...layout} ref={this.formRef} onFinish={this.onFinish}>

            <Form.Item name="fund_name" label="基金名称" rules={[{ required: true, min: 3, max: 50 }]}>
              <Input placeholder="基金名称" />
            </Form.Item>

            <Form.Item name="fund_intro" label="基金描述" rules={[{ required: true, min: 3, max: 100 }]}>
              <Input.TextArea placeholder="基金描述" />
            </Form.Item>

            <Form.Item
              name="fund_type"
              id="select"
              label="基金类型"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}>
              <Select
                id="select"
                defaultValue="请选择"
                style={{ width: 150 }}
              >
                <Option value="指数型">指数型</Option>
                <Option value="混合型">混合型</Option>
                <Option value="股票型">股票型</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="fund_level"
              id="select"
              label="晨星评级"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}>
              <Select id="select" defaultValue="0" style={{ width: 150 }}>
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
              name="bid_rate"
              id="select"
              label="买入费率"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}>
              <Select
                id="select"
                style={{ width: 150 }}
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
              name="sale_week_rate"
              id="select"
              label="七日卖出"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}>
              <Select
                id="select"
                style={{ width: 150 }}
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
              name="sale_month_rate"
              id="select"
              label="月内卖出"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}>
              <Select
                id="select"
                style={{ width: 150 }}
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
              name="sale_year_rate"
              id="select"
              label="年内卖出"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}>
              <Select
                id="select"
                style={{ width: 150 }}
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
};

export default FundAdd;
