FROM node:20-alpine

WORKDIR /app

# Install static server
RUN npm install -g serve

# Copy only static files
COPY public ./public

EXPOSE 3000

CMD ["serve", "-s", "public", "-l", "3000"]