from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Article

def title_validator(form, field):
    title = field.data
    if len(title) > 100:
        raise ValidationError('Title cannot exceed 100 characters')

def description_validator(form, field):
    description = field.data
    if len(description) > 100:
        raise ValidationError('Description cannot exceed 100 characters')
    if len(description) < 20:
        raise ValidationError('Description must be at least 20 characters')

class ArticleForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired(), title_validator])
    description = StringField('description', validators=[DataRequired(), description_validator]),
    article = TextAreaField('category_id', validators=[DataRequired()]),

    image_url = StringField('image_url', validators=[DataRequired()])
class ArticleEditForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()]),
    title = StringField('title', validators=[DataRequired(), title_validator]),
    description = StringField('description', validators=[DataRequired(), description_validator]),
    article = TextAreaField('category_id', validators=[DataRequired()])
