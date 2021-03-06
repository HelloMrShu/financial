import React, { Component } from 'react';
import { Modal, Form, Input, Space, message } from 'antd';
import { saveSector } from '@/services/sector';
import { connect } from 'dva'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

@connect(() => ({}))

class SectorEditor extends Component {
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
          type: 'sectorList/fetch',
          payload: {
              page: 1,
              page_size: 10
          }
      });
  };

  componentDidUpdate() {
    const { visible } = this.props;

    // 只需对话框显示时才需要重置表单
    if (!visible && this.formRef.current) {
      this.formRef.current.resetFields();
    }
  }

  onFinish = ( data ) => {
    saveSector({
      id: data.ID,
      name: data.Name,
      intro: data.Intro
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
    const {sector} = this.props;

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
              initialValues={sector}
            >
            
            <Form.Item name="ID" noStyle>
              <Input type="hidden" />
            </Form.Item>

            <Form.Item name="Name" label="板块名称" rules={[{ required: true, min: 3, max: 50 }]}>
              <Input placeholder="板块名称"/>
            </Form.Item>

            <Form.Item name="Intro" label="板块描述" rules={[{ required: true, min: 3, max: 100 }]}>
              <Input.TextArea placeholder="板块描述"/>
            </Form.Item>

          </Form>
        </Modal>
      </div>
    );
  }
}

export default SectorEditor;
