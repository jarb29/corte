import { createSlice } from '@reduxjs/toolkit';
// utils
import Axios from 'axios';
import axios from '../../utils/axios';

import { apiEndpoint } from '../../config';
// ----------------------------------------------------------------------

const initialState = {
  load: {},
  cantidad: 0,
  time: 0,
  model: {}
};

const slice = createSlice({
  name: 'amesti',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state, action) {
      state.load = action.payload;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // HAS CANTIDAD
    hasCantidad(state, action) {
      state.cantidad = action.payload;
    },
    hasTime(state, action) {
      state.time = action.payload;
    },
    hasModel(state, action) {
      state.model = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, hasCantidad, hasTime, hasModel } = slice.actions;

// ----------------------------------------------------------------------

export function createEvent(newEvent, token) {
  console.log(newEvent, 'CANTIDA');
  return async (dispatch) => {
    // dispatch(slice.actions.startLoading());

    console.log('inside try');
    try {
      const response = await Axios.post(`${apiEndpoint}/todosnest`, JSON.stringify(newEvent), {
        headers: {
          'Content-Type': 'application/json',
          // prettier-ignore
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('inside try');
      console.log(response);
      // dispatch(slice.actions.createEventSuccess(response.data.event));
    } catch (error) {
      console.log(error);
      // dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
export function createTimeTable(newEvent, token) {
  console.log(newEvent, 'CANTIDA');
  return async (dispatch) => {
    // dispatch(slice.actions.startLoading());

    console.log('inside try');
    try {
      const response = await Axios.post(`${apiEndpoint}/todostime`, JSON.stringify(newEvent), {
        headers: {
          'Content-Type': 'application/json',
          // prettier-ignore
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('inside try');
      console.log(response);
      // dispatch(slice.actions.createEventSuccess(response.data.event));
    } catch (error) {
      console.log(error);
      // dispatch(slice.actions.hasError(error));
    }
  };
}

//--------------------------------------------------------------------------
export function getAllPosts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/blog/posts/all');
      dispatch(slice.actions.getPostsSuccess(response.data.posts));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getPostsInitial(index, step) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/blog/posts', {
        params: { index, step }
      });
      const results = response.data.results.length;
      const { maxLength } = response.data;

      dispatch(slice.actions.getPostsInitial(response.data.results));

      if (results >= maxLength) {
        dispatch(slice.actions.noHasMore());
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getPost(title) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/blog/post', {
        params: { title }
      });
      dispatch(slice.actions.getPostSuccess(response.data.post));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getRecentPosts(title) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/blog/posts/recent', {
        params: { title }
      });

      dispatch(slice.actions.getRecentPostsSuccess(response.data.recentPosts));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
