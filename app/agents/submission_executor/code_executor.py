from google.adk import Agent
from google.adk.code_executors import BuiltInCodeExecutor

from app.utils import constants

code_executor = Agent(
    name="CodeExecutor",
    model=constants.MODEL,
    description="An agent that executes the generated test harness.",
    instruction="""
    If the state key "test_harness" is populated, execute the Python code
    stored in this state key.
    Return only the output from executing the Python module.
    """,
    code_executor=BuiltInCodeExecutor(),
    output_key="code_execution_result"
)