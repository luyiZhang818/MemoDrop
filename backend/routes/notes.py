# API routes for notes
from flask import Blueprint, request, jsonify
from models.note import createNote, getNotes
import jwt
import os
import boto3

# create a Blueprint for all notes routes
notesBlueprint = Blueprint('notes', __name__)

# S3 configuration
s3 = boto3.client('s3')
bucketName = os.getenv('AWS_BUCKET_NAME')
awsRegion = os.getenv('AWS_REGION')

# POST route to create a new note
@notesBlueprint.route('/notes', methods=['POST'])  # when POST request is made to /notes endpoint, execute addNote
def addNote():
    '''
    get token from headers, text and files, and create a note
    return newly created note data
    '''
    # get token from headers
    authHeader = request.headers.get('Authorization')
    token = authHeader.split(" ")[1] if authHeader else None

    if not token:
        return jsonify({"error": "Unauthorized"}), 401
    
    try:
        # decode token using secret key to get userId
        decodedToken = jwt.decode(token, os.getenv('SECRET_KEY'), algorithms=['HS256'])
        userId = decodedToken['userId']
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401

    # get the text and file we need to add to the space
    text = request.form.get('text')
    file = request.files.get('file')

    # return error if missing both text and file
    if not text and not file:
        return jsonify({"error": "Either text or file must be provided"}), 400

    fileUrl = None
    # if file provided, upload to S3
    if file:
        try:
            s3.upload_fileobj(file, bucketName, file.filename)
            fileUrl = f"https://{bucketName}.s3.{awsRegion}.amazonaws.com/{file.filename}"
        except Exception as e:
            return jsonify({"error": f"File upload failed: {str(e)}"}), 500

    # create note and associate with userId
    try:
        newNote = createNote(userId, text, fileUrl) 
        return jsonify(newNote)
    except Exception as e:
        return jsonify({'error': f'Note creation failed: {str(e)}'}), 500


# GET route to retrieve all notes
@notesBlueprint.route('/notes', methods=['GET'])  # when GET request is made to /notes, execute fetchNotes
def fetchNotes():
    '''
    decodes token from header and fetch all notes with userId
    return notes in json
    '''
    # get token from headers
    authHeader = request.headers.get('Authorization')
    token = authHeader.split(" ")[1] if authHeader else None

    if not token:
        return jsonify({"error": "Unauthorized"}), 401
    
    try:
        # decode token using secret key to get userId
        decodedToken = jwt.decode(token, os.getenv('SECRET_KEY'), algorithms=['HS256'])
        userId = decodedToken['userId']
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401

    try: 
        notes = getNotes(userId)  
        return jsonify(notes), 200 
    except Exception as e:
        return jsonify({"error": f"Failed to fetch notes: {str(e)}"}), 500
