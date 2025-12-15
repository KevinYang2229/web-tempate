FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g pm2

RUN npm install

COPY . .

EXPOSE 3000

# ENV DB_HOST=localhost
# ENV DB_USER=root
# ENV DB_PASS=password
# ENV DB_NAME=db_notes
# ENV TOKEN_SECRET=your_jwt_secret_key
# ENV REFRESH_TOKEN_SECRET=your_refresh_token_secret_key
# ENV PORT=3000
# ENV SOCKET_PORT=4000
# ENV LOG_LEVEL=info

# CMD [ "node", "src/servers/api-server.js" ]

CMD [ "pm2-runtime", "start", "ecosystem.config.cjs", "--env", "development" ]
