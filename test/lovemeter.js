//#To execute the file, you must use NODE.

/*

    Stats to take in consideration 

    Chemistry, 
    Tension,
    Comun Interest  



*/

function random(x) {
  return Math.floor(Math.random() * x);
}

let example_data = ["subject1", "subject2"];
let results = [
  {
    partners: example_data,
    stats:{},
    calcStats: function () {
      this.stats.chemistry = 85 + random(15);
      this.stats.tension = 50 + random(50);
      this.stats.interests = 85 + random(15);
      let { chemistry, tension, interests } = this.stats;
      this.stats.overall = (chemistry + tension + interests) / 3;
    },
  },
];

function partnerEval(partners, results) {
  /*
        This function is mean to get the partners stats,
        taking in consideration the results given,

        if the partners exists inside the results array,
        there will be given the same result as in the 
        results array

        otherwise, there will be given a random stat
    */

  let default_case, result;
  //1-> format the entry

  [p1, p2] = partners;
  p1 = p1.trim().toLowerCase();
  p2 = p2.trim().toLowerCase();

  default_case = {
    chemistry: 0,
    tension: 0,
    interests: 0,
    overall: 0
  }

  //2-> verify if they exists in the results

  let resultsFound = results.find(
    ({ partners }) => partners[0] === p1 || partners[1] === p2
  );
  if(resultsFound){
    resultsFound?.calcStats()
    resultsFound.stats.overall = +resultsFound.stats.overall.toFixed(2)
    resultsFound.stats.source = 'results-list'
    return resultsFound.stats ? resultsFound.stats : default_case
  }

  //otherwise 3 -> return a random result
  
  result  = {source: 'randomizer'}

  result.interests = random(100)
  result.chemistry = 100-random(100-result.interests)
  result.tension = 100-random(100-result.chemistry)
  let {interests, chemistry, tension} = result
  result.overall = (interests+chemistry+tension)/3
  return overall
}



let output = partnerEval(example_data, results)

console.log(output)