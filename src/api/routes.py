"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Tutor, Child, Advertiser, Event, childs, Participants
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route("/signup", methods=["POST"])
def signup():    
    if request.method == "POST":
        username = request.json.get("username", None)
        password = request.json.get("password", None)
        if not username or not password:
            return jsonify({"msg": "An username and password must be entered."}), 400
        check_if_exist = User.query.filter_by(email = username).first()
        if check_if_exist:
            return jsonify({"msg": "Email in use"})
        user = User(email = username,
                    password = password,
                    is_tutor = request.json.get("is_tutor", None),
                    is_advertiser = request.json.get("is_advertiser", None))
        db.session.add(user)
        db.session.commit()
        return jsonify({"username_added": username}), 200


@api.route("/signup/info", methods=["GET", "PUT", "DELETE"])
@jwt_required()
def signup_info():
    if request.method == "GET":
        username = request.args.get("username", None)
        if not username:
            return jsonify({"msg": "An username must be entered."}), 404
        user = User.query.filter_by(email = username).first()
        if user:
            return jsonify({"info": user.serialize()}), 200
        else:
            return jsonify({"msg": "User doesn't exist."}), 404
  
    if request.method == "PUT":
        username = request.json.get("username", None)
        old_password = request.json.get("old_password", None)
        new_password = request.json.get("new_password", None)
        if not username or not old_password or not new_password:
            return jsonify({"msg": "Send username, old_password and new_password."}), 400
        user = User.query.filter_by(email = username).first()
        if not user:
            return jsonify({"msg": "User not found"}), 404
        if user.password != old_password:
            return jsonify({"msg": "Password don't match"}), 400
        user.password = new_password
        db.session.commit()
        return jsonify({"msg": "Password has been updated"}), 200

    if request.method == "DELETE":
        username = request.json.get("username", None)
        password = request.json.get("password", None)
        if not username or not password:
            return jsonify({"msg": "An username and password must be entered."}), 400
        user = User.query.filter_by(email = username).first()
        if not user:
            return jsonify({"msg": "User not found"}), 404
        if user.password == password:
            userid = user.id
            tutor = Tutor.query.filter_by(user_id = userid).first()
            advertiser = Advertiser.query.filter_by(user_id = userid).first()
            if tutor:
                if tutor.children:
                    for kid in tutor.children:
                        participant_id = Participants.query.filter_by(child_id = kid.id).first()
                        if participant_id:
                            db.session.delete(participant_id)
                    to_remove = []
                    for item in tutor.children:
                        to_remove.append(item)
                    for item in to_remove:
                        for event in tutor.children:
                            tutor.children.remove(item)
                            db.session.delete(item)
                db.session.delete(tutor)
            if advertiser:         
                if advertiser.events: 
                    to_remove = []
                    for item in advertiser.events:
                        to_remove.append(item)
                    for item in to_remove:
                        for event in advertiser.events:
                            advertiser.events.remove(item)
                            db.session.delete(item) 
            db.session.delete(user)
            db.session.commit()
            return jsonify({"removed": username}), 200
        else:
            return jsonify({"msg": "Password is wrong."}), 400

# About tutors
@api.route("/signup/tutor", methods=["GET", "POST", "PUT", "DELETE"])
@jwt_required()
def signup_tutor():  
    if request.method == "GET":
        username = request.args.get("username", None)
        if not username or username == "":
            return jsonify({"msg": "You must send a valid username"}), 400
        user = User.query.filter_by(email = username).first()
        if not user:
            return jsonify({"error": "User not found"}), 404
        tutor = Tutor.query.filter_by(user_id = user.id).first()
        if tutor:
            basic_response = tutor.serialize()
            kids = tutor.children
            json_kids = []
            for kid in kids:
                temp_kids = kid.serialize()
                json_kids.append(temp_kids)
            return jsonify({"kids": json_kids,
                            "msg": basic_response}), 200
        else:
            return jsonify({"error": "Tutor not found"}), 400
    if request.method == "POST":
        username = request.json.get("username", None)        
        if not username:
            return jsonify({"msg": "An username must be entered."}), 400
        query_id = User.query.filter_by(email = username).first()
        if not query_id:
            return jsonify({"error": "Username not found"}), 404
        query_id.query.update({"is_tutor": True})
        id = query_id.id
        tutor = Tutor(user_id = id,
                      birth = request.json.get("birth", None),
                      location = request.json.get("location", None),
                      avatar = request.json.get("avatar", None),
                      name = request.json.get("name", None),
                      lastname = request.json.get("lastname", None))
        db.session.add(tutor)
        db.session.commit()
        return jsonify({"tutor_added": username}), 200

    if request.method == "PUT":
        username = request.json.get("username", None)
        if not username:
            return jsonify({"msg": "An username must be entered."}), 400
        user = User.query.filter_by(email = username).first().id
        tutor = Tutor.query.filter_by(user_id = user).first()
        if not user:
            return jsonify({"error": "Username not found"}), 404
        if not tutor:
            return jsonify({"error": "Tutor not found"}), 400
        serialize = Tutor.__table__.columns.keys()
        missing = []  
        for item in serialize:           
            if item != "id" and item != "user_id" and item != "children":
                if item not in request.json:
                    missing.append(item)
        if missing != []:
            return jsonify({"msg": "Not all camps",
                                "missing": missing}), 404
        else:
            for item in serialize:
                change = request.json.get(item,None)
                if item != "id" and item != "user_id" and item != "children" and change != "":
                    tutor.query.update({item: change})
            db.session.commit()
        return jsonify({"Changes": request.json}), 200

    if request.method == "DELETE":
        username = request.json.get("username", None)
        password = request.json.get("password", None)
        if not username or not password:
            return jsonify({"msg": "An username and password must be entered."}), 400
        user = User.query.filter_by(email = username).first()
        if not user:
            return jsonify({"msg": "User not found"}), 404
        if user.password == password:
            tutor = Tutor.query.filter_by(user_id = user.id).first()
            if not tutor:
                return jsonify({"error": "Tutor not found"}), 400
            if tutor:
                if tutor.children:
                    for kid in tutor.children:
                        participant_id = Participants.query.filter_by(child_id = kid.id).first()
                        if participant_id:
                            db.session.delete(participant_id)
                    to_remove = []
                    for item in tutor.children:
                        to_remove.append(item)
                    for item in to_remove:
                        for event in tutor.children:
                            tutor.children.remove(item)
                            db.session.delete(item)
                db.session.delete(tutor)
                db.session.commit()
            return jsonify({"removed": username + " as tutor"}), 200
        else:
            return jsonify({"msg": "Password is wrong."})


@api.route("signup/tutor/child", methods=["POST", "PUT", "DELETE"])
@jwt_required()
def signup_child():
    if request.method == "POST":
        username = request.json.get("username", None)        
        if not username:
            return jsonify({"msg": "An username must be entered."}), 400
        user_id = User.query.filter_by(email = username).first().id
        tutor_id = Tutor.query.filter_by(user_id = user_id).first().id
        if not user_id:
            return jsonify({"error": "Username not found"}), 404
        if not tutor_id:
            return jsonify({"error": "Tutor not found"}), 400
        if tutor_id:
            required = Child.__table__.columns.keys()
            missing = []
        for item in required:           
            if item != "id":
                if item not in request.json:
                    missing.append(item)                    
        if missing != []:
            return jsonify({"msg": "Not all camps",
                            "missing": missing}), 404
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
        return jsonify({"child_added": request.json.get("name", None)})

    if request.method == "PUT":
        child_id = request.json.get("child_id", None)
        checked_id = Child.query.filter_by(id = child_id).first()
        if not child_id or not checked_id:
            return jsonify({"msg": "You need to send a valid child_id."}), 400
        required = Child.__table__.columns.keys()
        missing = []  
        for item in required:           
            if item != "id" and item != "parent":
                if item not in request.json:
                    missing.append(item)
        if missing != []:
            return jsonify({"msg": "Not all camps",
                                "missing": missing}), 404
        else:
            for item in required:
                change = request.json.get(item,None)
                if item != "id" and item != "parent" and change != "":
                    checked_id.query.update({item: change})
            db.session.commit()
        return jsonify({"changes": request.json}), 200

    if request.method == "DELETE":
        child_id = request.json.get("child_id", None)
        checked_id = Child.query.filter_by(id = child_id).first()
        tutor = Tutor.query.filter_by(id = test.parent).first()
        if not child_id or not checked_id:
            return jsonify({"msg": "You need to send a valid child_id."}), 404
        child_name = checked_id.name + " " + checked_id.lastname
        tutor.children.remove(checked_id)
        db.session.delete(checked_id)
        db.session.commit()
        return jsonify({"deleted": child_name}), 200
    
@api.route("signup/advertiser", methods=["GET", "POST", "PUT", "DELETE"])
@jwt_required()
def advertiser():
    if request.method == "GET":
        username = request.args.get("username", None)
        if not username:
            return jsonify({"msg": "You must send a valid username"}), 400
        us_id = User.query.filter_by(email = username).first().id
        if not username:
            return jsonify({"msg": "You must send a valid username"}), 400
        advertiser = Advertiser.query.filter_by(user_id = us_id).first()
        events = []
        for event in advertiser.events:
            events.append(event.serialize())
        return jsonify({"info": advertiser.serialize(),
                        "events": events})

    if request.method == "POST":
        username = request.json.get("username", None)
        user = User.query.filter_by(email = username).first()
        if not username or not user:
            return jsonify({"msg": "You must send a valid username"}), 400
        user.query.update({"is_advertiser": True})
        required = ["name", "lastname", "contact", "company"]
        missing = []
        for item in required:           
            if item not in request.json:
                missing.append(item)                    
        if missing != []:
            return jsonify({"msg": "Not all camps",
                            "missing": missing}), 404
        advertiser = Advertiser(name = request.json.get("name", None),
                      lastname = request.json.get("lastname", None),
                      contact = request.json.get("contact", None),
                      company = request.json.get("company", None),
                      user_id = user.id)  
        db.session.add(advertiser)
        db.session.commit()
        return jsonify({"advertiser_added": request.json.get("name", None) + " " + request.json.get("lastname",None) }), 200

    if request.method == "PUT":
        username = request.json.get("username", None)
        if not username:
            return jsonify({"msg": "An username must be entered."}), 400
        user = User.query.filter_by(email = username).first().id
        advert = Advertiser.query.filter_by(user_id = user).first()
        if not user or not advert:
            return jsonify({"msg": "You must send a valid username"}), 404
        required = Advertiser.__table__.columns.keys()
        missing = []  
        for item in required:           
            if item != "id" and item != "user_id":
                if item not in request.json:
                    missing.append(item)
        if missing != []:
            return jsonify({"msg": "Not all camps",
                                "missing": missing}), 404
        else:
            for item in required:
                change = request.json.get(item,None)
                if item != "id" and item != "user_id" and change != "":
                    advert.query.update({item: change})
            db.session.commit()
        return jsonify({"Changes": request.json}), 200

    if request.method == "DELETE":
        username = request.json.get("username", None)
        password = request.json.get("password", None)
        if not username or not password:
            return jsonify({"msg": "An username and password must be entered."}), 400
        user = User.query.filter_by(email = username).first()
        if not user:
            return jsonify({"msg": "User not found"}), 404
        if user.password == password:
            adv = Advertiser.query.filter_by(user_id = user.id).first()
            user.query.update({"is_advertiser": False})
            if adv:         
                if advertiser.events: 
                    to_remove = []
                    for item in advertiser.events:
                        to_remove.append(item)
                    for item in to_remove:
                        for event in advertiser.events:
                            advertiser.events.remove(item)
                            db.session.delete(item)            
                db.session.delete(adv)
                db.session.commit()
                return jsonify({"removed": username + " as advertiser"}), 200
        else:
            return jsonify({"msg": "Password is wrong."}), 400


@api.route("/event", methods=["GET", "POST", "PUT", "DELETE"])   
@jwt_required()
def event():
    if request.method == "GET":
        event_id = request.args.get("event_id", None)
        event = Event.query.filter_by(id = event_id).first()
        if not event:
            return jsonify({"msg": "Event not found"}), 404
        participation = event.participants
        response = []
        for kid in participation:
            find_child = kid.child_id
            found_child = Child.query.filter_by(id = find_child).first()
            response.append(found_child.name + " " + found_child.lastname)
        return jsonify({"info": event.serialize(),
                        "participants": response}), 200

    if request.method == "POST":
        username = request.json.get("username", None)
        user = User.query.filter_by(email = username).first()
        if not user:
            return jsonify({"msg": "User not found"}), 404
        adver = Advertiser.query.filter_by(user_id = user.id).first()
        required = Event.__table__.columns.keys()
        if not user or not adver:
            return jsonify({"msg": "You must send a valid username that is an advertiser"}), 400
        missing = []
        for item in required:
            if item not in request.json and item != "id" and item != "id_advertiser" and item != "score" and item != "score_amount" and item != "score_sum" and item != "done" and item != "participants" and item != "company" and item != "contact":
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
                      cloth = request.json.get("cloth", None),
                      others = request.json.get("others", None),
                      done = False,
                      score = 0,
                      score_amount = 0,
                      score_sum = 0)
        db.session.add(event)   
        db.session.commit()
        return jsonify({"msg": "Event created"}), 200 

    if request.method == "PUT":
        event_id = request.json.get("event_id", None)
        event = Event.request.json.get("event", None).first()
        if not event:
            return jsonify({"msg": "Event id not found"}), 404
        possible = Event.__table__.columns.keys()
        for item in request.json:
            if item in possible and item != "event_id":
                event.query.update({item: change})
            elif item not in possible and item != "event_id":
                return jsonify({"error": item + "can't be changed"}), 400
        db.session.commit()
        return jsonify({"msg": "Event modified"}), 200

    if request.method == "DELETE":
        event_id = request.json.get("event_id", None)
        event = Event.request.json.get("event", None).first()
        if not event:
           return jsonify({"msg": "Event id not found"}), 404 
        db.session.delete(event)
        db.session.commit()
        return jsonify({"msg": "Event deleted"})


@api.route("/event/participant", methods=["POST", "PUT", "DELETE"])
@jwt_required()
def participant():
    required = ["event_id", "child_id", "was_there", "score_given"]
    for item in request.json:
        if item not in required:
            return jsonify({"msg": "You must send all this values",
                            "values": required}), 404
    if len(request.json) != len(required):
        return jsonify({"msg": "You must send all this values",
                            "values": required}), 404
    event_id = request.json.get("event_id", None)
    event = Event.query.filter_by(id = event_id).first()
    if not event:
        return jsonify({"msg": "Event not found. Send event_id"}), 404
    child_id = request.json.get("child_id", None)
    child = Child.query.filter_by(id = child_id).first()
    if not child:
        return jsonify({"msg": "Child not found. Send child_id"}), 404   
    if request.method == "POST":
        participant = Participants(event_id = request.json.get("event_id", None),
                                  child_id = request.json.get("child_id", None),
                                  was_there = request.json.get("was_there", None))
        db.session.add(participant)
        db.session.commit()
        return jsonify({"participant_added": child.id,
                        "event": event.name}), 200

    if request.method == "PUT":
        participant_id = Participants.query.filter_by(event_id = event_id, child_id = child_id).first()
        if not participant_id:
            return jsonify({"msg": "Participant not found in event"})
        participant_id.query.update({"was_there": request.json.get("was_there", None),
                                     "score_given": request.json.get("score_given", None)})
        event = Event.query.filter_by(id = event_id).first()
        if request.json.get("score_given") > 1 and request.json.get("was_there",None) == True:
            event.score_amount = event.score_amount + 1
            event.score_sum = event.score_sum + request.json.get("score_given")
            event.score = event.score_sum / event.score_amount
        db.session.commit()
        return jsonify({"msg": "Participant modified"}), 200

    if request.method == "DELETE":
        participant_id = Participants.query.filter_by(event_id = event_id, child_id = child_id).first()
        child_id = Child.query.filter_by(id = participant_id.child_id).first()
        name = child_id.name + " " + child_id.lastname
        if not participant_id:
            return jsonify({"msg": "Participant not found in event"}), 404
        db.session.delete(participant_id)
        db.session.commit()
        return jsonify({"msg": "Deleted participant " + name}), 200


@api.route("event/all", methods=["GET"])
def eventall():
    done = request.args.get("done")
    category = request.args.get("category")
    word = request.args.get("word")
    if not done and not category and not word:
        return jsonify({"msg": "You must send at least one.",
                        "category": "name of the category",
                        "done": "true, false or all (string)",
                        "word": "Word to filter names"}), 404
    response = []
    if done and not category and not word:
        if done == "false":
            allactive = Event.query.filter_by(done = False).all()
            for event in allactive:
                response.append(event.serialize())
        elif done == "true":
            unactive = Event.query.filter_by(done = True).all()
            for event in unactive:
                response.append(event.serialize())
        elif done == "all":
            allevent = Event.query.all()
            for event in allevent:
                response.append(event.serialize())
    if category and not word:
        if done:
            filtered = Event.query.filter_by(done = done, category = category).all()
            for event in filtered:
                response.append(event.serialize())
        else:
            filtered = Event.query.filter_by(category = category).all()
            for event in filtered:
                response.append(event.serialize())
    if word:
        if done and category:
            filtered = Event.query.filter_by(done = done, category = category).filter(Event.name.contains(word)).all()
            for event in filtered:
                response.append(event.serialize())
        if done and not category:
            filtered = Event.query.filter_by(done = done).filter(Event.name.contains(word)).all()
            for event in filtered:
                response.append(event.serialize())
        else:
            filtered = Event.query.filter(Event.name.contains(word)).all()
            for event in filtered:
                response.append(event.serialize())
    return jsonify({"msg": response}), 200


@api.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if not username or not password:
        return jsonify({"msg": "You need to send username and password"}), 400
    user = User.query.filter_by(email = username).first()
    if not user:
        return jsonify({"msg": "User doesn't exist"}), 404
    if user and user.password == password:
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Error. Password is wrong."}), 400

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    if current_user:
        return jsonify(logged_in_as=current_user), 200
    else:
        return jsonify({"msg": "Not authorized."}), 400
