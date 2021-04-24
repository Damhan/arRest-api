# arRest-api
REST API that serves the NYPD arrest data over the last year.

# About
Data is stored in a free MongoDB cluster on the Atlas MongoDB cloud.

Documents are structured as per the sample data viewable in nypd-arrest-data-sample.

Dataset (approx 131k rows) was obtained from the Year to Date (updated quarterly) arrest data made publically available by the NYPD at [Data.world](https://data.world/city-of-ny/uip8-fykc "NYPD Arrest Dataset")

Dataset terms of use can be viewed [Here](https://opendata.cityofnewyork.us/overview/#termsofuse)
 
# Current Functionality
- Get list of all arrests - /listarrests (currrently displays top 10)
- Get arrest by ID - /:id
- Get arrests by race - /byPerpRace/:race

