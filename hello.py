from flask import Flask
from markupsafe import escape

app = Flask(__name__)


@app.route("/")
def hello():
    return "<p>hello world</p>"

@app.route("/user/<username>")
def show_user_profile(username):
    return f"profile name: {escape(username)}"
