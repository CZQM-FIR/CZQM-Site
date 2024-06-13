FROM node:22

COPY . .

RUN npm install
RUN npx vite build

CMD ["npx", "--yes", "serve", "dist"]
EXPOSE 3000
