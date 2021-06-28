import { CHANGE_BILL_TYPE, ADD_HOUSEMATE, REMOVE_HOUSEMATE, CHANGE_STD_WATER_BILL, 
            CHANGE_USG_WATER_BILL, CHANGE_STD_GE_BILL, CHANGE_USG_GE_BILL, 
            CHANGE_BROADBAND_BILL,  CHANGE_SPLIT_OPTION, SET_USER_DAYS, 
            SET_DURATION_OF_BILL, SET_DATE_OF_BILL} from '../actions/constants';

const initialState = {
    housemates: [],
    billType: "Gas/electric",
    usgWaterBill: '0.00',
    stdWaterBill: '0.00',
    usgGEBill: '0.00',
    stdGEBill: '0.00',
    broadbandBill: '0.00',
    splitOption: false,
    dateOfBill: "",
    durationOfBill: 0
};

const updateHousemateDays = (array, action) => {
    return array.map((item) => {
        if (item.key != action.key) {
            return item;
        }
        return {
            ...item,
            days: action.days
        }
    });
}

// This handles the logic on behalf of a dispatched action.
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_BILL_TYPE:
            return {
                ...state, 
                billType: action.bill
            };
        case ADD_HOUSEMATE:
            return {
                ...state, 
                housemates: state.housemates.concat({
                    key: Math.random().toString(),
                    name: action.name,
                    days: 0
                })
            };
        case REMOVE_HOUSEMATE:
            return {
                ...state,
                housemates: state.housemates.filter((item) =>
                    item.key != action.key)
            };
        case CHANGE_STD_WATER_BILL:
            return {
                ...state,
                stdWaterBill: action.value
            };
        case CHANGE_USG_WATER_BILL:
            return {
                ...state,
                usgWaterBill: action.value
            };
        case CHANGE_STD_GE_BILL:
            return {
                ...state,
                stdGEBill: action.value
            };
        case CHANGE_USG_GE_BILL:
            return {
                ...state,
                usgGEBill: action.value
            };
        case CHANGE_BROADBAND_BILL:
            return {
                ...state,
                broadbandBill: action.value
            };
        case CHANGE_SPLIT_OPTION:
            return {
                ...state,
                splitOption: action.option
            };
        case SET_USER_DAYS:
            return {
                ...state,
                housemates: updateHousemateDays(state.housemates, action)
            };
        case SET_DURATION_OF_BILL:
            return {
                ...state,
                durationOfBill: action.days
            };
        case SET_DATE_OF_BILL:
            return {
                ...state,
                dateOfBill: action.date
            };
        default:
            return state;
    }
}

export default reducer;