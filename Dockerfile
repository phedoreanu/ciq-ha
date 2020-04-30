ARG BUILD_FROM
FROM $BUILD_FROM
ENV LANG C.UTF-8

WORKDIR /app

COPY . .

RUN apk add --no-cache --virtual .build-deps make g++ linux-headers eudev-dev python3 npm && \
  apk add --no-cache nodejs && \
  npm i && \
  apk del .build-deps

CMD ["./run.sh"]
