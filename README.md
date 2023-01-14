# About

This project currently has a connector to Avanza that takes current balance of Avanza accounts and profit and displays that data at `/metrics`route.

# Setup
To run the project the following env variables need to be set in a `.env` file variables needs to be set

- USERNAME -  Your avanza username
- PASSWORD - Your avanza password
- TOTP - The secret for 2FA authenticator, see below about details how to get


See `example.env` for setup.

To run the project run
```shell
docker-compose up
```


When running first time no accounts will be tracked but in the console the possible accounts with their accountId will be outputted like this:
```
Account available:
Account1:123456
Account2:123456
Account3:123456
```
To select what accounts to track add this env variable
```
ACCOUNTS_TO_TRACK=Account1:123456,Account2:123456
```
Each account as listed with comma separation.

Restart the application and now all the relevant data should be accessible at the route `/metrics`.


## Getting TOTP secret
See guide here https://github.com/fhqvst/avanza#getting-a-totp-secret

## Optional ENV variables
- PORT - Which port the application should be accessed with
- UPDATE_INTERVAL - How often Avanza should be scraped


