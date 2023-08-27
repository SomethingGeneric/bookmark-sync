from flask import Flask, render_template, request, redirect, url_for, session

from simpleusers import usermgr

u = usermgr()

app = Flask(__name__)
app.secret_key = "SuperDuperStrongSecretKeyGoesHere"

@app.route("/")
def index():
    return "yippee"

@app.route("/register")
def register():
    # TODO: json request params to pass along to simpleusers db

@app.route("/login")
def login():
    # TODO: get request params to authenticate user, then figure out some way to return a session token