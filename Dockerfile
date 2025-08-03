# Use official Node.js image (LTS version)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files
COPY . .

# Expose port used by Cachana server
EXPOSE 7070

# Start the REST API server
CMD ["npm", "start"]
