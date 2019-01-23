const ADD_GUN = "ADD_GUN";
const REDUCE_GUN = "REDUCE_GUN";

export const addGun = payload => ({ type: ADD_GUN, payload });
export const reduceGun = payload => ({ type: REDUCE_GUN, payload });

export const guns = (state = 10, action) => {
    switch (action.type) {
        case ADD_GUN:
            return state+1;
        case REDUCE_GUN:
            return state-1;

        default:
            return state;
    }
};
