const _ = require('lodash');

let data = [];
let tweetcounter = 0;//This is the unique id (each new tweet will simply be assigned the counter number as id)

function lastid(){
  return data[data.length-1].id;
}

function add (name, content) {
  tweetcounter++;
  data.push({ name: name, content: content, id: tweetcounter});
}

function list () {
  return _.cloneDeep(data);
}

function find (properties) {
  return _.cloneDeep(_.filter(data, properties));
}
//Example for find:  find({name : 'David Docsreader'})
//The above will most likely not work however.. remember these names are randomly generated

module.exports = { add: add, list: list, find: find, lastid: lastid};


const randArrayEl = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getFakeName = function() {
  const fakeFirsts = ['Nimit', 'David', 'Shanna', 'Emily', 'Scott', 'Karen', 'Ben', 'Dan', 'Ashi', 'Kate', 'Omri', 'Gabriel', 'Joe', 'Geoff'];
  const fakeLasts = ['Hashington', 'Stackson', 'McQueue', 'OLogn', 'Ternary', 'Claujure', 'Dunderproto', 'Binder', 'Docsreader', 'Ecma'];
  return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
};

const getFakeTweet = function() {
  const awesome_adj = ['awesome', 'breathtaking', 'amazing', 'funny', 'sweet', 'cool', 'wonderful', 'mindblowing', 'impressive'];
  return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};

for (let i = 0; i < 10; i++) {
  module.exports.add( getFakeName(), getFakeTweet() );
}



//If you want to see the contents of data returned by list()
//you HAVE to console.log() that.  Simply calling list() won't do anything,
//I guess because server can't really "return anything" outside the context of
//responding to client requests... ask instructors about this


//console.log(find({name : data[6].name}))
//console.log(find({id : 5}))
