from flask import Flask, render_template, request, redirect, url_for, session
from passlib.hash import pbkdf2_sha256

from simpleusers import usermgr

u = usermgr()

app = Flask(__name__)
app.secret_key = "SuperDuperStrongSecretKeyGoesHere"

# Define the generate_session_token method
def generate_session_token(u, p):
    # Import the necessary module from passlib

    # Generate a random session token using passlib
    session_token = pbkdf2_sha256.hash(u+p)

    # Return the session token as the response
    return session_token

@app.route("/")
def index():
    return "yippee"

@app.route("/register", methods=["POST"])
def register():
    username = request.json.get("username")
    password = request.json.get("password")
    u.make_user(username, password)
    return "User created successfully"

@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username")
    password = request.json.get("password")
    if u.auth_user(username, password):
        session["username"] = username
        session_token = generate_session_token()  # Generate a random session token
        return session_token  # Return the session token as the response
    else:
        return "Authentication failed"