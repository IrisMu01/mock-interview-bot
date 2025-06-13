import json

from google.adk import Agent

from app.utils import constants

problem_generator = Agent(
    name="ProblemGenerator",
    model = constants.MODEL,
    description = "An agent that generates LeetCode-style coding questions.",
    instruction=f"""
    Generate a Python dictionary describing a LeetCode-style coding question.
    Do NOT send the full dict to user as response.
    Respond only with the problem description and examples. 
    Do NOT include in the response the assumptions/valid_input/constraints/input_size. The 
    user is expected to ask about these in follow-up clarifications.

    The dict should have these following keys:
    "description": Generate a LeetCode-style coding question at the user's specified difficulty level in the user-specified topic if possible. Do NOT include any assumptions. Do NOT include text that's obviously a hint for any solution.
    "assumptions": A list of assumptions that user can make about the problem.
    "valid_input": Describe what is considered valid input for this question.
    "examples": Give 1-3 simple examples of inputs and expected outputs.
    "constraints": Optionally specify ideal time and space constraints.
    "input_size": Describe sizes for any variables/inputs in the problem.
    """,
    tools=[],
    output_key="problem"
)
