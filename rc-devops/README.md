# Devops for RateCity

## Following are the instructions to run Swift in local environment

- Make sure you have some folder structure like this

  ```
    ── ratecity
       ├── rc-devops
       ├── swift-client
       └── swift-server
  ```

- `cd` into `rc-devops` folder.
- When you are running this for first time, create data folder `mkdir elasticsearch/data`.
- Run `docker-compose up`.
- Ingest data to `elasticsearch` from `blaze` project (make sure `ELASTICSEARCH_URL` is correctly set), `npm run ingest`.
- Now `http://localhost:3050/car-loans` should be available
