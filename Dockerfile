
FROM node:22-alpine as production

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 5005

# Command to run the application
CMD ["npm", "start"]
