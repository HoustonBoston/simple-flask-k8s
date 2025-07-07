from flask import (
    Flask,
    send_from_directory,
    abort
)
from markupsafe import escape
import os

app = Flask(__name__)

@app.route("/")
def hello():
    return "<p>hello world</p>"

@app.route("/user/<username>")
def show_user_profile(username):
    return f"profile name: {escape(username)}"

VIDS_DIR = "./static/videos"
VID_SRC = "/video_file"

@app.route("/videos")  # List the videos
def show_video_list():
    files = os.listdir(VIDS_DIR)
    links = ""
    for vid in files:
        if vid.endswith(".mp4"):
            vid_title = vid.split('.')[0]
            links += f'''
                <a href="{VID_SRC}/{vid_title}">{vid_title}</a><br>    
            '''
    return f'{links}'

# Route to serve raw video files
@app.route(f"{VID_SRC}/<filename>")
def serve_video_file(filename):
    try:
        return send_from_directory(VIDS_DIR, filename)
    except FileNotFoundError:
        abort(404)

# Route to render a video player page for a given video name (without .mp4)
@app.route("/videos/<vid_name>")
def video_page(vid_name):
    video_url = f"{VID_SRC}/{vid_name}.mp4"
    return (f"""
    <html>
    <head><title>{vid_name}</title></head>
    <body>
        <h2>Now Playing: {vid_name}</h2>
        <video controls width="640" height="360">
            <source src="{video_url}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </body>
    </html>
    """)
