# mock-interview-bot

A base ReAct agent built with Google's Agent Development Kit (ADK)
Agent generated with [`googleCloudPlatform/agent-starter-pack`](https://github.com/GoogleCloudPlatform/agent-starter-pack) version `0.4.0`

## Quick links
- [Demo](https://www.youtube.com/watch?v=zozhLDsEmOo)
- [Prod deployment](https://mock-interview-bot-383284464298.us-east1.run.app/)


## Project Structure

This project is organized as follows:

```
mock-interview-bot/
├── app/                 # Core application code
│   ├── agent.py         # Main agent logic
│   ├── server.py        # FastAPI Backend server
│   └── utils/           # Utility functions and helpers
├── deployment/          # Infrastructure and deployment scripts
├── front-end/           # React Frontend server
├── tests/               # Unit, integration, and load tests
├── Makefile             # Makefile for common commands
└── pyproject.toml       # Project dependencies and configuration
```

## Requirements

Before you begin, ensure you have:
- **uv**: Python package manager - [Install](https://docs.astral.sh/uv/getting-started/installation/)
- **Google Cloud SDK**: For GCP services - [Install](https://cloud.google.com/sdk/docs/install)
- **Terraform**: For infrastructure deployment - [Install](https://developer.hashicorp.com/terraform/downloads)
- **make**: Build automation tool - [Install](https://www.gnu.org/software/make/) (pre-installed on most Unix-based systems)
- **node** v20+

## Quick Start With Dev UI

Install required packages and launch the local development environment:

```bash
make install && make playground
```

## Run app locally
### Backend
Add your `GOOGLE_CLOUD_PROJECT`, `GOOGLE_CLOUD_LOCATION`, `BUCKET_NAME` and run:
```bash
make local-backend
```
### Frontend
Add `VITE_API_BASE_URL=http://localhost:8080` to `./front-end/.env`. Ensure you're at the root directory 
and run:
```bash
make local-frontend
```
### As Docker container
You need to set up a Google Cloud service account key JSON file, copy it to `./credentials.json`, and modify 
`Dockerfile`:
```Dockerfile
# Set up the working directory
WORKDIR /code

# Copy the service account key JSON file into the container
COPY credentials.json ./

# Set the GOOGLE_APPLICATION_CREDENTIALS environment variable to authenticate with the service account
ENV GOOGLE_APPLICATION_CREDENTIALS="./credentials.json"
```

## Commands

| Command              | Description                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------- |
| `make install`       | Install all required dependencies using uv                                                  |
| `make playground`    | Launch local development environment with backend and frontend - leveraging `adk web` command.|
| `make backend`       | Deploy agent to Cloud Run |
| `make local-backend`       | Deploy agent to Cloud Run |
| `make test`          | Run unit and integration tests                                                              |
| `make lint`          | Run code quality checks (codespell, ruff, mypy)                                             |
| `make setup-dev-env` | Set up development environment resources using Terraform                                    |
| `uv run jupyter lab` | Launch Jupyter notebook                                                                     |

For full command options and usage, refer to the [Makefile](Makefile).


## Usage

This template follows a "bring your own agent" approach - you focus on your business logic, and the template handles everything else (UI, infrastructure, deployment, monitoring).

1. **Prototype:** Build your Generative AI Agent using the intro notebooks in `notebooks/` for guidance. Use Vertex AI Evaluation to assess performance.
2. **Integrate:** Import your agent into the app by editing `app/agent.py`.
3. **Test:** Explore your agent functionality using the Streamlit playground with `make playground`. The playground offers features like chat history, user feedback, and various input types, and automatically reloads your agent on code changes.
4. **Deploy:** Set up and initiate the CI/CD pipelines, customizing tests as necessary. Refer to the [deployment section](#deployment) for comprehensive instructions. For streamlined infrastructure deployment, simply run `agent-starter-pack setup-cicd`. Check out the [`agent-starter-pack setup-cicd` CLI command](https://github.com/GoogleCloudPlatform/agent-starter-pack/blob/main/docs/cli/setup_cicd.md). Currently only supporting Github.
5. **Monitor:** Track performance and gather insights using Cloud Logging, Tracing, and the Looker Studio dashboard to iterate on your application.


## Deployment

> **Note:** For a streamlined one-command deployment of the entire CI/CD pipeline and infrastructure using Terraform, you can use the [`agent-starter-pack setup-cicd` CLI command](https://github.com/GoogleCloudPlatform/agent-starter-pack/blob/main/docs/cli/setup_cicd.md). Currently only supporting Github.

### Dev Environment

You can test deployment towards a Dev Environment using the following command:

```bash
gcloud config set project <your-dev-project-id>
make backend
```


The repository includes a Terraform configuration for the setup of the Dev Google Cloud project.
See [deployment/README.md](deployment/README.md) for instructions.

### Production Deployment

The repository includes a Terraform configuration for the setup of a production Google Cloud project. Refer to [deployment/README.md](deployment/README.md) for detailed instructions on how to deploy the infrastructure and application.


## Monitoring and Observability
> You can use [this Looker Studio dashboard](https://lookerstudio.google.com/reporting/46b35167-b38b-4e44-bd37-701ef4307418/page/tEnnC
) template for visualizing events being logged in BigQuery. See the "Setup Instructions" tab to getting started.

The application uses OpenTelemetry for comprehensive observability with all events being sent to Google Cloud Trace and Logging for monitoring and to BigQuery for long term storage.
