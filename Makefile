install:
	npm ci

lint-frontend:
	npx eslint frontend

start-backend:
	npx start-server

start-frontend:
	npm --prefix frontend start

start:
	make start-backend & make start-frontend