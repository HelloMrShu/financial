import React, { Component } from 'react';
import { Table, Space, message, Popconfirm, Pagination } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { deleteFund } from '@/services/fund';
import FundAdd from "./components/Add";
import FundEditor from "./components/Editor";
import FundDetail from "./components/Detail";

@connect(({ fundList, loading }) => ({
    fundList,
    loading: loading.models.fundList,
}))

class FundIndex extends Component {

    current = 1
    pageSize = 10
    firstShowEditor = false;

    state = {
        showEditor: false,
        sector: {},
    };

    handleEdit = (item, e) => {
        e.preventDefault();
        
        if (!this.firstShowEditor) {
            this.firstShowEditor = true;
        }

        this.setState({
            showEditor: true,
            sector: item,
        });
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
        },
        {
            title: '操作',
            dataIndex: '',
            key: '',
            render: (text, item) => (
                <Space size="middle">
                    <FundDetail
                        fund={item || {}}
                        onSuccess={() => {
                          this.reload();
                        }}
                    />
                    <FundEditor
                        fund={item || {}}
                        onSuccess={() => {
                          this.reload();
                        }}
                    />
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
            onChange: (current) => this.onChangePage(current, this.pageSize),
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