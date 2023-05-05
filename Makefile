.PHONY: build \
				clean \
				commit \
				cz \
				install \
				lint \
				sb \
				start \
				start-prod

build:
	npm run build

clean:
	rm -rf .next

commit:
	npm run commit

cz: commit

install:
	npm install
	npm run prepare

lint:
	npm run lint

sb:
	npm run storybook

start:
	npm run dev

start-prod: build
	npm run start

test:
	npm run test
