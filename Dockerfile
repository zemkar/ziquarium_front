
# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:19-alpine as builder
# Set the working directory to /app inside the container
WORKDIR /usr/src/app/frontend/
# Copy app files
COPY . /usr/src/app/frontend/
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 
# Build the app
RUN npm run build


# Bundle static assets with nginx
FROM nginx:1.23.3-alpine as production
ENV NODE_ENV production
# Copy built assets from `builder` image
COPY --from=builder /usr/src/app/frontend/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]


