import React, { Component } from "react";
import GraphHolder from "./GraphHolder.jsx";
import LineChart from "./LineChart.jsx";
import { connect } from "react-redux";
import * as actions from "../../action-creators/connections";
import * as eventActions from "../../action-creators/eventsConnections";

const mapStateToProps = (store) => {
  return {
    currInstance: store.currInstanceStore.currInstance,
    currDatabase: store.currDatabaseStore.currDatabase,
    totalEvents: store.totalEventsStore.totalEvents,
    data: store.totalEventsStore.data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateCurrentDisplay: (filter, category) =>
    dispatch(actions.updateCurrDisplayActionCreator(filter, category)),
  getEvents: (instanceId, dbIndex, queryParams) =>
    dispatch(
      eventActions.getTotalEventsActionCreator(instanceId, dbIndex, queryParams)
    ),
  getNextEvents: (instanceId, dbIndex, queryParams) =>
    dispatch(
      eventActions.getNextEventsActionCreator(instanceId, dbIndex, queryParams)
    ),
});

class GraphComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wasCalled: false,
      params: { timeInterval: 10000 },
      eventParams: { eventTotal: this.props.eventTotal },
    };
    this.setGraphUpdate = this.setGraphUpdate.bind(this);
  }
  componentDidMount() {
    // console.log("state event params", this.state.eventParams);
    const self = this;
    this.getInitialData(this.props.currInstance, this.props.currDatabase, {
      timeInterval: 10000,
    });
    // }
    // setTimeout(setInterval(this.setGraphUpdate, 10000), 10000);
  }
  getInitialData(currInstance, currDB, params) {
    this.props.getEvents(currInstance, currDB, params);
    this.setState({
      wasCalled: true,
    });
  }
  setGraphUpdate() {
    return this.props.getNextEvents(
      this.props.currInstance,
      this.props.currDatabase,
      // this.state.eventParams
      { eventTotal: this.props.totalEvents.eventTotal }
    );
  }

  render() {
    console.log("props in graphComponent", this.props);

    // if (this.props.data) {
    return (
      <div id='graphsComponentContainer' className='GraphComponent-Container'>
        <LineChart
          getEvents={this.props.getEvents}
          currInstance={this.props.currInstance}
          currDatabase={this.props.currDatabase}
          // totalEvents={this.props.totalEvents}
          data={this.props.data}
        />
      </div>
    );
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphComponent);
