FROM node:8
RUN mkdir -p /app
WORKDIR /app
COPY Dockerrun.aws.json config.js ./
COPY .ebextensions ./.ebextensions
COPY ebextensions ./ebextensions
COPY misc ./misc
COPY scripts ./scripts
COPY server ./server
COPY build ./build
COPY package.json package-lock.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD [ "npm", "start" ]
