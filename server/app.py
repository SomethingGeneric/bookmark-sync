from flask import Flask, render_template, request, redirect, url_for, session

from simpleusers import usermgr

u = usermgr()

app = Flask(__name__)
app.secret_key = "SuperDuperStrongSecretKeyGoesHere"

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
        return "Authentication successful"
    else:
        return "Authentication failed"