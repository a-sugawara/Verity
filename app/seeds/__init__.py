from flask.cli import AppGroup
from .users import seed_users, undo_users
from .articles import seed_articles, undo_articles
from .ratings import seed_ratings, undo_ratings
from .comments import seed_comments, undo_comments
from .images import seed_images, undo_images

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_articles()
    seed_ratings()
    seed_comments()
    seed_images()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_images()
    undo_comments()
    undo_ratings()
    undo_articles()
    undo_users()
    # Add other undo functions here
