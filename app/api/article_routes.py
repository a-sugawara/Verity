from flask import Blueprint, jsonify, request, session
from app.models import Article, Image, db
from app.forms import ArticleForm, ArticleEditForm

article_routes = Blueprint('articles', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@article_routes.route('')
def get_all_articles():
    all_articles = Article.query.all()
    return {'articles': [article.to_dict() for article in all_articles]}


@article_routes.route('/<int:id>', methods=['GET'])
def get_an_article(id):
    article = Article.query.get(id)
    if not article:
        return {'errors': 'Article not found'}, 401
    return article.to_dictionary()


@article_routes.route('/', methods=['POST'])
def post_article():
    form = ArticleForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("xxxxxxxxxxx", form.data)
        article = Article(
            user_id=form.data['user_id'],
            title=form.data['title'],
            description=form.data['description'],
            article=form.data['article'],
        )
        db.session.add(article)
        db.session.commit()

        image = Image(
            image = form.data['image_url'],
            article_id = article.id
        )
        db.session.add(image)
        db.session.commit()
        return article.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@article_routes.route('/<int:id>', methods=['DELETE'])
def delete_an_article(id):
    specific_article = Article.query.get(id)
    if not specific_article:
        return {'errors': 'Article not found'}, 401
    db.session.delete(specific_article)
    db.session.commit()
    return {"message": "Successful deletion"}

@article_routes.route('/<int:id>', methods=['PUT'])
def update_article(id):
    specific_article = Article.query.get(id)
    if not specific_article:
        return {'errors': 'Article not found'}, 401
    form = ArticleEditForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        specific_article.user_id=form.data['user_id'],
        specific_article.title=form.data['title'],
        specific_article.description=form.data['description'],
        specific_article.article=form.data['article'],

        db.session.commit()
        return specific_article.to_dictionary()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@article_routes.route('/discover/<string:term>')
def search_article(term):
    articles = Article.query.filter(Article.article.ilike("%" + term + "%"))
    return {'searchedArticles': [article.to_dict() for article in articles]}
