# # Stage 1: Build the React app using Nx
FROM node:20-alpine as builder


# RUN apk add --update --no-cache python3 make gcc g++ && ln -sf python3 /usr/bin/python
# RUN python3 -m ensurepip
# RUN pip3 install --no-cache --upgrade pip setuptools

# # Set the working directory
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json to the working directory
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm ci

# # Copy the rest of the app source code
# COPY . .

# RUN npm install -g nx

# # Build the React app using Nx
# RUN npx nx build front-web --prod

# # Stage 2: Serve the React app using Nginx
# FROM nginx:stable-alpine

# # Remove the default Nginx configuration
# RUN rm -rf /etc/nginx/conf.d

# # Copy the custom Nginx configuration
# COPY apps/front-web/nginx.conf /etc/nginx/conf.d/default.conf

# # Copy the built React app from the builder stage
# COPY --from=builder /usr/src/app/dist/apps/front-web /usr/share/nginx/html

# # Expose port 80 for the Nginx server
# EXPOSE 80

# # Start Nginx server
# CMD ["nginx", "-g", "daemon off;"]
