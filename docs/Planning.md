## When will a tool actually be useful?
- execute user-provided code snippet against test args; return execution results
- write into some database on how the user has performed during the interview

## The multi-agent system


### Multi-agent system
- coordinate/dispatcher pattern
- agents:
  - interview_conductor
    - purposes:
      - converse with user, and evaluate verbal responses from the user
      - provide clarifications on the problem
      - evaluate user-provided algorithm
      - provide high-level, short hints when user says they're stuck
    - implementation:
      - really specific prompt
      - no need for tools
  - code_copilot
    - purpose:
      - context: a problem, user-submitted code (user-specified code language), user-submitted test cases
      - call out users on: correct implementation of the algorithm, missing test cases
      - overlook minor errors such as sensible-but-wrong method names, syntax errors
  - performance_tracker
    - input: from the other 2 agents, relayed from coordinator
    - stores in context:
      - for each criterion, whether the user did well or need improvement in the area
        - for improvement: elaborate on what the user did, and what could be a better approach