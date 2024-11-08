# Stage 1: Build the Angular application
FROM node:18-alpine AS build


# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install --force

# Copy the rest of the application code into the container
COPY . .

# Expose port 4200 for Angular to be accessible
EXPOSE 4200

# Run the Angular development server
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]
