//leave these separate for future developers in case they want to add functionality
import * as types from '../actions/actionTypes.js';

const initialState = {
  currInstance: 1,
  currDatabase: 0,
  events: [
    {
      instanceId: 1,
      keyspaces: [
        {
          eventTotal: 1,
          pageSize: 25,
          pageNum: 4,
          data: [
            {
              key: 'loading',
              event: 'loading',
              timestamp: 'loading',
            },
          ],
        },
      ],
    },
  ],
};

const eventsReducer = (state = initialState, action) => {
  let events;

  switch (action.type) {
    case types.LOAD_ALL_EVENTS: {
      const allEvents = action.payload.events;
      events = state.events.slice();
      events = allEvents;
      // console.log("events in eventreducer", events);
      return {
        ...state,
        events,
      };
    }
    case types.REFRESH_EVENTS: {
      const specificInstanceEvents = action.payload.events;
      const currInstance = action.payload.currInstance;
      const currDatabase = action.payload.currDatabase;
      let updateEvents = state.events.slice();
      events[currInstance - 1].keyspacees[currDatabase] =
        specificInstanceEvents;

      return {
        ...state,
        events: updateEvents,
      };
    }
    case types.CHANGE_EVENTS_PAGE: {
      const specificInstanceEvents = action.payload.events;
      const currInstance = action.payload.currInstance;
      const currDatabase = action.payload.currDatabase;
      events = state.events.slice();
      events[currInstance - 1].keyspaces[currDatabase] = specificInstanceEvents;
      return {
        ...state,
        events,
      };
    }

    default: {
      return state;
    }
  }
};

export default eventsReducer;
