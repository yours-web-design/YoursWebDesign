source env/bin/activate
python YWD/manage.py migrate
python YWD/manage.py runserver &
npm start --prefix myapp &
