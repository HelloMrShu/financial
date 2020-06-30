import React, { Component } from 'react';
import { Table, Space, message, Popconfirm, Pagination } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { deleteFund } from '@/services/fund';
import FundAdd from "./components/Add";

@connect(({ fundList, loading }) => ({
    fundList,
    loading: loading.models.fundList,
}))

class FundIndex extends Component {

    current = 1
    pageSize = 10

    // 定义表格的colum
    columns = [
    	{
            title: '基金ID',
            dataIndex: 'Id',
            key: 'Id',
        },
        {
            title: '基金名称',
            dataIndex: 'Name',
            key: 'Name',
        },
        {
            title: '类型',
            dataIndex: 'Type',
            key: 'Type',
        },
        {
            title: '板块',
            dataIndex: 'Sector_id',
            key: 'Sector_id',
        },
        {
            title: '评级',
            dataIndex: 'Level',
            key: 'Level',
            render: (text, item) => (
            	<span>***</span>
            ),
        },
        {
            title: '描述',
            dataIndex: 'Intro',
            key: 'Intro',
        },
        {
            title: '创建时间',
            dataIndex: 'Created',
            key: 'Created',
        },
        {
            title: '操作',
            dataIndex: '',
            key: '',
            render: (text, item) => (
                <Space size="middle">
                    <Popconfirm key={item.Id} title={`确定删除【${item.Name}】？`} onConfirm={() => this.onDelete(item.Id)}>
                        <a>删除</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    loadData(current, pageSize) {
        const { dispatch } = this.props;
        dispatch({
            type: 'fundList/fetch',
            payload: {
                page: current,
                page_size: pageSize,
            }, 
        });
    }

    componentDidMount() {
        this.loadData(this.current, this.pageSize);
    };

    onChangePage = (current, pageSize) => {
        this.loadData(current, pageSize);
    }

    onDelete = (id) => {
        deleteFund({ id }).then(({ code }) => {
            if (code == '200') {
                this.loadData(this.current, this.pageSize);
            } else {
                message.error('服务器数据删除异常');
            }
        });
    };

    render() {
        const {
            fundList: { list, pagination },
            loading,
        } = this.props;

        let paginationProps = {
            pageSize: pagination.pageSize,
            current: pagination.current,
            total: pagination.total,
            showSizeChanger: true,
            showTitle: true,
            onChange: (current) => this.onChangePage(current,pagination.pageSize),
        };

        return (
            <PageHeaderWrapper>
                <FundAdd success={this.reload} />
                <Table
                    loading={loading}
                    dataSource={list}
                    columns={this.columns}
                    rowKey={(record, index) => index}
                    pagination={paginationProps}
                 />
            </PageHeaderWrapper>
        );
    }
};

export default FundIndex;