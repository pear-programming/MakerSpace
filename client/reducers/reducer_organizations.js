import { FETCH_ORGS } from '../actions';

const INITIAL_STATE = { 
  all: [{ name: 'Caleb', location: 'Jen'}, { name: 'Ashley', location: 'Carlo'}],
  current: null
};

export default function(state = INITIAL_STATE, action){
  switch(action.type) {
    case FETCH_ORGS: 
      return {...state, all: action.payload.data};
    default:
      return state;
  }
}