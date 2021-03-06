import React, { Component } from 'react';
import { Select, Form } from 'antd';
import { connect } from 'dva';

@connect(({ sectorList, loading }) => ({
    sectorList,
    loading: loading.models.sectorList,
}))

class SectorSelection extends Component {

    current = 1
    pageSize = 50

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

    render() {
        const {
            sectorList: { list, pagination },
            loading,
        } = this.props;
    
        return (
            <Form.Item
              name="Sector_id"
              id="select"
              label="所属板块"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 10 }}>
                <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder="请选择板块"
                    >
                        {list ? list.map((item) => (
                        <Option value={item.Id}>
                          {item.Name}
                        </Option>
                      ))
                    : null}
                </Select>
            </Form.Item>
        );
    }
};

export default SectorSelection;