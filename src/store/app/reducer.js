import { actionTypes } from './actions';

const getInitalState = () => ({
    theme: 'dark,'
});

const app = (state = getInitalState(), {type, payload}) => {
    switch(type) {
        case actionTypes.SET_THEME:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }
};

export default app;