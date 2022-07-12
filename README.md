# greek-namedays-api
An easy to use REST API that returns the celebration day of each Greek name. 🎉

# Getting started
To run the API locally you must make sure you have the following installed:
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/package/npm)

Clone the project and run ```npm install``` to install all the required dependencies. After that, simply run ```npm run dev``` to start the server.

# Endpoints

## GET
```/api/v1/namedays```: Returns the namedays of the current year.

Parameters: 
- ```year``` (optional): the year for which you want to retrieve the namedays

Sample Response:
```
{
    "success": true,
    "namedays": {
      "1/1": {
        "names": [...]
      },
      "2/1": {
        "names": [...]
      },
      ...
    }
}
```

<br>

```/api/v1/easter-day```: Returns the day of current year's Easter as a timestamp.

Parameters: 
```year``` (optional): the year for which you want to retrieve the Easter day

Sample Response:
```
{
    "success": true,
    "easter_day": 1650758400000
}
```

