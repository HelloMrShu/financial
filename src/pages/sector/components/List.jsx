import React from 'react';
import { connect } from 'umi';
import { Table, Space, message, Popconfirm } from 'antd';
import { del, normal, lock, authList, doAssign } from '@/services/user';
import Assignment from '@/pages/manage/components/Assignment';

class UserList extends React.Component {
  state = {
    showAssignment: false,
    currentId: 0,
    currentUser: '',
    initialAssign: {},
  };

  columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '登录类型',
      dataIndex: 'loginTypeDisplay',
      key: 'loginType',
    },
    {
      title: '状态',
      dataIndex: 'statusDisplay',
      key: 'status',
    },
    {
      title: '修改时间',
      dataIndex: 'modified',
      key: 'modified',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, item) => (
        <Space size="middle">
          {item.status === 0 && <a onClick={(e) => this.showAssign(item, e)}>分配</a>}
          {item.status > -9 && (
            <Popconfirm
              title={`确定删除${item.username}吗？`}
              onConfirm={() => this.onDelete(item.id)}
            >
              <a>删除</a>
            </Popconfirm>
          )}
          {item.status > -5 && (
            <Popconfirm
              title={`确定锁定${item.username}吗？`}
              onConfirm={() => this.onLock(item.id)}
            >
              <a>锁定</a>
            </Popconfirm>
          )}
          {item.status === -9 && (
            <Popconfirm
              title={`确定恢复${item.username}吗？`}
              onConfirm={() => this.onNormal(item.id)}
            >
              <a>恢复</a>
            </Popconfirm>
          )}
          {item.status === -5 && (
            <Popconfirm
              title={`确定解锁${item.username}吗？`}
              onConfirm={() => this.onNormal(item.id)}
            >
              <a>解锁</a>
            </Popconfirm>
          )}
          {item.status === -1 && (
            <Popconfirm
              title={`确定激活${item.username}吗？`}
              onConfirm={() => this.onNormal(item.id)}
            >
              <a>激活</a>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'manageAuth/fetchAssign',
    });
  }

  showAssign = (user, e) => {
    e.preventDefault();

    authList(user.id).then(({ status, content }) => {
      if (status === 'ok') {
        this.setState({
          currentId: user.id,
          currentUser: user.username,
          showAssignment: true,
          initialAssign: content.list,
        });
      } else {
        message.error('读取远程数据错误！');
      }
    });
  };

  onDelete = (id) => {
    del({ id }).then(({ status }) => {
      if (status === 'ok') {
        if (this.props.reload) {
          this.props.reload();
        }
      } else {
        message.error('服务器错误');
      }
    });
  };

  onLock = (id) => {
    lock({ id }).then(({ status }) => {
      if (status === 'ok') {
        if (this.props.reload) {
          this.props.reload();
        }
      } else {
        message.error('服务器错误');
      }
    });
  };

  onNormal = (id) => {
    normal({ id }).then(({ status }) => {
      if (status === 'ok') {
        if (this.props.reload) {
          this.props.reload();
        }
      } else {
        message.error('服务器错误');
      }
    });
  };

  onAssignment = (args) => {
    const params = {
      id: args.id,
      items: args.role.concat(args.task, args.item),
    };

    doAssign(params).then(({ status }) => {
      if (status === 'ok') {
        this.setState({
          currentId: 0,
          currentUser: '',
          initialAssign: {},
          showAssignment: false,
        });
      } else {
        message.error('提交数据失败！');
      }
    });
  };

  onHideAssignment = () => {
    this.setState({
      currentId: 0,
      currentUser: '',
      initialAssign: {},
      showAssignment: false,
    });
  };

  render() {
    const { assignList, page, userList, total, pageSize, onPageChange } = this.props;
    const { showAssignment, currentId, currentUser, initialAssign } = this.state;

    return (
      <>
        <Assignment
          data={assignList}
          initialData={{ id: currentId, ...initialAssign }}
          title={`分配权限（${currentUser}）`}
          visible={showAssignment}
          onFinish={this.onAssignment}
          onCancel={this.onHideAssignment}
        />
        <Table
          dataSource={userList || []}
          columns={this.columns}
          rowKey="id"
          pagination={{
            total,
            pageSize,
            current: page,
            onChange: onPageChange,
            position: ['bottomCenter'],
            showSizeChanger: false,
          }}
        />
      </>
    );
  }
}

export default connect(({ manageAuth }) => ({
  assignList: manageAuth.assignList,
}))(UserList);
