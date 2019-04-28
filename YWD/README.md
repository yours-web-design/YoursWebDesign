### ACTIVATE ENVIRONMENT
* source env/bin/activate

### RUNSERVER

```
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### ENDPOINTS:
* USER LIST GET : http://localhost:8000/api/users/ 
* CREATE USER POST : http://localhost:8000/api/users/ 
``` 
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
```

* LOGIN POST : http://localhost:8000/api/auth/login/
``` 
format : {
    "username": "",
    "email": "",
    "password": ""
}
```
Username can be null here

* PASSWORD RESET POST : http://localhost:8000/api/auth/password/reset/
```
format : {
    "email": ""
}
```
* PASSWORD RESET EMAIL URL: http://localhost:8000/api/reset/uid/token/

```
This protocol , domain can be changed to anything .
From this url the uid and token can be parsed for the below Password reset confirm POST request
```

* Password Reset Confirm POST : http://localhost:8000/api/auth/password/reset/confirm/
```
format : {
    "new_password1": "",
    "new_password2": "",
    "uid": "",
    "token": ""
}
```

* PASSWORD CHANGE POST : http://localhost:8000/api/auth/password/change/

```
format: {
    "old_password": "",
    "new_password1": "",
    "new_password2": ""
}
```