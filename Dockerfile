FROM python:3.13-slim-bookworm
COPY . .
RUN pip install --upgrade pip && pip install -r requirements.txt
EXPOSE 5000
ENTRYPOINT ["flask", "--app", "hello", "run", "--host=0.0.0.0", "--port=5000"]
