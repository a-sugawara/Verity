from flask_socketio import SocketIO, emit
import os


# if os.environ.get('FLASK_ENV') == 'production':
#     origins = [
#         'http://actual-app-url.herokuapp.com',
#         'https://actual-app-url.herokuapp.com'
#     ]
# else:
#     origins = "*"


socketio = SocketIO(cors_allowed_origins="*")

def handle_add_comment(data):
    socketio.emit("add_com", data, broadcast=True)

def handle_del_comment(data):
    socketio.emit("del_com", data, broadcast=True)
