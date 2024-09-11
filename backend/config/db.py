from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

# set up MongoDB connection
mongoUri = os.getenv("MONGO_URI")
client = MongoClient(mongoUri)
db = client['memoDropData']