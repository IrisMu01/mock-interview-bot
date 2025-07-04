import json

from google.adk import Agent
from google.adk.agents import SequentialAgent
from pydantic import BaseModel, Field

from app.utils import constants

class EvaluationOutput(BaseModel):
    input_output_clarifications: bool = Field(
        description="Whether the user is aware of valid inputs and expected outputs. By default False.")
    constraint_clarifications: bool = Field(
        description="Whether the user is aware of time and space complexity constraints. By default False.")
    no_excessive_hints: bool = Field(
        description="Whether the user does not ask for too many hints when stuck. By default None.")
    brute_force_first: bool = Field(
        description="Whether the user considers a brute-force solution if the optimal approach isn't obvious. By default False.")
    optimal_algorithm: bool = Field(
        description="Whether the user describes a correct, optimal algorithm. By default False.")
    correct_complexities: bool = Field(
        description="Whether the user describes correct time and space complexities. By default False.")
    discussion_before_code: bool = Field(
        description="Whether the user discusses the problem thoroughly before starting to write code. By default False.")
    clean_code: bool = Field(
        description="Whether the user writes clean, readable code. By default False.")
    testing_considerations: bool = Field(
        description="Whether the user considers various test cases and includes edge cases. By default False.")
    clear_debugging: bool = Field(
        description="Whether the user clearly describes debugging thought process when implementation is buggy. By default False.")
    correct_implementation: bool = Field(
        description="Whether the user implements the algorithm correctly with the expected time and space complexities. By default False.")

eval_generator = Agent(
    name="EvalGenerator",
    model = constants.MODEL,
    description = "An agent that evaluates user performance in the mock interview.",
    instruction=f"""
    You are a technical interviewer assisting with a live coding interview with the user. Your role is to produce 
    evaluations on user performance. 
    
    Analyze this session's conversation history, focusing on user messages. 
    Respond ONLY with a JSON object matching this exact schema:
    ${json.dumps(EvaluationOutput.model_json_schema(), indent=2)}
    Do not use any tools. 
    """,
    tools=[],
    output_key="evaluation_result",
)

eval_describer = Agent(
    name="EvaluationDescriber",
    model=constants.MODEL,
    description = "An agent that provides mock interview feedback",
    instruction=f"""
    Provide feedback on user's mock interview performance if state key "evaluation_result" is valid.
    List all the criteria they have done well on, 
    but only list the 3 most important things that they can improve on. 
    """
)

evaluator =SequentialAgent(
    name="Evaluator",
    sub_agents=[eval_generator, eval_describer]
)
