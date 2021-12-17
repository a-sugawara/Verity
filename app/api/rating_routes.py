from flask import Blueprint, jsonify, request, session
from app.models import AccuracyRating, db
from app.forms import RatingForm

rating_routes = Blueprint('ratings', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@rating_routes.route('/', methods=['POST'])
def post_article():
    form = RatingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("xxxxxxxxxxx", form.data)
        rating = AccuracyRating(
            user_id=form.data['user_id'],
            rating=form.data['rating'],
            article_id=form.data['article_id'],
        )
        db.session.add(rating)
        db.session.commit()

        return rating.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@rating_routes.route('/<int:id>', methods=['DELETE'])
def delete_an_article(id):
    specific_rating = AccuracyRating.query.get(id)
    if not specific_rating:
        return {'errors': 'Rating not found'}, 401
    db.session.delete(specific_rating)
    db.session.commit()
    return {"message": "Successful deletion"}

@rating_routes.route('/<int:id>', methods=['PUT'])
def update_rating(id):
    specific_rating = AccuracyRating.query.get(id)
    if not specific_rating:
        return {'errors': 'Rating not found'}, 401
    form = RatingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        specific_rating.user_id=form.data['user_id'],
        specific_rating.rating=form.data['rating'],
        specific_rating.article_id=form.data['article_id'],

        db.session.commit()
        return specific_article.to_dictionary()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
