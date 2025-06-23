import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {addSubmissionMessage, addThinkingBotMessage, updateBotMessageText} from './chatSlice';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

let submissionCounter = 0;

export const submitCode = createAsyncThunk(
  'submission/submitCode',
  async ({user_code, test_cases}, {dispatch, getState}) => {
    const id = submissionCounter++;
    const state = getState();
    const sessionId = state.session.data?.id;
    const appName = 'app';
    const userId = 'user';

    const formattedText = [
      `I’d like to submit a code solution. Transfer to agent ‘SubmissionExecutor’.`,
      `Code:\n${user_code}`,
      `Test cases:\n${test_cases}`
    ].join('\n\n');

    // 1. Create user message
    dispatch(addSubmissionMessage({text: formattedText, submissionId: id}));

    // 2. Add temporary bot "loading" message
    const botMsgId = crypto.randomUUID();
    dispatch(addThinkingBotMessage({
      id: botMsgId,
      submissionId: id,
      text: null, // text=null triggers spinner
    }));

    // 3. Make the request
    const response = await fetch(`${API_BASE_URL}/run`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        appName,
        userId,
        sessionId,
        newMessage: {
          role: 'user',
          parts: [{text: formattedText}],
        },
        streaming: false,
      }),
    });

    const responseJson = await response.json();

    let generated_test_harness = null;
    let execution_result = null;
    let feedback = null;

    for (const entry of responseJson) {
      const parts = entry?.content?.parts || [];
      for (const part of parts) {
        if (part.executableCode) generated_test_harness = part.executableCode;
        if (part.codeExecutionResult) execution_result = part.codeExecutionResult;
        if (part.text) feedback = part.text;
      }
    }

    // 4. Update bot message with final text
    dispatch(updateBotMessageText({
      id: botMsgId,
      text: feedback || 'No feedback returned.',
    }));

    return {
      id,
      user_code,
      test_cases,
      generated_test_harness,
      execution_result,
      feedback: JSON.stringify(responseJson, null, 2),
    };
  }
);

const submissionSlice = createSlice({
  name: 'submission',
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(submitCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitCode.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(submitCode.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default submissionSlice.reducer;
