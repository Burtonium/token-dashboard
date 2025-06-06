# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.16.0

FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

ARG NPM_TOKEN
RUN if [ -z "$NPM_TOKEN" ]; then echo "NPM_TOKEN is not set!" && exit 1; fi && \
    echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc

# Set registry for @bltzr-gg scope
RUN echo "@bltzr-gg:registry=https://registry.npmjs.org/" >> .npmrc

# Install node modules
COPY package-lock.json package.json ./
RUN npm ci --include=dev

# Copy application code
COPY . .

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --omit=dev

RUN rm -rf .npmrc


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npm", "run", "start" ]
