from .db import db

class Comment(db.Model):
    __tablename__="comments"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'), nullable=False)
    article_id = db.Column(db.Integer, db.ForeignKey('articles.id'), nullable=False)
    comment = db.Column(db.String, nullable=False)

    user = db.relationship('User', back_populates='comment')
    article = db.relationship('Article', back_populates='comment')

    def to_dict(self):
        return{
            'id':self.id,
            'user_id':self.user_id,
            'article_id': self.article_id,
            'articleTitle':self.article.title,
            'comment': self.comment,
            'username': self.user.username,
        }
