from .db import db

class Article(db.Model):
    __tablename__ = 'articles'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    article = db.Column(db.String, nullable=False)

    user = db.relationship('User', back_populates='article')
    rating = db.relationship('AccuracyRating', back_populates='article', cascade="all, delete")
    comment = db.relationship('Comment', back_populates='article', cascade="all, delete")
    image = db.relationship('Image', back_populates='article', cascade="all, delete")
    tag = db.relationship('Tag', back_populates='article')


    def to_dict(self):
        print("xxxxxxxxxxx",list(self.rating))
        return{
            'title':self.title,
            'id':self.id,
            'user_id':self.user_id,
            'description': self.description,
            'article': self.article,
            'username': self.user.username,

            'ratings': {"sum":sum([obj.rating for obj in self.rating]), "len":len([obj.rating for obj in self.rating])},

            'comments': len([obj.comment for obj in self.comment]),
            'images': [obj.image for obj in self.image]
            # 'tag': self.tag.to_dict(),

            }

    def to_dictionary(self):
        # print("xxxxxxxxxxx",list(self.rating))
        return{
            'title':self.title,
            'id':self.id,
            'user_id':self.user_id,
            'description': self.description,
            'article': self.article,
            'username': self.user.username,

            'ratings': [{
                "id": obj.id,
                "rating":obj.rating,
                "user_id":obj.user_id,
                "article_id":obj.article_id} for obj in self.rating],

            'comments': [{
                "id": obj.id,
                "article_id":obj.article_id,
                "user_id":obj.user_id,
                "comment":obj.comment,
                "username":obj.user.username,} for obj in self.comment],
            # 'tag': self.tag.to_dict(),
            "images": [obj.image for obj in self.image]

            }
