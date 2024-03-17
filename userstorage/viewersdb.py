from flask import Flask, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"
mongo = PyMongo(app)

@app.route("/update_profile", methods=['POST'])
def update_users():
    viewersTable = mongo.db.viewers
    
    update = request.get_json()
    username = update.get('userName')
    favoritemovie = update.get('favoriteMovie')
    favoritegenre = update.get('favoriteGenre')
    favoriteactor = update.get('favoriteActor')
    
    updateDict = {}
    if(len(username) > 0):
        updateDict['username'] = username
    if(len(favoritemovie) > 0):
        updateDict['favoritemovie'] = favoritemovie
    if(len(favoritegenre) > 0):
        updateDict['favoritegenre'] = favoritegenre
    if(len(favoriteactor) > 0):
        updateDict['favoriteactor'] = favoriteactor
       
    
    updateViewer = viewersTable.insert_one(updateDict)
    
    return jsonify({'response': "Updated successfully!"})
    

if __name__ == '__main__':
    app.run(debug=True)





