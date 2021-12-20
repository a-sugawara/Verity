from app.models import db, Image

# Adds a demo user, you can add other users here if you want
def seed_images():
    test1 = Image(
        article_id=1 ,image="https://api.time.com/wp-content/uploads/2015/07/you-asked-bad-hold-in-sneeze.jpg?w=800&quality=85")
    test2 = Image(
        article_id=2 ,image="https://a.cdn-hotels.com/gdcs/production101/d154/ee893f00-c31d-11e8-9739-0242ac110006.jpg")
    test3 = Image(
        article_id=3 ,image="https://cdn.britannica.com/w:400,h:300,c:crop/88/78188-004-43BFD14F/Water-boiling-point.jpg")
    test4 = Image(
        article_id=4 ,image="https://upload.wikimedia.org/wikipedia/commons/5/5e/Water_drop_001.jpg")
    test5 = Image(
        article_id=5 ,image="https://www.mashed.com/img/gallery/coffee-mistakes-youre-probably-making-at-home/intro-1594766282.jpg")
    test6 = Image(
        article_id=6 ,image="https://techcrunch.com/wp-content/uploads/2017/10/gettyimages-520312382.jpg")
    test7 = Image(
        article_id=7 ,image="https://blackhops.com.au/wp-content/uploads/2016/11/kegs.jpg")
    test8 = Image(
        article_id=8 ,image="https://today.tamu.edu/wp-content/uploads/2021/07/GettyImages-522615548.jpg")
    test9 = Image(
        article_id=9 ,image="https://www.ducksters.com/history/mesopotamia/sumerian_writing.jpg")
    test10 = Image(
        article_id=10 ,image="https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL3l1cmktZ2FnYXJpbi0xLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6ODI4fX19")

    db.session.add(test1)
    db.session.add(test2)
    db.session.add(test3)
    db.session.add(test4)
    db.session.add(test5)
    db.session.add(test6)
    db.session.add(test7)
    db.session.add(test8)
    db.session.add(test9)
    db.session.add(test10)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_images():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
