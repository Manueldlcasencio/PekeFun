"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Tutor, Child, Advertiser, Event, childs, participants
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route("/signup", methods=["POST", "PUT", "DELETE", "GET"])
def signup():
    if request.method == "GET":
        username = request.json.get("username", None)
        if not username:
            return jsonify({"msg": "An username must be entered."})
        user = User.query.filter_by(email = username).first()
        return jsonify({"info": user.serialize()})
    
    if request.method == "POST":
        username = request.json.get("username", None)
        password = request.json.get("password", None)
        if not username or not password:
            return jsonify({"msg": "An username and password must be entered."})
        user = User(email = username,
                    password = password)
        db.session.add(user)
        db.session.commit()
        return jsonify({"added": username})
    
    if request.method == "PUT":
        username = request.json.get("username", None)
        password = request.json.get("password", None)
        if not username or not password:
            return jsonify({"msg": "An username and password must be entered. Only the password will change."})
        user = User.query.filter_by(email = username).first()
        user.password = password
        db.session.commit()
        return jsonify({"msg": "Password has been updated"})

    if request.method == "DELETE":
        username = request.json.get("username", None)
        password = request.json.get("password", None)
        if not username or not password:
            return jsonify({"msg": "An username and password must be entered."})
        user = User.query.filter_by(email = username).first()
        if not user:
            return jsonify({"msg": "User not found"}), 404
        if user.password == password:
            db.session.delete(user)
            db.session.commit()
            return jsonify({"removed": username})
        else:
            return jsonify({"msg": "Password is wrong."})

# About tutors
@api.route("/signup/tutor", methods=["POST", "PUT", "DELETE", "GET"])
def signup_tutor():
    if request.method == "GET":
        username = request.json.get("username", None)
        user = User.query.filter_by(email = username).first()
        tutor = Tutor.query.filter_by(user_id = user.id).first()
        if tutor:
            basic_response = tutor.serialize()
            kids = tutor.children
            json_kids = []
            for kid in kids:
                temp_kids = kid.serialize()
                json_kids.append(temp_kids)
            return jsonify({"kids": json_kids,
                            "msg": basic_response})
    
    if request.method == "POST":
        username = request.json.get("username", None)        
        if not username:
            return jsonify({"msg": "An username must be entered."})
        query_id = User.query.filter_by(email = username).first()
        id = query_id.id
        tutor = Tutor(user_id = id)
        db.session.add(tutor)
        db.session.commit()
        return jsonify({"added": username})

    if request.method == "PUT":
        username = request.json.get("username", None)
        if not username:
            return jsonify({"msg": "An username must be entered."})
        user = User.query.filter_by(email = username).first().id
        tutor = Tutor.query.filter_by(user_id = user).first()
        serialize = Tutor.__table__.columns.keys()
        missing = []  
        for item in serialize:           
            if item != "id" and item != "user_id" and item != "children":
                if item not in request.json:
                    missing.append(item)
        if missing != []:
            return jsonify({"msg": "Not all camps",
                                "missing": missing})
        else:
            for item in serialize:
                change = request.json.get(item,None)
                if item != "id" and item != "user_id" and item != "children" and change != "":
                    tutor.query.update({item: change})
            db.session.commit()
        return jsonify({"Changes": request.json})

    if request.method == "DELETE":
        username = request.json.get("username", None)
        password = request.json.get("password", None)
        if not username or not password:
            return jsonify({"msg": "An username and password must be entered."})
        user = User.query.filter_by(email = username).first()
        if not user:
            return jsonify({"msg": "User not found"}), 404
        if user.password == password:
            tutor = Tutor.query.filter_by(user_id = user.id).first()
            db.session.delete(tutor)
            db.session.commit()
            return jsonify({"removed": username + " as tutor"})
        else:
            return jsonify({"msg": "Password is wrong."})

@api.route("signup/tutor/child", methods=["GET", "POST", "PUT", "DELETE"])
def signup_child():
    if request.method == "GET":
        username = request.json.get("username", None)
        user = User.query.filter_by(email = username).first()
        tutor = Tutor.query.filter_by(user_id = user.id).first()
        if tutor:
            basic_response = tutor.serialize()
            kids = tutor.children
            json_kids = []
            for kid in kids:
                temp_kids = kid.serialize()
                json_kids.append(temp_kids)
            return jsonify({"kids": json_kids,
                            "msg": basic_response})
    
    if request.method == "POST":
        username = request.json.get("username", None)        
        if not username:
            return jsonify({"msg": "An username must be entered."})
        query_id = User.query.filter_by(email = username).first()
        id = query_id.id
        tutor = Tutor(user_id = id)
        db.session.add(tutor)
        db.session.commit()
        return jsonify({"added": username})

    if request.method == "PUT":
        username = request.json.get("username", None)
        if not username:
            return jsonify({"msg": "An username must be entered."})
        user = User.query.filter_by(email = username).first().id
        tutor = Tutor.query.filter_by(user_id = user).first()
        serialize = Tutor.__table__.columns.keys()
        missing = []  
        for item in serialize:           
            if item != "id" and item != "user_id" and item != "children":
                if item not in request.json:
                    missing.append(item)
        if missing != []:
            return jsonify({"msg": "Not all camps",
                                "missing": missing})
        else:
            for item in serialize:
                change = request.json.get(item,None)
                if item != "id" and item != "user_id" and item != "children" and change != "":
                    tutor.query.update({item: change})
            db.session.commit()
        return jsonify({"Changes": request.json})

    if request.method == "DELETE":
        username = request.json.get("username", None)
        password = request.json.get("password", None)
        if not username or not password:
            return jsonify({"msg": "An username and password must be entered."})
        user = User.query.filter_by(email = username).first()
        if not user:
            return jsonify({"msg": "User not found"}), 404
        if user.password == password:
            tutor = Tutor.query.filter_by(user_id = user.id).first()
            db.session.delete(tutor)
            db.session.commit()
            return jsonify({"removed": username + " as tutor"})
        else:
            return jsonify({"msg": "Password is wrong."})

@api.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email = username).first()
    if user:
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token)
    else:
        return jsonify({"msg": "Error"})

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
