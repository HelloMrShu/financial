import React, { Component } from 'react';
import { Table, Space, message, Popconfirm, Pagination } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './index.less';

@connect(({ fundList, loading }) => ({
    fundList,
    loading: loading.models.fundList,
}))

class FactorIndex extends Component {

    current = 1
    pageSize = 10
    firstShowEditor = false;

    state = {
        showEditor: false,
        sector: {},
    };

    // 定义表格的colum
    columns = [
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
            dataIndex: 'Sector_name',
            key: 'Sector_name',
        },
        {
            title: '简介',
            dataIndex: 'Intro',
            key: 'Intro',
        }
    ];

    loadData(current, pageSize) {
        const { dispatch } = this.props;
        dispatch({
            type: 'fundList/fetch',
            payload: {
                page: current,
                page_size: pageSize,
                checked: 1
            }, 
        });
    }

    onChangePage = (current, pageSize) => {
        this.loadData(current, pageSize);
    }

    componentDidMount() {
        this.loadData(this.current, this.pageSize);
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
            onChange: (current) => this.onChangePage(current, this.pageSize),
        };

        return (
            <PageHeaderWrapper>
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

export default FactorIndex;