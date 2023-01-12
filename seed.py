from app import app
from models import db, User

db.drop_all()
db.create_all()

# password == hashed 'password', utf-8 encoded
u1 = User(
    email="user1@email.com",
    username='user1',
    password='\x2432622431322435594a327878386257595a366954565139304a772f4f612e47464f774d31356963544f30324d7575652e382f484953703532557a65',
)

db.session.add_all([u1])
db.session.commit()