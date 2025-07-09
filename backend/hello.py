from flask import (
    Flask,
    send_from_directory,
    abort,
    jsonify,
    send_file
)
from flask_cors import CORS
from markupsafe import escape
import os
import subprocess
from io import BytesIO

app = Flask(__name__)
CORS(app)

VIDS_DIR = "./static/videos"
VID_SRC = "/video_file"

@app.route("/movies")  # List the videos
def show_video_list():
    files = os.listdir(VIDS_DIR)
    movies: list[dict] = []

    for vid in files:
        if vid.endswith(".mp4"):
            movie_title = vid.split('.')[0]
            movies.append(
                {
                    'movie_title': movie_title,
                    'movie_thumbnail': f"{VID_SRC}/thumbnail/{movie_title}"
                }
            )
    
    return jsonify({
        'movies': movies
    })

# Route to serve raw video files
@app.route(f"{VID_SRC}/<filename>")
def serve_video_file(filename):
    try:
        return send_from_directory(VIDS_DIR, filename)
    except FileNotFoundError:
        abort(404)

@app.route(f"{VID_SRC}/thumbnail/<movie_title>")
def serve_video_thumbnail(movie_title, timestamp="00:00:01.000", size=f"{int(1920/3)}x{int(1080/3)}"):
    vid_file_full_path = f"{VIDS_DIR}/{movie_title}.mp4"

    if os.path.isfile(vid_file_full_path):
        command = [
            'ffmpeg', 
            '-i', vid_file_full_path,
            '-ss', timestamp,
            '-vframes', "1",
            '-s', size,
            '-f', 'image2',
            '-vcodec', 'mjpeg',
            'pipe:1'
        ]

        result = subprocess.run(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            check=True
        )

        return send_file(BytesIO(result.stdout), mimetype="image/jpeg")
    else:
        return abort(404)


# Route to render a video player page for a given video name (without .mp4)
@app.route("/movies/<movie_title>")
def video_page(movie_title):
    video_url = f"{VID_SRC}/{movie_title}.mp4"

    if os.path.isfile(f"{VIDS_DIR}/{movie_title}.mp4"):
        return jsonify(
            {
                'video_name': movie_title, 
                'video_url': video_url
            }
        )
    return abort(404)

if __name__ == "__main__":
    app.run(debug=True, port=8080)
