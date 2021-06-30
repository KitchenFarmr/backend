compose = docker-compose
dev = -f docker-compose.dev.yml
test = -f docker-compose.test.yml

build:
				TAG=$$(date +%m%d%H%M%S) && ${compose} ${dev} build --force-rm --no-cache

start:
				TAG=$$(date +%m%d%H%M%S) && ${compose} ${dev} up

stop:
				${compose} ${dev} down --remove-orphans

debug:
				TAG=$$(date +%m%d%H%M%S) ${compose} ${dev} --verbose up

reload: stop start

hard-reload: stop rmi start

test:
				TAG=$$(date +%m%d%H%M%S) ${compose} ${test} up --abort-on-container-exit

stop-test:
				${compose} ${test} down

reload-test: stop-test test

hard-reload-test: stop-test rmi test

lint:
				npm run lint

rm:
				docker container prune -f
				
rm-all:
				docker stop $$(docker ps -aq)
				docker rm $$(docker ps -aq)

rmi:
				docker rmi kitchenfarmr-dev

rmi-all:
				docker rmi $$(docker images -q)
	
purge:
				docker system prune --volumes --all -f