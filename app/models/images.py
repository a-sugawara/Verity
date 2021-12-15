from .db import db

class Image(db.Model):
    __tablename__="images"

    id = db.Column(db.Integer, primary_key=True)
    article_id = db.Column(db.Integer, db.ForeignKey("articles.id"), nullable=False)
    image = db.Column(db.String, nullable=False)

    article = db.relationship('Article', back_populates='image')
