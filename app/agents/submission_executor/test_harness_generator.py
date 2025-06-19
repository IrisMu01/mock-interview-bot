from google.adk import Agent
from google.adk.agents import SequentialAgent
from google.adk.code_executors import BuiltInCodeExecutor

from app.utils import constants

test_harness_generator = Agent(
    name="TestHarnessGenerator",
    model=constants.MODEL,
    description="An agent that generates test harness Python code based on user-written solution.",
    instruction=f"""
    You are a helpful Python programmer. 

    You are given:
    1. A python function implementing the problem solution,
    stored in state key "prepared_code.modified_code";
    2. User-defined test cases as a list of dicts with keys "input" and "expected, 
    stored in state key "prepared_code.test_cases".

    Your task is to generate and execute a Python file that:
    1. contains the python function implementing the problem solution;
    2. executes the function on each test case;
    3. captures any errors raised;
    4. compares the actual output to the expected output;
    5. returns a list of dicts with keys "input", "error", "expected_output", "actual_output".
    
    Return only the Python file.
    """,
    code_executor=BuiltInCodeExecutor(),
    output_key="test_harness",
)

