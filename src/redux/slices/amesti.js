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
  model: {},
  set: 0,
  filesRedux: [],
  estufaTime: [],
  filesNest: []
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
    },
    hasSet(state, action) {
      state.set = action.payload;
    },
    hasFile(state, action) {
      state.filesRedux = action.payload;
    },
    hasNest(state, action) {
      state.filesNest = action.payload;
    },

    hasEstufaTime(state, action) {
      state.estufaTime = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, hasCantidad, hasTime, hasModel, hasSet, hasFile, hasNest, hasEstufaTime } = slice.actions;

// ----------------------------------------------------------------------

export function createEvent(newEvent, token) {
  console.log(newEvent, 'CANTIDAD');
  return async (dispatch) => {
    console.log('inside try');
    try {
      const response = await Axios.post(`${apiEndpoint}/todosnest`, JSON.stringify(newEvent), {
        headers: {
          'Content-Type': 'application/json',
          // prettier-ignore
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response);
      const miniSet = Math.random();
      dispatch(slice.actions.hasSet(miniSet));
      dispatch(slice.actions.startLoading());
    } catch (error) {
      console.log(error);
    }
  };
}

//-----------------------------------------------------------------------

export function getTodosFilestRedux(idToken) {
  console.log('Fetching todos from todosnest');

  return async (dispatch) => {
    // dispatch(slice.actions.startLoading());

    console.log('inside try');
    try {
      const response = await Axios.get(`${apiEndpoint}/gettodos`, {
        headers: {
          'Content-Type': 'application/json',
          // prettier-ignore
          'Authorization': `Bearer ${idToken}`
        }
      });
      dispatch(slice.actions.hasFile(response.data.items));
      const miniSet = Math.random();
      dispatch(slice.actions.hasSet(miniSet));
      dispatch(slice.actions.startLoading({}));
    } catch (error) {
      console.log(error);
      // dispatch(slice.actions.hasError(error));
    }
  };
}

//-----------------------------------------------------------------------

export function getTodosNest(idToken) {
  console.log('Fetching todos from todosnest');

  return async (dispatch) => {
    // dispatch(slice.actions.startLoading());

    console.log('inside try');
    try {
      console.log('Fetching todos from todosnest');

      const response = await Axios.get(`${apiEndpoint}/getnest`, {
        headers: {
          'Content-Type': 'application/json',
          // prettier-ignore
          'Authorization': `Bearer ${idToken}`
        }
      });

      console.log('Todos:', response);
      dispatch(slice.actions.hasNest(response.data.items));
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
      console.log('inside timetable');
      console.log(response);
      // dispatch(slice.actions.createEventSuccess(response.data.event));
    } catch (error) {
      console.log(error);
      // dispatch(slice.actions.hasError(error));
    }
  };
}

//--------------------------------------------------------------------------
export function getAllTimeEstufa(token) {
  return async (dispatch) => {
    try {
      const response = await Axios.get(`${apiEndpoint}/estufatime`, {
        headers: {
          'Content-Type': 'application/json',
          // prettier-ignore
          'Authorization': `Bearer ${token}`
        }
      });

      console.log(response);
      dispatch(slice.actions.hasEstufaTime(response.data.items));
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
