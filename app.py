import json
from flask import Flask, render_template, make_response, url_for, request

app = Flask(__name__)

@app.route('/')
def GoJSproj():

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug = True, host = '127.0.0.1', port = 5000)
