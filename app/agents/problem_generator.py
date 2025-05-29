import json

from google.adk import Agent
from google.adk.tools import ToolContext

from app.utils import constants

def write_problem_to_session(problem_json: str, tool_context: ToolContext):
    """
    Use this tool after generating the problem JSON.
    Formats the problem into a dictionary and stores it in the session state
    Args:
        problem_json (str): The string representing the problem JSON.
    """
    print("Writing problem to session...")
    problem = json.loads(problem_json)
    key_stem = "temp:problem"
    for key, value in problem.items():
        tool_context.state[f"{key_stem}_{key}"] = value
    print("After update: ")
    print(tool_context.state)
    return {"success": True, "problem": problem}

problem_generator = Agent(
    name="ProblemGenerator",
    model = constants.MODEL,
    description = "An agent that generates LeetCode-style coding questions.",
    instruction=f"""
    Generate a Python dictionary describing a LeetCode-style coding question.
    Do NOT send the full dict to user as response. Use tool write_problem_to_session instead.
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
    tools=[write_problem_to_session]
)
