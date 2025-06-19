from google.adk.agents import SequentialAgent

from app.agents.submission_executor.code_preparer import code_preparer
from app.agents.submission_executor.code_feedback_provider import code_feedback_provider
from app.agents.submission_executor.code_executor import code_executor
from app.agents.submission_executor.test_harness_generator import test_harness_generator

submission_executor = SequentialAgent(
    name="SubmissionExecutor",
    sub_agents=[
        code_preparer,
        test_harness_generator,
        code_executor,
        code_feedback_provider
    ],
)