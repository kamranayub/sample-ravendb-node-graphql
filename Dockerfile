FROM node:8-alpine
WORKDIR /app
ADD . /app
RUN npm i -s --no-progress --production

# Set up Node env
ENV NODE_ENV=production
ENV PORT=80

CMD [ "npm", "start" ]
EXPOSE 80