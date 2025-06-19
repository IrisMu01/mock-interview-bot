# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os

import google.auth
from google.adk.agents import Agent

from app.agents.submission_executor.root_submission_executor import submission_executor
from app.agents.evaluator import evaluator
from app.agents.interviewer import interviewer
from app.agents.problem_generator import problem_generator
from app.utils import constants

_, project_id = google.auth.default()
os.environ.setdefault("GOOGLE_CLOUD_PROJECT", project_id)
os.environ.setdefault("GOOGLE_CLOUD_LOCATION", "global")
os.environ.setdefault("GOOGLE_GENAI_USE_VERTEXAI", "True")

root_agent = Agent(
    name="MockInterviewCoordinator",
    model=constants.MODEL,
    instruction="""
    Route user requests:
    - Initial prompt always goes to "ProblemGenerator".
    - If user response does not contain full coding solution, redirect the prompt to "Interviewer".
    - If user response contains a full coding solution, redirect the prompt to "SubmissionExecutor". 
    - When the interview concludes with code implementation and follow-up questions, go to "Evaluator". 
    """,
    sub_agents=[problem_generator, interviewer, submission_executor, evaluator],
)

agent = root_agent
