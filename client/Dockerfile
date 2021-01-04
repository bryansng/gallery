# # Stage 1
# FROM node:15.5.0-alpine
# RUN mkdir /app
# WORKDIR /app
# COPY package.json /app
# COPY package-lock.json /app
# RUN npm install
# COPY . /app
# RUN npm run build --silent

# # Stage 2
# FROM nginx:1.18-alpine
# COPY --from=build-step /app/build /usr/share/nginx/html
# CMD ["nginx", "-g", "daemon off;"]

# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]