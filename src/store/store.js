import { configureStore } from '@reduxjs/toolkit';
import payrollReducer from './slices/payrollSlice';
export const store = configureStore({
  reducer: { payroll: payrollReducer }
});

export default store;
