Importer JSON Robo3t avec mongoimport ( regarder mongoimport --help )
Lancer Robo3t ./robo3t &

 2)./mongoimport --db=new_york --collection=restaurants --file=/Home/iurrutia/restaurants.json


//3.a)
db.getCollection('restaurants').find({}).count()
//3.b)
db.getCollection('restaurants').findOne()
//3.c)
db.getCollection('restaurants').distinct("borough")
//3.d)
db.getCollection('restaurants').distinct("cuisine")
//3.e)
db.getCollection('restaurants').find({"borough":"Queens"},{"_id" : 0, "name" : 1})
//3.f)
db.getCollection('restaurants').find({"borough":"Queens"}).count()

//3.g)
db.getCollection('restaurants').find({"borough":"Brooklyn","cuisine":"Italian","address.street": "5 Avenue"},{"name" : 1, "_id": 0})

//3.h)
db.getCollection('restaurants').find({"borough":"Brooklyn","cuisine":"Italian","address.street": "5 Avenue","name" : {$regex : /pizza/i}},{"name" : 1, "_id": 0})

//3.i)
db.getCollection('restaurants').find({"borough":"Queens","cuisine":"Greek","grades.score": {$lt : 10}},{"_id" : 0, "name" : 1, "grades.score" : 1})

//3.j)
db.getCollection('restaurants').find({"borough":"Queens","cuisine":"Greek", $and: [{"grades.score": {$lt : 6}}, {"grades.score": {$not:{$gt : 15}}}]},{"_id" : 0, "name" : 1, "grades.score" : 1})

//3.k)
db.getCollection('restaurants').find({"borough": "Queens",
                                           "cuisine":"Greek",
                                           "grades":{ $all:[ {"$elemMatch" :{"grade": 'C', "score": { $lt: 35 } } } ] }
                                           },
                                           {"name": 1, "borough": 1, "grades": 1, "_id": 0})

//3.l)
db.getCollection('restaurants').find({"grades.0.grade": 'C'},{"name": 1, "borough": 1, "grades": 1, "_id": 0}).sort({"name": 1})

//3.m)
varMatch = {$match: {"grades.0.grade": 'C'}}
varGroup = {$group: {"_id":"$borough", "res":{"$sum": 1}}}
varSort = {$sort: {"_id": 1}}
db.getCollection('restaurants').aggregate([varMatch, varGroup, varSort])

//3.n)
varUnwind = {$unwind:"$grades"}
varGroup = {$group: {"_id":"$borough", "mean":{$avg: "$grades.score"}}}
varSort = {$sort: {"_id": -1}}
db.getCollection('restaurants').aggregate([varUnwind, varGroup, varSort])

//4.a)
db.getCollection('restaurants').find({"borough":"Queens"},{"_id" : 0, "name" : 1}).explain()
    {
      "queryPlanner" : {
      "plannerVersion" : 1,
      "namespace" : "users.restaurants",
      "indexFilterSet" : false,
      "parsedQuery" : {
        "borough" : {
            "$eq" : "Queens"
          }
      },
      "winningPlan" : {
        "stage" : "PROJECTION",
        "transformBy" : {
           "_id" : 0.0,
           "name" : 1.0
        },
        "inputStage" : {
           "stage" : "COLLSCAN",
           "filter" : {
               "borough" : {
                   "$eq" : "Queens"
               }
           },
           "direction" : "forward"
        }
      },
      "rejectedPlans" : []
      },
      "serverInfo" : {
        "host" : "scinfe139",
        "port" : 27017,
        "version" : "4.0.6",
        "gitVersion" : "caa42a1f75a56c7643d0b68d3880444375ec42e3"
      },
      "ok" : 1.0
  }

//4.b)
db.restaurants.createIndex( { "borough": 1 } )
db.getCollection('restaurants').find({"borough":"Queens"},{"_id" : 0, "name" : 1})

Indexes support the efficient execution of queries in MongoDB.
Without indexes, MongoDB must perform a collection scan, i.e. scan every document in a collection, to select those documents that match the query statement.
