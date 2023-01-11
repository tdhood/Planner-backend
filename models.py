"""SQLAlchemy models for Bullet"""

from datetime import datetime

from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

bcrypt = Bcrypt()
db = SQLAlchemy()

DEFAULT_IMAGE_URL='https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360'


def connect_db(app):
    """Connect this database to provided Flask app.

    You should call this in your Flask app.
    """

    db.app = app
    db.init_app(app)


class User(db.Model):
    """User in the system."""

    __tablename__ = 'users'

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    email = db.Column(
        db.Text,
        nullable=False,
        unique=True,
    )

    username = db.Column(
        db.Text,
        nullable=False,
        unique=True,
    )

    password = db.Column(
        db.Text,
        nullable=False,
    )

    image_url = db.Column(
        db.Text,
        default=DEFAULT_IMAGE_URL,
    )

    habits = db.relationship('Habit', backref='user')

    events = db.relationship('Event', backref='user')

    def __repr__(self):
        return f"<User #{self.id}: {self.username}, {self.email}>"

    @classmethod    
    def signup(cls, username, email, password, image_url=DEFAULT_IMAGE_URL):
        """Sign up user.

        Hashes password and adds user to system
        """
        #Hash a password for the first time, with a randomly-generated salt
        hashed_pass = bcrypt.hashpw(password, bcrypt.gensalt())

        user = User(
            username=username,
            email=email,
            password=hashed_pass,
            image_url=image_url,
        )

        db.session.add(user)
        return user

    @classmethod
    def authenticate(cls, username, password):
        """Find user with 'username' and 'password'

        This is a class method (call it on the class, not an individual user.)
        It searches for a user whose password hash matches this password
        and, if it finds such a user, returns that user object.

        If this can't find matching user (or if password is wrong), returns
        False.
        """

        user = cls.query.filter_by(username=username).one_or_none()

        if user:
            is_auth = bcrypt.checkpw(user.password, password)
            if is_auth:
                return user

        return False

    # def has_habits(self, user_habits):
    #     """Does the user have habits to track?"""

    #     user_habit_list = [
    #         user for user in self.habits
    #     ]

class Habit(db.Model):
    """an individual habit to track."""

    __tablename__ = 'habits'

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    title = db.Column(
        db.String(50),
        nullable=False,
    )

    description = db.Column(
        db.Text(),
        nullable=False,
        default="",
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id', ondelete='CASCADE'),
        nullable=False
    )

    #TODO: figure out how to reference the tracking points for a habit
    date_time = db.Column(
        db.DateTime,
        nullable=False,
    )

    is_tracking = db.Column(
        db.Boolean,
        nullable=False,
    )

    days = db.Column(
        db.Text(),
        nullable=False,
    )

    value = db.Column(
        db.Integer,
        nullable=True,
    )

    
class Event(db.Model):
    """an individual event to track."""

    __tablename__ = 'events'

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    title = db.Column(
        db.String(50),
        nullable=False,
    )

    description = db.Column(
        db.Text(),
        nullable=False,
        default="",
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id', ondelete='CASCADE'),
        nullable=False,
    )

    timestamp = db.Column(
        db.DateTime,
        nullable=False,
    )

    