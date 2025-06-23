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

# Use the official Python image
FROM python:3.13-slim

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y curl gnupg2 lsb-release && \
    curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

# Install Python dependencies
RUN pip install --no-cache-dir uv==0.6.12

# Set the working directory to /code
WORKDIR /code

# Copy Python dependencies and configuration
COPY ./pyproject.toml ./README.md ./uv.lock* ./

# Copy the app code
COPY ./app ./app

# Copy the front-end code
COPY ./front-end ./front-end

# Set the working directory to front-end and install dependencies
WORKDIR /code/front-end

# Clean npm cache, install dependencies, and rebuild esbuild for the correct platform
RUN npm install
RUN npm rebuild esbuild --platform=linux --arch=arm64

# Move back to the /code directory and copy the built front-end to the static directory
WORKDIR /code
COPY ./front-end/dist /code/app/static

# Run the uv sync command
RUN uv sync --frozen

# Expose port 8080 for the server
EXPOSE 8080

# Start the server
CMD ["uv", "run", "uvicorn", "app.server:app", "--host", "0.0.0.0", "--port", "8080"]
