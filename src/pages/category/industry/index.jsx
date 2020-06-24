import React, { Component } from 'react';
import { Table, Space, message, Popconfirm } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { deleteIndustry } from '@/services/category';
import IndustryAdd from "../components/Add";

@connect(({ industryListModel, loading }) => ({
    industryListModel,
    loading: loading.models.industryListModel,
}))

class IndustryList extends Component {
    // 定义表格的colum
    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '描述',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: '操作',
            dataIndex: '',
            key: '',
            render: (text, item) => (
                <Space size="middle">
                    <Popconfirm title={`确定删除【${item.name}】？`} onConfirm={() => this.onDelete(item.id)}>
                        <a>删除</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'industryListModel/fetch',
        });
    };

    onDelete = (id) => {
        deleteIndustry({ id }).then(({ status }) => {
            if (status === 'ok') {
                if (this.props.reload) {
                    this.props.reload();
                }
            } else {
                message.error('服务器数据删除异常');
            }
        });
    };

    render() {
        const {
            industryListModel: { list }, // {list}对应model中state中的list
            loading,
        } = this.props;

        return (
            <PageHeaderWrapper>
                <IndustryAdd success={this.reload} />
                <Table loading={loading} dataSource={list} columns={this.columns} />
            </PageHeaderWrapper>
        );
    }
}
export default IndustryList;