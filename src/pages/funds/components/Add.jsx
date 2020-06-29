import React from 'react';
import { Button, Modal, Form, Input, Space, message } from 'antd';
import { saveFund } from '@/services/fund';
import { connect } from 'dva'

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

  onFinish = ({ fund_name, fund_intro }) => {
    saveSector({
      name: fund_name,
      intro: fund_intro
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
          </Form>
        </Modal>
      </div>
    );
  }
}

export default FundAdd;