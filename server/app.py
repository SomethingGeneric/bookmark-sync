from flask import Flask, render_template, request, redirect, url_for, session

from simpleusers import usermgr

u = usermgr()

app = Flask(__name__)
app.secret_key = "SuperDuperStrongSecretKeyGoesHere"

@app.route("/")
def index():
    return "yippee"

