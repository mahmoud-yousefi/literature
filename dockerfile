FROM node:20

WORKDIR /app

COPY package.json .
RUN npm install --force  # Add --force flag
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]