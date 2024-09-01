FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY frontend ./frontend
COPY backend ./backend

RUN npm install --prefix frontend
RUN npm install --prefix backend

EXPOSE 3000 3001

CMD ["npm", "start"]