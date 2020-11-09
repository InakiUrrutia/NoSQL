/*mapReduce

1)*/
var mapFunction = function () {emit(this.borough, 1);};
var reduceFunction = function (key, values) {return Array.sum(values);};
var queryParam = {query : {}, out : "result_set"}
db.restaurants.mapReduce(mapFunction, reduceFunction, queryParam);
db.result_set.find();

//--> Nombre de restaurants par quartiers

/*2)*/
var mapFunction = function () {
  if(this.cuisine == 'Italian'){
    emit(this.borough, 1);
  }
};
var reduceFunction = function (key, values) {return Array.sum(values);};
var queryParam = {query : {}, out : "result_set"}
db.restaurants.mapReduce(mapFunction, reduceFunction, queryParam);
db.result_set.find();

/*3.a)*/
var mapFunction = function () {
  if(this.address.street == '5 Avenue'){
    for(let i=0; i<this.grades.length; i++){
      emit(this.name, this.grades[i].score);
    }
  }
};
var reduceFunction = function (key, values) {return Array.avg(values);};
var queryParam = {query : {}, out : "result_set"}
db.restaurants.mapReduce(mapFunction, reduceFunction, queryParam);
db.result_set.find();

/*3.b)*/
var mapFunction = function (){
  for(let i=0; i<this.grades.length; i++){
    if(this.grades[i].grade == 'A'){
      emit(this.cuisine, this.grades[i].score);
    }
  }
};
var reduceFunction = function (key, values) {
  return Array.avg(values);
};
var queryParam = {query : {}, out : "result_set"}
db.restaurants.mapReduce(mapFunction, reduceFunction, queryParam);
db.result_set.find();

/*3.c)*/
var mapFunction = function (){
  for(let i=0; i<this.grades.length; i++){
    if(this.grades[i].grade == 'A'){
      var id = {year: this.grades[i].date.getFullYear(), borough: this.borough};
      emit(id, 1);
    }
  }
};
var reduceFunction = function (key, values) {
  return Array.sum(values);
};
var queryParam = {query : {}, out : "result_set"}
db.restaurants.mapReduce(mapFunction, reduceFunction, queryParam);
db.result_set.find();
