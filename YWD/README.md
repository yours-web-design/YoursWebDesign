# ACTIVATE ENVIRONMENT
* source env/bin/activate
# ENDPOINTS:
* USER LIST GET : http://localhost:8000/api/users/ 
* CREATE USER POST : http://localhost:8000/api/users/ 
format : {
    "email": "",
    "first_name": "",
    "last_name": "",
    "password": "",
    "profile": {
        "country": "",
        "date_of_birth": null,
        "gender": "",
        "phone_number": ""
    }
}

* LOGIN POST : http://localhost:8000/api/auth/login/
format : {
    "username": "",
    "email": "",
    "password": ""
}

Username can be null here