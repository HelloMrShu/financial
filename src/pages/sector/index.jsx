import React, { Component } from 'react';
import { Table, Space, message, Popconfirm, Pagination } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { deleteSector, querySectors } from '@/services/sector';
import SectorAdd from "./components/Add";
import SectorEditor from "./components/Editor";

@connect(({ sectorList, loading }) => ({
    sectorList,
    loading: loading.models.sectorList,
}))

class SectorIndex extends Component {

    current = 1;
    pageSize = 10;
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
            title: '名称',
            dataIndex: 'Name',
            key: 'Name',
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
                    <SectorEditor
                        sector={item || {}}
                        onSuccess={() => {
                          this.reload();
                        }}
                    />
                    <Popconfirm
                        key={item.Id}
                        title={`确定删除【${item.Name}】？`}
                        onConfirm={() => this.onDelete(item.ID)}
                        >
                        <a>删除</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    loadData(current, pageSize) {
        const { dispatch } = this.props;
        dispatch({
            type: 'sectorList/fetch',
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
        deleteSector({ id }).then(({ code }) => {
            if (code == '200') {
                this.loadData(this.current, this.pageSize);
            } else {
                message.error('服务器数据删除异常');
            }
        });
    };

    render() {
        const {
            sectorList: { list, pagination },
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
                <SectorAdd success={this.reload} />
                <Table
                    bordered
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

export default SectorIndex;
