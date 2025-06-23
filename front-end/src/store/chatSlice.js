import {createSlice, createAsyncThunk, nanoid} from '@reduxjs/toolkit';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({text}, {getState, requestId, rejectWithValue}) => {
    const state = getState();
    const sessionId = state.session.data?.id;
    const appName = 'app';
    const userId = 'user';

    if (!sessionId) return rejectWithValue({requestId, error: 'No session ID available'});

    try {
      const response = await fetch(`${API_BASE_URL}/run`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          appName,
          userId,
          sessionId,
          newMessage: {
            role: 'user',
            parts: [{text}],
          },
          streaming: false,
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch problem');

      const responseJson = await response.json();
      const textEntry = responseJson.reverse().find(
        entry => entry?.content?.parts?.[0]?.text
      ); // Agent configured to return human-readable response at the end
      const modelText = textEntry?.content?.parts?.[0]?.text ?? '(no response)';
      return {requestId, modelText};
    } catch (err) {
      return rejectWithValue({requestId, error: err.message});
    }
  }
);


const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    addSubmissionMessage: (state, action) => {
      const {text, submissionId} = action.payload;
      state.data.push({
        id: crypto.randomUUID(),
        text,
        from_user: true,
        submissionId,
      });
    },
    addThinkingBotMessage: (state, action) => {
      const {id, submissionId, text} = action.payload;
      state.data.push({
        id,
        text,
        from_user: false,
        submissionId,
      });
    },
    updateBotMessageText: (state, action) => {
      const {id, text} = action.payload;
      const msg = state.data.find(m => m.id === id);
      if (msg) msg.text = text;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(sendMessage.pending, (state, action) => {
        const requestId = action.meta.requestId;
        const text = action.meta.arg.text;

        state.loading = true;
        state.error = null;
        const isFinal = text.includes("Transfer to agent 'Evaluator'");

        state.data.push({
          id: nanoid(),
          text,
          from_user: true,
          ...(isFinal && {isFinal: true}),
        });

        state.data.push({
          id: requestId,
          text: null,
          from_user: false,
          isPlaceholder: true,
        });
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;

        const idx = state.data.findIndex(msg => msg.id === action.payload.requestId);
        if (idx !== -1) {
          state.data[idx] = {
            id: action.payload.requestId,
            text: action.payload.modelText,
            from_user: false,
          };
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Unknown error';

        const idx = state.data.findIndex(msg => msg.id === action.payload?.requestId);
        if (idx !== -1) {
          state.data[idx] = {
            id: action.payload.requestId,
            text: `${state.error}`,
            from_user: false,
          };
        }
      });
  },
});

export const {
  addSubmissionMessage,
  addThinkingBotMessage,
  updateBotMessageText,
} = chatSlice.actions;
export default chatSlice.reducer;
