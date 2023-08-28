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
        # Define the generate_session_token method
        def generate_session_token():
            # Add code to generate a random session token here
            pass
        
        session_token = generate_session_token()  # Generate a random session token
        session["token"] = session_token  # Store the session token in the session object
        return session_token  # Return the session token as the response
    else:
        return "Authentication failed"