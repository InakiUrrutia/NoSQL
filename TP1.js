//2.a)
//use bdTest
//2.b)
//La base de données ne s'affiche pas
//2.c)
db.createCollection("magasin")
//2.d)
//Ca s'affiche (mongodb n'affiche pas les DB vides)

//3.a)
Exemple Article JSON
{
  Code: A001,
  Libellé: "Tomates",
  Origine: "France",
  Prix: 1€,
  Image:"http://site_de_tomate.fr/images/tomate1.png"
}

//3.b)
{
  "id": 1,
  "libellé": "Chaussure XX",
  "rayon": "chaussure",
  "stock": [{"pointure": 40, "qStock": 5},
            {"pointure": 41, "qStock": 3}
           ],
},
{
  "id": 2,
  "libellé": "Pantalon XZZ",
  "rayon": "vetement",
  "stock": [{"taille": "S", "qStock": 10},
            {"taille": "M", "qStock": 4},
            {"taille": "L", "qStock": 15}
           ],
},
{
  "id": 3,
  "libellé": "Tennis WW",
  "rayon": "chaussure",
  "stock": [{"pointure": 43, "qStock": 0}
           ],
},
{
  "id": 4,
  "libellé": "Casquette BB",
  "rayon": "accessoire",
  "stock": [{"taille": "U", "qStock": 50}]
},
{
  "id": 5,
  "libellé": "Sac a main VW",
  "rayon": "accessoire",
  "stock": [{"taille": "U", "qStock": 0}]
}

//Insertion d'un coup

db.magasin.insert([<liste_elements>])

//Affichage table

db.magasin.find()

//Rendre plus beau

.pretty()

//4.a)
db.magasin.find()
//4.b)
db.magasin.count()
//4.c)
db.magasin.find({"rayon": "chaussure"})
//4.d)
db.magasin.find({"rayon": "chaussure"},{"libellé": 1})
//4.e)
db.magasin.find({"rayon": "accessoire"}).count()
//4.f)
db.magasin.find({"stock.qStock": 0},{"libellé": 1, "rayon": 1,"_id": 0})

//5.a)
db.magasin.update( {"id": 2}, {$push: {"stock":{"taille": "XL", "qStock": 7} } })
//5.b)
db.magasin.update( {"id": 1}, {$set: {"stock.1.qStock" : 6} })
//5.c)
db.magasin.update( {"rayon": "chaussure"}, {$set: {"prix": "40€"}}, {multi: true})

//6.a)
db.magasin.deleteMany({"rayon":"accessoire"})
//6.b)
db.magasin.drop()
//6.c)
db.dropDatabase()

//BIS

//save() utilise la fonction update() si le _id est fourni, sinon il utilise insert()

db.magasin.save({"_id": ObjectId(<_id existant>), "libellé": "chausettes"})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
//--> Modifie l'objet avec le _id correspondant

db.magasin.save({"id": 6, "libellé": "chausettes"})
WriteResult({ "nInserted" : 1 })
//--> Insere un nouvel objet car _id non spécifié
