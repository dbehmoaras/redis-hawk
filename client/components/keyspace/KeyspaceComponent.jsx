import React, { Component } from 'react';
import { connect } from 'react-redux';
import KeyspaceTable from './KeyspaceTable.jsx';
import * as actions from '../../action-creators/connections';
import * as keyspaceActions from '../../action-creators/keyspaceConnections';

const mapStateToProps = (store) => {
  return {
    currInstance: store.currInstanceStore.currInstance,
    currDatabase: store.currDatabaseStore.currDatabase,
    keyspace: store.keyspaceStore.keyspace,
    currDisplay: store.currDisplayStore.currDisplay,
    pageSize: store.dataPageStore.pageSize,
    pageNum: store.dataPageStore.pageNum,
  };
};
const mapDispatchToProps = (dispatch) => ({
  updatePageSize: (pageSize) =>
    dispatch(actions.updatePageSizeActionCreator(pageSize)),
  updatePageNum: (pageNum) =>
    dispatch(actions.updatePageNumActionCreator(pageNum)),
  changeKeyspacePage: (instanceId, dbIndex, queryOptions) =>
    dispatch(
      keyspaceActions.changeKeyspacePageActionCreator(
        instanceId,
        dbIndex,
        queryOptions
      )
    ),
});

class KeyspaceComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log('all the props in keyspace component', this.props);
    return (
      <div
        id='keyspaceComponentContainer'
        className='KeyspaceComponent-Container'
      >
        <KeyspaceTable
          currDatabase={this.props.currDatabase}
          keyspace={this.props.keyspace}
          currDisplay={this.props.currDisplay}
          currInstance={this.props.currInstance}
          updatePageSize={this.props.updatePageSize}
          updatePageNum={this.props.updatePageNum}
          changeKeyspacePage={this.props.changeKeyspacePage}
          pageNum={this.props.pageNum}
          pageSize={this.props.pageSize}
          myCount={
            this.props.keyspace[this.props.currInstance - 1].keyspaces[
              this.props.currDatabase
            ].keyTotal
          }
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KeyspaceComponent);
