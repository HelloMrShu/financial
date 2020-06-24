import React from 'react';
import { Button, Modal, Form, Input, Space, message } from 'antd';
import { saveIndustry } from '@/services/category';


const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

class IndustryAdd extends React.Component {
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

  onFinish = ({ industry_name, industry_desc }) => {
    saveIndustry({
      industry_name,
      industry_desc,
    }).then(({ status }) => {
      if (status === 'ok') {
        this.formRef.current.resetFields();
        this.setState({
          visible: false,
        });

        if (this.props.success) {
          this.props.success();
        }
      } else {
        message.error('服务器出错了，请联系管理员！');
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
            <Form.Item name="industry_name" label="行业名称" rules={[{ required: true, min: 3, max: 50 }]}>
              <Input placeholder="行业名称" />
            </Form.Item>
            <Form.Item name="industry_desc" label="行业描述" rules={[{ required: true, min: 3, max: 100 }]}>
              <Input.TextArea placeholder="行业描述" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default IndustryAdd;
