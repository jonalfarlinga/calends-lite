FROM node:bullseye

WORKDIR /app
COPY package.json package.json
RUN npm install --verbose

COPY public public
COPY src src
COPY index.html index.html
COPY vite.config.js vite.config.js

EXPOSE 80

ENV HOST=0.0.0.0
ENV PORT=80
ENV NODE_ENV=development
ENV VITE_BACKEND_HOST=https://calends-api.azurewebsites.net

CMD ["npm", "run", "dev"]
