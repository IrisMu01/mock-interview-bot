### [front-end]
- build front-end application with react, and hook it up to the /prod-ui/ endpoint in fastAPI
- in the single-page app the left panel is used as a chatbox with the mock interview bot
- right panel allows the user to write python code, define test cases, and submit the code to the bot
  - submit button generates the prompt, which is prepended with "I'd like to submit a code solution. Transfer to agent 'SubmissionExecutor''"
  - print AI-generated test harness and run results in another tab of the right panel
  - only print final response from `CodeFeedbackProvider`
- button to conclude the interview
  - prepends prompt with "I'd like to conclude this mock interview. Transfer to agent 'Evaluator'"

### [deployment]
- project skeleton already has terraform templates, deploy to GCP