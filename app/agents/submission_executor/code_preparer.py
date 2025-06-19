import json
from typing import TypedDict

from google.adk import Agent
from pydantic import BaseModel, Field

from app.utils import constants

class TestCase(TypedDict):
    input: str
    expected: str

class CodePreparerOutput(BaseModel):
    user_code: str = Field(description="Unedited version of the user-submitted solution")
    modified_code: str = Field(
        description="AI-modified version of user-submitted code that ONLY fixes minor syntax errors.")
    test_cases: list[TestCase] = Field(description="List of test cases")

code_preparer = Agent(
    name="CodePreparer",
    model=constants.MODEL,
    description="An agent that prepares user-written solution and user-defined test cases for test harness generation",
    instruction=f"""
    Based on the user's most recently submitted solution, which is a Python function,
    fix the minor syntactical errors in user's code.
    Do NOT fix any logic errors, do NOT fix any out-of-bound/dict-no-key/None errors.
    Keep code structure exactly the same, do NOT refactor.

    Respond ONLY with a JSON object matching this exact schema:
    ${json.dumps(CodePreparerOutput.model_json_schema(), indent=2)}
    Do not use any tools.
    """,
    tools=[],
    output_key="prepared_code",
)