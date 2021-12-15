from .db import db

class Tag(db.Model):
    __tablename__ ="tags"

    id = db.Column(db.Integer, primary_key=True)
    article_id = db.Column(db.Integer,db.ForeignKey("articles.id"), nullable=False)
    tag = db.Column(db.String,nullable=False)

    article = db.relationship('Article', back_populates='tag')
