from flask import Flask
from flask_cors import CORS
from routes.notes import notesBlueprint
from routes.users import userBlueprint
import os

app = Flask(__name__)
CORS(app) # enable CORS

# register notes blueprint
app.register_blueprint(notesBlueprint, url_prefix="/api")
app.register_blueprint(userBlueprint)


if __name__ == "__main__":
    app.run(debug=True, port=8080)