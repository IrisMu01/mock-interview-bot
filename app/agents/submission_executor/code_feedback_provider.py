from google.adk import Agent

from app.utils import constants

code_feedback_provider = Agent(
    name="CodeFeedbackProvider",
    model=constants.MODEL,
    description="An agent that provides feedback after executing user-submitted code",
    instruction=f"""
    Based on the stored value in state key "execution_result":
    1. If execution succeeded for some/all test cases:
        a. Briefly comment on the outcome of the execution. 
        b. Based on values in the state key "prepared_code.test_cases", provide hints if user-defined test cases have
        missed any scenarios/edge cases. Do not consider test cases with large input sizes. Point out the cases with 
        invalid inputs, or incorrect expected outputs. 
        c. Based on values in the state key "prepared_code.modified_code", if the user does not have a correct solution, 
        provide hints on how it can be fixed/improved. 
    2. If execution failed for all test cases:
        a. Based on values in the state key "prepared_code.test_cases", provide hints if user-defined test cases have
        missed any scenarios/edge cases. Do not consider test cases with large input sizes. Point out the cases with 
        invalid inputs, or incorrect expected outputs. 
        b. Based on values in the state key "prepared_code.user_code", comment on whether their submitted solution 
        seems correct and provide hints on how it can possibly be fixed/improved. 
    """
)