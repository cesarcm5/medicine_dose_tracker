from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__= 'users'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), unique=True, nullable=False)
    last_name = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    medicines = db.relationship("Medicine", back_populates="user", lazy=True)
    
    def __init__(self, first_name, last_name, email, password, is_active=False):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.is_active = is_active


    def __repr__(self):
        return f'<User {self.email} id: {self.id} {self.medicines}>'
    

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "medicines": [medicine.serialize() for medicine in self.medicines]
            # do not serialize the password, its a security breach
        }
        
class Medicine(db.Model):
    __tablename__ = 'medicine'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    dosage = db.Column(db.Integer(), unique=False, nullable=False)
    frequency = db.Column(db.Integer(), unique=False, nullable=False)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'), nullable=False)
    user = db.relationship("User", back_populates="medicines", lazy=True)
    
    def __init__(self, name, dosage, frequency, user_id):
        self.name = name,
        self.dosage = dosage,
        self.frequency = frequency
        self.user_id = user_id
    

    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "dosage": self.dosage,
            "frequency": self.frequency,
            "user_id": self.user_id
        }
    
        
    
    