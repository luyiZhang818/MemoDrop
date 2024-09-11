# handling user-related functionalities

import secrets
import jwt
import os
import hashlib
import datetime
from flask import request, jsonify, Blueprint
from config.db import db

# create a Blueprint for user routes
userBlueprint = Blueprint('user', __name__)

def generatePasskey():
    '''
    generates a randomly generated passkey
    returns passkey and hashed passkey
    '''
    passkey = secrets.token_urlsafe(16)
    hashedPasskey = hashlib.sha256(passkey.encode()).hexdigest()
    return passkey, hashedPasskey

@userBlueprint.route('/create-user', methods=['POST'])
def createUser():
    '''
    generates a passkey and stores the hashed passkey in database
    returns plain passkey in JSON for user to use later on to access information stored
    ''' 
    passkey, hashedPasskey = generatePasskey()
    userData = {
        'passkey': hashedPasskey,
        'createdAt': datetime.datetime.now()
    }
    # store user data in database
    db.users.insert_one(userData)
    return jsonify({'passkey': passkey})

def verifyPasskey(passkey):
    '''
    takes a plain passkey and checks if it matches a user
    returns the user data if matched
    '''
    hashedPasskey = hashlib.sha256(passkey.encode()).hexdigest()
    user = db.users.find_one({'passkey': hashedPasskey})
    return user

@userBlueprint.route('/login', methods=['POST'])
def login():
    '''
    triggered when frontend sends a login request with passkey
    verifies passkey
    returns json message with a token if successful
    '''
    data = request.get_json()
    passkey = data.get('passkey')

    # check if passkey is entered
    if not passkey:
        return jsonify({'error': 'Passkey is required'}), 400

    user = verifyPasskey(passkey)

    # check if valid passkey
    if not user:
        return jsonify({'error': 'Passkey is invalid'}), 403

    # generate a token from userId to identify user
    token = jwt.encode({
        'userId': str(user['_id'])
    }, os.getenv('SECRET_KEY'), algorithm='HS256')

    return jsonify({
        'message': 'Login successful',
        'token': token
    }), 200