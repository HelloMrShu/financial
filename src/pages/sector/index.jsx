import React, { Component } from 'react';
import { Table, Space, message, Popconfirm, Pagination } from 'antd';
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
            type: 'sectorList/fetch'
        });
    };

    onChangePage = (current, pageSize) => {
        const { dispatch } = this.props;
            dispatch({
              type: 'sectorList/fetch',
              payload: {
                page: current,
                page_size: pageSize,
              },  
            }); 

        // const params = {
        //   page: current,
        //   page_size: pageSize,
        // };
        // dispatch({
        //   type: 'sectorList/fetch',
        //   payload: params,
        // })
      }

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