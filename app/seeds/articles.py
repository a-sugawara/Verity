from app.models import db, Article

# Adds a demo user, you can add other users here if you want
def seed_articles():
    test1 = Article(
        user_id=1, title='Sneeze', description='https://en.wikipedia.org/wiki/God_bless_you',article="Some people believed that a sneeze causes the soul to escape the body through the nose. Saying 'bless you' would stop the devil from claiming the person's freed soul. Others believed the opposite: that evil spirits use the sneeze as an opportunity to enter a person's body.")
    test2 = Article(
        user_id=1, title='New York, New York', description='https://en.wikipedia.org/wiki/New_York_City',article="The English took over the colony in 1664 during the second Anglo-Dutch War. They changed the name to New York, to honor the Duke of York, who later became King James II of England. The Dutch surrendered Nieuw Amsterdam without fighting.")
    test3 = Article(
        user_id=1, title='Boiling Point', description='http://en.m.wikipedia.org/wiki/Fahrenheit',article="On the Fahrenheit scale, the freezing point of water is 32 degrees Fahrenheit (°F) and the boiling point 212 °F (at standard atmospheric pressure). This puts the boiling and freezing points of water exactly 180 degrees apart.")
    test4 = Article(
        user_id=1, title='Water Weight', description='http://water.usgs.gov/edu/propertyyou.html',article="By one year of age, that amount drops to about 65%. In adult men, about 60 percent of their bodies are water. However, fat tissue does not have as much water as lean tissue. In adult women, fat makes up more of the body than men, so they have about 55 percent of their bodies made of water.")
    test5 = Article(
        user_id=1, title='Bean Water', description='http://en.wikipedia.org/wiki/Coffee',article="It was here in Arabia that coffee seeds were first roasted and brewed, in a similar way to how it is now prepared. By the 16th century, it had reached the rest of the Middle East, Persia, Turkey, and northern Africa. Coffee seeds were first exported from Ethiopia to Yemen.")
    test6 = Article(
        user_id=1, title='My Oath', description='http://www.pbs.org/wgbh/nova/body/hippocratic-oath-today.html',article="Hippocratic Oath: Modern Version. I swear to fulfill, to the best of my ability and judgment, this covenant: I will respect the hard-won scientific gains of those physicians in whose steps I walk, and gladly share such knowledge as is mine with those who are to follow.")
    test7 = Article(
        user_id=1, title='Whats a keg?', description='http://www.belmont-station.com/index.php?id=keg-policies',article="A barrel (Bbl) is the standard method for measuring kegs of beer. Depending on the brewery, beers are kegged in various size containers, as follows: 1/2 barrel = 15.5 gallons = 124 pints = 165 12oz bottles - (Full Size Keg)")
    test8 = Article(
        user_id=1, title='Bond, otter Bond', description='https://northamericannature.com/why-do-otters-hold-hands',article="Otters are known to hold hands in groups - called a raft - while they eat, sleep and rest, to prevent families losing each other. The furry animals, the largest member of the weasel family, are even known to wrap sea plants around them to secure the bond.")
    test9 = Article(
        user_id=1, title='Early Writings', description='https://edsitement.neh.gov/lesson-plans/cuneiform-writing-system-ancient-mesopotamia-emergence-and-evolution',article="The earliest writing systems evolved independently and at roughly the same time in Egypt and Mesopotamia, but current scholarship suggests that Mesopotamia's writing appeared first. That writing system, invented by the Sumerians, emerged in Mesopotamia around 3500 BCE.")
    test10 = Article(
        user_id=1, title='Buzz? Just kidding', description='http://www.bbc.co.uk/science/space/solarsystem/astronauts/yuri_gagarin',article="First man in space. On 12 April 1961 Russian cosmonaut Yuri Gagarin became the first human in space when he orbited the Earth once during a 108 minute flight. In 1960 Gagarin, a fighter pilot, was shortlisted for the Vostok 1 programme, which built on the success of Sputnik 1 just three years earlier.")

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
def undo_articles():
    db.session.execute('TRUNCATE articles RESTART IDENTITY CASCADE;')
    db.session.commit()
