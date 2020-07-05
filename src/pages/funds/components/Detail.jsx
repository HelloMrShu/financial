import React, { Component } from 'react';
import { Modal, Form, Input, Space, Select, Row, Col } from 'antd';
import { connect } from 'dva'
import styels from '../index.less';
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

@connect(() => ({}))

class FundDetail extends Component {
  state = { visible: false };

  formRef = React.createRef();

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  componentDidUpdate() {
    const { visible } = this.props;
    if (!visible && this.formRef.current) {
    }
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const {fund} = this.props;

    return (
      <div>
        <Space>
          <a onClick={this.showModal}>详情</a>
        </Space>
        <Modal
          wrapClassName="addUserModal"
          title="详情"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onOk={this.handleCancel}
          cancelText="关闭"
        >
          <Row className={styels.rowHeight}>
            <Col span={6}>基金名称：</Col>
            <Col span={12}>{fund.Name}</Col>
          </Row>
          <Row className={styels.rowHeight}>
            <Col span={6}>基金描述：</Col>
            <Col span={12}>{fund.Intro}</Col>
          </Row>
          <Row className={styels.rowHeight}>
            <Col span={6}>基金类型：</Col>
            <Col span={12}>{fund.Type}</Col>
          </Row>
          <Row className={styels.rowHeight}>
            <Col span={6}>基金评级：</Col>
            <Col span={12}>{fund.Level_display}</Col>
          </Row>
          <Row className={styels.rowHeight}>
            <Col span={6}>基金板块：</Col>
            <Col span={12}>{fund.Sector_name}</Col>
          </Row>
          <Row className={styels.rowHeight}>
            <Col span={6}>买入费率：</Col>
            <Col span={12}>{fund.Bid_rate}&nbsp;%</Col>
          </Row>
          <Row className={styels.rowHeight}>
            <Col span={6}>周卖出费率：</Col>
            <Col span={12}>{fund.Sale_week_rate}&nbsp;%</Col>
          </Row>
          <Row className={styels.rowHeight}>
            <Col span={6}>月卖出费率：</Col>
            <Col span={12}>{fund.Sale_month_rate}&nbsp;%</Col>
          </Row>
          <Row className={styels.rowHeight}>
            <Col span={6}>年卖出费率：</Col>
            <Col span={12}>{fund.Sale_year_rate}&nbsp;%</Col>
          </Row>
          
        </Modal>
      </div>
    );
  }
}

export default FundDetail;
