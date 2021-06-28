import { CHANGE_BILL_TYPE, ADD_HOUSEMATE, REMOVE_HOUSEMATE, CHANGE_STD_WATER_BILL, 
    CHANGE_USG_WATER_BILL, CHANGE_STD_GE_BILL, CHANGE_USG_GE_BILL, 
    CHANGE_BROADBAND_BILL,  CHANGE_SPLIT_OPTION, SET_USER_DAYS, 
    SET_DURATION_OF_BILL, SET_DATE_OF_BILL} from './constants';

// Set of actions that are used to dispatch to the store.
// Describes a type that matches within the reducer function, 
// and also a payload.
export const addHousemate = (name) => (
    { type: ADD_HOUSEMATE, name: name }
);

export const removeHousemate = (key) => (
    { type: REMOVE_HOUSEMATE, key: key }
);

export const changeBillType = (bill) => (
    { type: CHANGE_BILL_TYPE, bill: bill }
);

export const setBroadbandBill = (value) => (
    {type: CHANGE_BROADBAND_BILL, value: value}
);

export const setStdWaterBill = (value) => (
    {type: CHANGE_STD_WATER_BILL, value: value}
);

export const setUsgWaterBill = (value) => (
    {type: CHANGE_USG_WATER_BILL, value: value}
);

export const setStdGEBill = (value) => (
    {type: CHANGE_STD_GE_BILL, value: value}
);

export const setUsgGEBill = (value) => (
    {type: CHANGE_USG_GE_BILL, value: value}
);

export const setSplitOption = (option) => (
    {type: CHANGE_SPLIT_OPTION, option: option}
);

export const setUserDays = (key, days) => (
    {type: SET_USER_DAYS, key: key, days: days}
);

export const setDurationOfBill = (days) => (
    {type: SET_DURATION_OF_BILL, days: days}
);

export const setDateOfBill = (date) => (
    {type: SET_DATE_OF_BILL, date: date}
);