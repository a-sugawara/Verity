from flask import Blueprint, jsonify, request, session
from app.models import Comment, db
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@comment_routes.route('/', methods=['POST'])
def post_a_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("xxxxxxxxxxx", form.data)
        comment = Comment(
            user_id=form.data['user_id'],
            comment=form.data['comment'],
            article_id=form.data['article_id'],
        )
        db.session.add(comment)
        db.session.commit()

        return comment.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete_a_comment(id):
    specific_comment = Comment.query.get(id)
    if not specific_comment:
        return {'errors': 'Comment not found'}, 401
    db.session.delete(specific_comment)
    db.session.commit()
    return {"message": "Successful deletion"}

@comment_routes.route('/<int:id>', methods=['PUT'])
def update_comment(id):
    specific_comment = Comment.query.get(id)
    if not specific_comment:
        return {'errors': 'Comment not found'}, 401
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        specific_comment.user_id=form.data['user_id'],
        specific_comment.comment=form.data['comment'],
        specific_comment.article_id=form.data['article_id'],

        db.session.commit()
        return specific_comment.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
