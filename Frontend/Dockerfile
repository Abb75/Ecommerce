FROM node : 17-alpine
RUN mkdir /code
WORKDIR /code
COPY . /package*.json/
RUN npm i --silent
RUN npm i -g react-script@5.0.0

CMD ['npm', 'start']