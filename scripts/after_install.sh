#Run with docker
cd /var/www/html/deploy-nestjs

docker build -t nesjt-deploy .

if docker ps -a | grep -q tera; then
    docker container stop tera
    docker container rm tera
fi

docker run -d --name tera -p 3000:3000 nesjt-deploy
docker image prune -f