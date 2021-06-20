import { CHANGE_BILL_TYPE, ADD_HOUSEMATE, REMOVE_HOUSEMATE, CHANGE_STD_WATER_BILL, 
            CHANGE_USG_WATER_BILL, CHANGE_STD_GE_BILL, CHANGE_USG_GE_BILL, 
            CHANGE_BROADBAND_BILL,  CHANGE_SPLIT_OPTION, CHANGE_USER_PRESENT_DAYS} from '../actions/constants';

const initialState = {
    housemates: [],
    billType: "Gas/electric",
    usgWaterBill: '0',
    stdWaterBill: '0',
    usgGEBill: '0',
    stdGEBill: '0',
    broadbandBill: '0',
    splitOption: "even",
    daysPresent: []
};

// This handles the logic on behalf of the action.
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_BILL_TYPE:
            return {
                ...state, 
                billType: action.bill
            };
        case ADD_HOUSEMATE:
            return {...state, 
                housemates: state.housemates.concat({
                    key: Math.random().toString(),
                    name: action.data
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
            console.log("hello");
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
            return;
        case CHANGE_USER_PRESENT_DAYS:
            return;
        default:
            return state;
    }
};

export default reducer;