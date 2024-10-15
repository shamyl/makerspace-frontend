# Stage 1: Build the Angular app
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./



# Copy the entire project (including src) to the container
COPY . .

# Build the Angular project
RUN npm run build --prod

# Stage 2: Serve the Angular app with Nginx
FROM nginx:1.17.1-alpine

# Copy the built Angular files to Nginx's HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

