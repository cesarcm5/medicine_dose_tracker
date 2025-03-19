"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Medicine
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
import os

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#MANTENER USUARIO LOGEADO
@api.route("/user", methods=["GET"])
@jwt_required()
def get_user_logged():
    current_user = get_jwt_identity()
    print(f"Usuario actual: {current_user}")
    user = User.query.filter_by(email=current_user).first()
    return jsonify(user.serialize()),200

#TRAER A TODOS LOS USERS
@api.route('/users', methods=['GET'])
def all_users():
    users = User.query.all()
    usuarios_serializados = [persona.serialize() for persona in users]
    return jsonify(usuarios_serializados), 200

#TRAER A UN SOLO USER POR EMAIL
@api.route("/user/<string:email>", methods=["GET"])
def get_user(email):
    searched_user = User.query.filter_by(email=email).one_or_none() 

    if searched_user is None:  
        return jsonify({"error": f"Usuario con email: {email} no encontrado"}), 404
    
    usuario_serializado = searched_user.serialize() 
    return jsonify(usuario_serializado), 200


@api.route('/login', methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email == None or password == None:
        return jsonify({"msg": "Falta el correo o contraseña"}), 401
    
    user = User.query.filter(email=email).first()
    if user == None:
        return jsonify({"msg": "User not found"}), 401
    
    if not check_password_hash(user.password, password):
        return jsonify({"msg": "Contraseña incorrecta"}), 401

    # Generar un token de acceso si las credenciales son válidas
    access_token = create_access_token(identity=user.email)
    return jsonify({"msg": "Inicio de sesión exitoso", "token": access_token, "user": user.serialize()}), 200



@api.route('/signin', methods=['POST'])
def signin():
    first_name = request.json.get("first_name", None)
    last_name = request.json.get("last_name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    if first_name is None:
        return jsonify({"msg": "first name field is missing"}), 401
    
    if last_name is None:
        return jsonify({"msg": "last name field is missing"}), 401
    
    if email is None:
        return jsonify({"msg": "email field is missing"}), 401
    
    if password is None:
        return jsonify({"msg": "password field is missing"}), 401
    
    user = User.query.filter_by(email=email).first()
    
    if user is not None:
        return jsonify({"msg": "The user already exists"}), 401
    
    hashed_password = generate_password_hash(password)
        
    new_user = User(first_name=first_name, last_name=last_name, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"user": new_user.serialize(), "token": create_access_token(identity=email)}), 200