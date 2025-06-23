import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    activeTab: 0, // 0 = IDE, 1 = Submission
    expandedSubmissionId: null,
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setExpandedSubmissionId: (state, action) => {
      state.expandedSubmissionId = action.payload;
    },
  },
});

export const { setActiveTab, setExpandedSubmissionId } = uiSlice.actions;
export default uiSlice.reducer;
