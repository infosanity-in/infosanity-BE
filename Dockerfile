# Using alpine image
FROM node:alpine

# Setting up environment
WORKDIR /app
COPY . .
RUN npm install --no-optional && npm cache clean --force

# The entrypoint
CMD ["node", "app.js"]