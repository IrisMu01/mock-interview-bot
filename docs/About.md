## Inspiration
While preparing for technical interviews, I realized that just grinding LeetCode alone wasn’t cutting it. In real interviews, being able to communicate your thought process is just as important as reaching the right answer.
I’ve really enjoyed face-to-face mock interviews in the past, and I wanted a way to practice that communication aspect anytime, anywhere.

## What It Does
This app simulates a technical interview using a multi-agent AI system that acts as your interviewer.
Since it’s just a mock, you get to choose the topic and difficulty level you want to practice.
You can talk through the problem with the bot to collaboratively reach a solution. When you're ready, you write out your solution and test cases in Python.
The bot then generates a test harness that runs your code and works with you iteratively to improve your solution.
At the end, it gives you structured feedback—highlighting what you did well and what you could work on.

## How We Built It
We used a tech stack of GCP, FastAPI, Google ADK, React, Tailwind, and Terraform. We also started with the `agent-starter-pack`, which gave us a FastAPI server with session and prompt endpoints, along with Terraform configs to deploy quickly.

### The Multi-Agent System
All agents in the system use the model `gemini-flash-2.0`. The root agent follows a coordinator/dispatcher pattern, working with specialized subagents so the interview flows naturally through different stages:
* `ProblemGenerator` creates LeetCode-style problems.
* `Interviewer` chats with you to help you verbalize a solution.
* `SubmissionExecutor` reviews and tests your code.
* `Evaluator` wraps up the session with feedback.
* Some of these subagents have their own internal workflows to handle more complicated tasks. For example, `SubmissionExecutor` mimics a white-boarding session by (1) fixing minor syntax issues in your code, (2) generating a Python test harness to run your test cases, (3) executing the test harness using ADK’s sandboxed code runner, and finally (4) sending back results and implementation feedback.
* The `Evaluator` also uses a sequential pipeline pattern so users get evaluated on a consistent criteria in different sessions. It (1) generates a JSON summary using fixed evaluation criteria, and then (2) verbalizes that into readable feedback.

### Front-End
We built a single-page React app using Tailwind CSS for styling.


## Challenges We Ran Into

### Learning the ADK
We didn’t have much experience with LLM agents, so the ADK had a bit of a learning curve.
Defining the project goals early on helped a lot—we could read the docs with purpose and pick the right tools and architecture.
The built-in dev UI also helped us iterate quickly during prototyping.

### Agent Coordination
The root agent sometimes struggled to decide when to hand things off. We improved that by injecting explicit instructions like "Transfer to agent XXX" in the prompt. These instructions are hidden from the UI, unless you peek in the network tab.

The `Evaluator` also had quirks when it was only vaguely told to use “conversation history” to generate feedback—it ended up checking off boxes based on what the AI said, not the user. In early tests, if the user quit right away, it would still say they did great.
We fixed this by refining the instructions to focus only on **user** responses and adding better defaults to the eval schema.

## Accomplishments We're Proud Of
* We built a functional multi-agent system that runs a mock technical interview.
* We learned and applied tools like ADK, FastAPI, Terraform, and GCP—all of which were new to us.
* Managed to put together the entire front-end in just 5 hours, the day before the deadline.

## What We Learned
* How to coordinate LLM agents to complete complex workflows.
* That hackathon crunch time is very real (and very stressful).

## What's Next for Mock Interview Bot

### Features
* Add voice-to-text input and audio playback for the bot to make it feel like a real interview.
* Allow users to log in and save their past sessions for review.
* Expand to include mock system design interviews (arguably more fun than LeetCode!).

### Maintenance
* **Stability:** Sometimes the server returns 500 errors due to resource exhaustion (429s under the hood). We plan to add retry logic with exponential backoff in the `/run` endpoint.
* **UI Improvements:** Improve error handling in the front-end so users get friendlier messages and retry options instead of blank screens.
