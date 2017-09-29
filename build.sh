npm run compile
docker build -t pinkbean-discord .
docker run --rm \
    --name pinkbean-discord \
    --link pinkbean-server \
    pinkbean-discord