import { CHANGE_BILL_TYPE, ADD_HOUSEMATE, CHANGE_STD_WATER_BILL, 
    CHANGE_USG_WATER_BILL, CHANGE_STD_GE_BILL, CHANGE_USG_GE_BILL, 
    CHANGE_BROADBAND_BILL,  CHANGE_SPLIT_OPTION, CHANGE_USER_PRESENT_DAYS, REMOVE_HOUSEMATE} from './constants';

export const addHousemate = (name) => (
    { type: ADD_HOUSEMATE, data: name }
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