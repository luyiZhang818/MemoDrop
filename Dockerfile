FROM python:3.9
WORKDIR /app/backend
COPY ./backend/ /app/backend
RUN pip install -r /app/backend/requirements.txt
EXPOSE 8080
ENV FLASK_APP=app.py
CMD ["flask", "run", "--host=0.0.0.0", "--port=8080"]