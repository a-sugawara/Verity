from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Comment

class CommentForm(FlaskForm):
    user_id = StringField('user_id', validators=[DataRequired()])
    article_id = StringField('article_id', validators=[DataRequired()])
    comment = IntegerField('comment', validators=[DataRequired()])
