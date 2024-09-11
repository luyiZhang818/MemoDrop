# defines interactions with mongodb
from config.db import db
from bson.objectid import ObjectId
import datetime

# function to create a new note for a specific user
def createNote(userId, text=None, fileUrl=None):
    note = {
        'userId': userId,
        'createdAt': datetime.datetime.now()
    }
    if text:
        note['text'] = text
    if fileUrl:
        note['fileUrl'] = fileUrl
    
    # inserts note into notes collection and returns note id
    noteRes = db.notes.insert_one(note)
    # add id to note before returning
    note['_id'] = str(noteRes.inserted_id)

    return note


# function to retrieve all notes for a specific user
def getNotes(userId):
    # get all notes from user in descending date (newest first)
    notes = list(db.notes.find({'userId': userId}).sort('createdAt', -1))
    # convert ObjectId element to string for jsonify to work
    for note in notes:
        note['_id'] = str(note['_id'])
    return notes