# Swift

This project was bootstrapped with [Create Next App](https://github.com/segmentio/create-next-app).

Find the most recent version of this guide at [here](https://github.com/segmentio/create-next-app/blob/master/lib/templates/default/README.md). And check out [Next.js repo](https://github.com/zeit/next.js) for the most up-to-date info.

## Prerequisites

* NodeJS >= 8.10.0 (install [nvm](https://github.com/creationix/nvm) and run `nvm install v8` )

## Development

Setup the dev environment following the guide in [rc-devops](https://github.com/ratecity/rc-devops)

## Build with bundle analyzer

# Build and analyze the back end server bundle
BUNDLE_ANALYZE=server yarn build

# Build and analyze the front end browser bundle
BUNDLE_ANALYZE=browser yarn build

# Build and analyze both server and browser
BUNDLE_ANALYZE=both yarn build

# Build and analyze neither server nor browser
yarn build
