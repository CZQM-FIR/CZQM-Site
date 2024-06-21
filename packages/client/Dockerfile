FROM node:22 as build

COPY . .

RUN npm install
RUN npx vite build

FROM nginx:1.27 as serve
COPY --from=build /dist /usr/share/nginx/html
