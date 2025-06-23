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

# Use the official Python image as a base
FROM python:3.13-slim

# Install the required packages, including curl and gnupg
RUN apt-get update && \
    apt-get install -y curl gnupg2 lsb-release

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y curl gnupg2 lsb-release && \
    curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Set up the working directory
WORKDIR /code

# Copy your project files into the container
COPY ./pyproject.toml ./README.md ./uv.lock* ./
COPY ./app ./app
COPY ./front-end ./front-end

# Install dependencies (for both Python and Node.js)
RUN pip install --no-cache-dir uv==0.6.12

WORKDIR /code/front-end

# Clean npm cache, install dependencies, and rebuild esbuild for the correct platform
RUN npm install
RUN npm rebuild esbuild --platform=linux --arch=arm64

RUN npm run build

WORKDIR /code

# Sync the Python code
RUN uv sync --frozen

# Expose the application port
EXPOSE 8080

# Command to run your application
CMD ["uv", "run", "uvicorn", "app.server:app", "--host", "0.0.0.0", "--port", "8080"]
