"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Medicine
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import bcrypt

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


@api.route('/signin', methods=['POST'])
def signin():
    first_name = request.json.get("first_name", None)
    last_name = request.json.get("last_name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    if first_name == None :
        return jsonify({"msg":"first name field is missing"}), 401
    
    if last_name == None:
        return jsonify({"msg":"last name field is missing"}), 401
    
    if email == None:
        return jsonify({"msg":"email field is missing"})
    
    if password == None: 
        return jsonify({"msg":"password field is missing"})
    
    user = User.query.filter_by(email=email).first()
    
    if user != None:
        return jsonify({"msg":"The user already exist"}), 401
    
    
    bpassword = bytes(password, 'UTF-8')
    salt = bcrypt.gensalt(14)
    
    hashed_password = bcrypt.hashpw(password=bpassword, salt=salt)
    
    print(hashed_password.decode('utf-8'))
    
    
    new_user = User(first_name=first_name, last_name=last_name, email=email, password=hashed_password.decode('utf-8'), salt=salt)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"user": new_user.serialize(),"token": create_access_token(identity=email)}),200