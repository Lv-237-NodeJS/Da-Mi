import { API } from './../helper/constants';
import request from './../helper/request';

const FETCH_GIFTS_SUCCESS = 'FETCH_GIFTS_SUCCESS';
const FETCH_GIFTS_FAIL = 'FETCH_GIFTS_FAIL';
const CREATE_GIFT_SUCCESS = 'CREATE_GIFT_SUCCESS';
const CREATE_GIFT_FAIL = 'CREATE_GIFT_FAIL';
const DELETE_GIFT_SUCCESS = 'DELETE_GIFT_SUCCESS';
const DELETE_GIFT_FAIL = 'DELETE_GIFT_FAIL';
const UPDATE_GIFT_SUCCESS = 'UPDATE_GIFT_SUCCESS';
const UPDATE_GIFT_FAIL = 'UPDATE_GIFT_FAIL';

export const fetchGifts = eventId => {
  return dispatch => {
    return request()
      .get(`${API.URL}/api/events/${eventId}/gifts`)
      .end((err, res) => err &&
          dispatch({
            type: FETCH_GIFTS_FAIL,
            payload: err
          }) ||
          dispatch({
            type: FETCH_GIFTS_SUCCESS,
            payload: res.body
          })
      );
  };
};

export const createGift = (eventId, gift) => {
  return dispatch => {
    return request()
      .post(`${API.URL}/api/events/${eventId}/gifts`)
      .send(gift)
      .end((err, res) => err &&
          dispatch({
            type: CREATE_GIFT_FAIL,
            payload: err
          }) ||
          dispatch({
            type: CREATE_GIFT_SUCCESS,
            payload: res.body
          })
      );
  };
};

export const updateGift = (eventId, giftId, gift) => {
  return dispatch => {
    return request()
      .put(`${API.URL}/api/event/${eventId}/gift/${giftId}`)
      .send(gift)
      .end((err, res) => err &&
          dispatch({
            type: UPDATE_GIFT_FAIL,
            payload: err
          }) ||
          dispatch({
            type: UPDATE_GIFT_SUCCESS,
            payload: res.body
          })
      );
  };
};

export const deleteGift = (eventId, giftId) => {
  return dispatch => {
    return request()
      .delete(`${API.URL}/api/event/${eventId}/gift/${giftId}`)
      .end((err, res) => err &&
          dispatch({
            type: DELETE_GIFT_FAIL,
            payload: err
          }) ||
          dispatch({
            type: DELETE_GIFT_SUCCESS,
            payload: giftId
          })
      );
  };
};

const initialState = {
  gifts: [],
  error: null
};

const giftReducer = (state = initialState, action) => {
  let error;
  switch (action.type) {
    case FETCH_GIFTS_SUCCESS: {
      return {
        ...state,
        gifts: action.payload,
        error: null
      };
    }
    case FETCH_GIFTS_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case CREATE_GIFT_SUCCESS: {
      return {
        ...state,
        gifts: [action.payload, ...state.gifts],
        error: null
      };
    }
    case CREATE_GIFT_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case UPDATE_GIFT_SUCCESS: {
      return {...state,
        gifts: [action.payload, ...state.gifts.filter(gift => gift.id !== action.payload.id)],
        error: null
      };
    }
    case UPDATE_GIFT_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case DELETE_GIFT_SUCCESS: {
      return {
        ...state,
        gifts: state.gifts.filter(gift => gift.id !== action.payload),
        error: null
      };
    }
    case DELETE_GIFT_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    default: return state;
  }
};

export default giftReducer;
