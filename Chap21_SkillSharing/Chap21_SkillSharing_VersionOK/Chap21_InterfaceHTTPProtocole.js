//exemple de code en JSON
{"serverTime": 55464646,
 "talks" : [{"title" : "Unituning",
             "presenter" : "Carlos",
             "sumary" : "Modifying your cycle for extra style",
             "comment" : []}]
}

//Comment marche URI encode et decode
console.log("/talks" + encodeURIComponent("How to Idle"));

//exemple de requete PUT pour creer un talk hw to idele a une certaine path
PUT /talks/How%20to%20Idle HTTP/1.1
Content-Type : application/json
Content-Length : 92
{"presenter" : "Dana",
 "summary" : "Standing still on a unicycle tres cher, bonne chance!"}

//exemple de requete POST pour ajouter un comment a un talk
POST /talk/Unituning/comments HTTP/1.1
Content-TYpe : application/JSONContent-Length : 72
{"author": "Geronimo";
 "message" : "Ca c est du sirop!"}

//exemple de requete GET pour retirer un talk
GET /talks?changesSince=65464646463 HTTP/1.1
HTTP/1.1 200 ok
Content-Type : application/json
Content-Length : 95
{"serverTime" : 65464646463,
 "talks" : [{"title" : "Unituning",
             "deleted" : true}]}
