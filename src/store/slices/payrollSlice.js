import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  payrollId: null // Initial state for payrollId
};

const payrollSlice = createSlice({
  name: 'payroll',
  initialState,
  reducers: {
    setPayrollId: (state, action) => {
      state.payrollId = action.payload;
    }
  }
});

export const { setPayrollId } = payrollSlice.actions;
export default payrollSlice.reducer;
