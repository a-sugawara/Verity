from .db import db

class AccuracyRating(db.Model):
    __tablename__="accuracy_ratings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'), nullable=False)
    article_id = db.Column(db.Integer, db.ForeignKey('articles.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    user = db.relationship('User', back_populates='rating')
    article = db.relationship('Article', back_populates='rating')

    def to_dict(self):
        return{
            'id':self.id,
            'user_id':self.user_id,
            'article_id': self.article_id,
            'rating': self.rating,
        }
