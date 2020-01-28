#!/bin/bash

source backend/venv/bin/activate
python backend/manage.py runserver &
django=$!

cd frontend
gatsby develop &
gatsby=$!

shutdown() {
  echo killing processes...
  kill $django $gatsby
}

trap shutdown EXIT

wait $django $gatsby
