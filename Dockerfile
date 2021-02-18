FROM python:3.8-alpine

WORKDIR /app

ENV PYTHONUNBUFFERED 1

RUN apk update \
    && apk add --no-cache cargo --virtual build-dependencies \
    && apk add gcc musl-dev python3-dev libffi-dev libressl-dev \
    && apk add postgresql-dev \
    && pip install --upgrade pip \
    && pip install -U 'Twisted[tls,http2]' \
    && pip install psycopg2 \
    && apk del build-dependencies

COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . .

RUN python manage.py collectstatic --noinput

RUN adduser -D myuser
USER myuser

CMD daphne --bind 0.0.0.0 -p $PORT socialproject.asgi:application