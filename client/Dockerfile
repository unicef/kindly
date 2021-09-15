# Use the official lightweight Node.js 16 image.
# https://hub.docker.com/_/node
FROM node:16-alpine

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./
ENV PORT=3000
EXPOSE 3000
# Install production dependencies.
RUN npm install 

# build client
RUN npm run build

RUN ls -a

# Run the web service on container startup.
CMD [ "npm", "start" ]