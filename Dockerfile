FROM node:22-alpine AS builder
RUN npm install -g pnpm

WORKDIR /app

# FIXME: This variable should not be hardcoded in the Dockerfile
ENV VITE_PEXEL_API_KEY="ky2e6KidH7y2J8kwTpeRGQpGqvRDt2WvojQ6zBt4HCX1x9U7Dga4srSj"

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html
COPY config/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 3000
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
