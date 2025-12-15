Start-Process powershell -ArgumentList "cd backend; uvicorn main:app --reload --host 0.0.0.0 --port 8000"
Start-Sleep -Seconds 2
Start-Process powershell -ArgumentList "cd frontend; npm start"
Start-Sleep -Seconds 2
Start-Process powershell -ArgumentList "ngrok http 8000"
