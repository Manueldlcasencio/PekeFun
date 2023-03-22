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
        if user:
            return jsonify({"info": user.serialize()})
        else:
            return jsonify({"msg": "User doesn't exist."})
    
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
            print("****************", json_kids)
            print("****************", basic_response)
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

@api.route("signup/tutor/child", methods=["POST", "PUT", "DELETE"])
def signup_child():
    if request.method == "POST":
        username = request.json.get("username", None)        
        if not username:
            return jsonify({"msg": "An username must be entered."})
        user_id = User.query.filter_by(email = username).first().id
        tutor_id = Tutor.query.filter_by(user_id = user_id).first().id
        if tutor_id:
            required = Child.__table__.columns.keys()
            missing = []
        for item in required:           
            if item != "id":
                if item not in request.json:
                    missing.append(item)                    
        if missing != []:
            return jsonify({"msg": "Not all camps",
                            "missing": missing})
        child = Child(name = request.json.get("name", None),
                      lastname = request.json.get("lastname", None),
                      parent = tutor_id,
                      birth = request.json.get("birth", None))
        db.session.add(child)
        db.session.commit()

        # Añadir a la tabla del padre
        tutor = Tutor.query.filter_by(user_id = user_id).first()
        tutor.children.append(child)
        db.session.commit()
        return jsonify({"added": username})

    if request.method == "PUT":
        child_id = request.json.get("child_id", None)
        checked_id = Child.query.filter_by(id = child_id).first()
        if not child_id or not checked_id:
            return jsonify({"msg": "You need to send a valid child_id."})
        required = Child.__table__.columns.keys()
        missing = []  
        for item in required:           
            if item != "id" and item != "parent":
                if item not in request.json:
                    missing.append(item)
        if missing != []:
            return jsonify({"msg": "Not all camps",
                                "missing": missing})
        else:
            for item in required:
                change = request.json.get(item,None)
                if item != "id" and item != "parent" and change != "":
                    checked_id.query.update({item: change})
            db.session.commit()
        return jsonify({"changes": request.json})

    if request.method == "DELETE":
        child_id = request.json.get("child_id", None)
        checked_id = Child.query.filter_by(id = child_id).first()
        test = Child.query.filter_by(name = "Pepe").first()
        tutor = Tutor.query.filter_by(id = test.parent).first()
        if not child_id or not checked_id:
            return jsonify({"msg": "You need to send a valid child_id.",
                            "test": test.id})
        child_name = checked_id.name + " " + checked_id.lastname
        tutor.children.remove(checked_id)
        db.session.delete(checked_id)
        db.session.commit()
        return jsonify({"deleted": child_name})
    

@api.route("signup/advertiser", methods=["GET", "POST", "PUT", "DELETE"])
def advertiser():
    if request.method == "GET":
        username = request.json.get("username", None)
        us_id = User.query.filter_by(email = username).first().id
        if not username or not us_id:
            return jsonfiy({"msg": "You must send a valid username"})
        advertiser = Advertiser.query.filter_by(user_id = us_id).first()
        return jsonify({"info": advertiser.serialize()})

    if request.method == "POST":
        username = request.json.get("username", None)
        user = User.query.filter_by(email = username).first()
        if not username or not user:
            return jsonify({"msg": "You must send a valid username"})
        required = ["name", "lastname", "contact", "company"]
        missing = []
        for item in required:           
            if item not in request.json:
                missing.append(item)                    
        if missing != []:
            return jsonify({"msg": "Not all camps",
                            "missing": missing})
        advertiser = Advertiser(name = request.json.get("name", None),
                      lastname = request.json.get("lastname", None),
                      contact = request.json.get("contact", None),
                      company = request.json.get("company", None),
                      user_id = user.id)  
        db.session.add(advertiser)
        db.session.commit()
        return jsonify({"created": request.json.get("name", None) + " " + request.json.get("lastname",None) })

    if request.method == "PUT":
        username = request.json.get("username", None)
        if not username:
            return jsonify({"msg": "An username must be entered."})
        user = User.query.filter_by(email = username).first().id
        advert = Advertiser.query.filter_by(user_id = user).first()
        required = Advertiser.__table__.columns.keys()
        missing = []  
        for item in required:           
            if item != "id" and item != "user_id":
                if item not in request.json:
                    missing.append(item)
        if missing != []:
            return jsonify({"msg": "Not all camps",
                                "missing": missing})
        else:
            for item in required:
                change = request.json.get(item,None)
                if item != "id" and item != "user_id" and change != "":
                    advert.query.update({item: change})
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
            adv = Advertiser.query.filter_by(user_id = user.id).first()
            db.session.delete(adv)
            db.session.commit()
            return jsonify({"removed": username + " as advertiser"})
        else:
            return jsonify({"msg": "Password is wrong."}) 


@api.route("/event", methods=["GET", "POST", "PUT", "DELETE"])   
def event():
    if request.method == "GET":
        event_id = request.json.get("event_id", None)
        event = Event.query.filter_by(id = event_id).first()
        if not event:
            return jsonify({"msg": "Event not found"}), 404
        return jsonify({"info": event.serialize()})

    if request.method == "POST":
        username = request.json.get("username", None)
        user = User.query.filter_by(email = username).first()
        adver = Advertiser.query.filter_by(user_id = user.id).first()
        required = Event.__table__.columns.keys()
        if not user or not adver:
            return jsonify({"msg": "You must send a valid username that is an advertiser"})
        missing = []
        for item in required:
            if item not in request.json and item != "id" and item != "id_advertiser" and item != score and item != score_amount and item != score_sum and item != done and item != participants:
                missing.append(item)
        if missing != []:
            return jsonify({"missing": missing }), 400
        event = Event(id_advertiser = adver.id,
                      name = request.json.get("name", None),
                      localization = request.json.get("localization", None),
                      min_age = request.json.get("min_age", None),
                      max_age = request.json.get("max_age", None),
                      price = request.json.get("price", None),
                      date = request.json.get("date", None),
                      length = request.json.get("length",None),
                      category = request.json.get("category", None),
                      slots = request.json.get("slots", None),
                      description = request.json.get("description", None),
                      contact = request.json.get("contact", None),
                      company = request.json.get("company", None),
                      cloth = request.json.get("cloth", None),
                      others = request.json.get("others", None))
        db.session.add(event)   
        db.session.commit()
        return jsonify({"msg": "Event created"})  

    if request.method == "PUT":
        event_id = request.json.get("event_id", None)
        event = Event.request.json.get("event", None).first()
        possible = Event.__table__.columns.keys()
        for item in request.json:
            if item in possible and item != "event_id":
                event.query.update({item: change})
            elif item not in possible and item != "event_id":
                return jsonify({"error": item + "can't be changed"})
        db.session.commit()
        return jsonify({"msg": "Event modified"})

    if request.method == "DELETE":
        event_id = request.json.get("event_id", None)
        event = Event.request.json.get("event", None).first()
        db.session.delete(event)
        db.session.commit()
        return jsonify({"msg": "Event deleted"})
        

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
