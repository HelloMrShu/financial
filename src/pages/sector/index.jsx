import React, { Component } from 'react';
import { Table, Space, message, Popconfirm } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { deleteSector } from '@/services/sector';
import SectorAdd from "./components/Add";

@connect(({ sectorList, loading }) => ({
    sectorList,
    loading: loading.models.sectorList,
}))

class SectorIndex extends Component {
    // 定义表格的colum
    columns = [
        {
            title: '#',
            dataIndex: 'Id',
            key: 'Id',
        },
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
                    <Popconfirm key={item.Id} title={`确定删除【${item.Name}】？`} onConfirm={() => this.onDelete(item.Id)}>
                        <a>删除</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'sectorList/fetch',
        });
    };

    onDelete = (id) => {
        deleteSector({ id }).then(({ status }) => {
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
            sectorList: { list },
            loading,
        } = this.props;

        return (
            <PageHeaderWrapper>

                <Table loading={loading} dataSource={list} columns={this.columns} rowKey={(record, index) => index} />
            </PageHeaderWrapper>
        );
    }
};

export default SectorIndex;