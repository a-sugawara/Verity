from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import AccuracyRating

class RatingForm(FlaskForm):
    user_id = StringField('user_id', validators=[DataRequired()])
    article_id = StringField('article_id', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired()])
