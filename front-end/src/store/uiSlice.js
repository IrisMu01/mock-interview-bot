import {createSlice} from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    activeTab: 0,
    expandedSubmissionId: null,
    user_code: `def solution():\n    pass`,
    test_cases: `[{
  "input": [1, 2, 3],
  "expected": 6
}]`,
    confirmingEnd: false,
    concluded: false,
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setExpandedSubmissionId: (state, action) => {
      state.expandedSubmissionId = action.payload;
    },
    setUserCode: (state, action) => {
      state.user_code = action.payload;
    },
    setTestCases: (state, action) => {
      state.test_cases = action.payload;
    },
    setConfirmingEnd: (state, action) => {
      state.confirmingEnd = action.payload;
    },
    setConcluded: (state, action) => {
      state.concluded = action.payload;
      state.confirmingEnd = false;
    },
  },
});

export const {
  setActiveTab,
  setExpandedSubmissionId,
  setUserCode,
  setTestCases,
  setConfirmingEnd,
  setConcluded,
} = uiSlice.actions;
export default uiSlice.reducer;
