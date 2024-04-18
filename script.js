console.log("Working!");

/*getting the btn element*/

const btnResults = document.querySelector(".result-btn");

//Stats and Other elements

let loveBar = document.getElementById("love-bar");
let lovePercent = document.getElementById("love-percent");

let chemistryBar = document.getElementById("chemistry-bar");
let chemistryPercent = document.getElementById("chemistry-percent");

let tensionBar = document.getElementById("tension-bar");
let tensionPercent = document.getElementById("tension-percent");

let overall = document.getElementById("overall");

let couple_shown = document.getElementById("couple");
let phrase_span = document.getElementById("phrase");

//Logic Functions

function getPhrase(percent, phraseList) {
  //[0] - 25%, [1] - 50%. [2] - 80%, [3] -81-100%
  let phrase;
  if (percent <= 25) {
    phrase = phraseList[0][random(phraseList[0].length)];
  }else if(percent>25 && percent<=50){
    phrase = phraseList[1][random(phraseList[1].length)];
  }else if(percent>50 && percent<=80){
    phrase = phraseList[2][random(phraseList[2].length)];
  }else if(percent>80 && percent<=100){
    phrase = phraseList[3][random(phraseList[3].length)];
  }

  return phrase;
}
function random(x) {
  return Math.floor(Math.random() * x);
}
//[0] - 25%, [1] - 50%. [2] - 75-90%, [3] -90-100%
let phraseList = [
  [
    "Creo que eres alguien especial.",
    "Disfruto pasar tiempo contigo.",
    "Tienes una sonrisa bonita.",
    "Aprecio nuestra amistad.",
    "Me haces reír a veces.",
  ],
  [
    "Me importas mucho.",
    "Disfruto mucho tu compañía.",
    "Siento una conexión especial contigo.",
    "Te pienso más de lo que admito.",
    "Me gusta cómo haces las cosas.",
  ],
  [
    "Eres una parte fundamental de mi vida.",
    "No puedo imaginar mi vida sin ti.",
    "Me haces sentir completo/a.",
    "Cada día te quiero más.",
    "Eres mi persona favorita en el mundo.",
  ],
  [
    "Eres mi todo, mi mundo entero.",
    "Mi amor por ti es infinito.",
    "Contigo he encontrado mi felicidad absoluta.",
    "Eres la razón por la que despierto con una sonrisa cada mañana.",
    "Te amo más de lo que las palabras pueden expresar.",
  ],
];

let results = [
  {
    partners: ["char", "marisol"],
    stats: {},
    calcStats: function () {
      this.stats.chemistry = 'y';
      this.stats.tension = 'z';
      this.stats.love = 'x';
      let { chemistry, tension, love } = this.stats;
      this.stats.overall = 'El futuro depara mucho, puede traer felicidad como decepcion; es mejor si se lo dejamos al destino, y el decidira';
      this.stats.phrase = 'Que curioso que pongas esta union, no? excelente amistad'
    },
  },
  {
    partners: ['david', 'camila'],
    stats: {},
    calcStats: function (){
      this.stats.love = 50
      this.stats.chemistry = 70
      this.stats.tension = 'x'
      this.stats.overall = 75
      this.stats.phrase = 'Puede que si o... puede que no. Intenten conocerse'
    }
  }
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
    love: 0,
    overall: 0,
  };

  //2-> verify if they exists in the results

  let resultsFound = results.find(
    ({ partners }) =>
      (partners[0] === p1 && partners[1] === p2) ||
      (partners[1] === p1 && partners[0] === p2)
  );
  if (resultsFound) {
    resultsFound.stats.partners = resultsFound.partners;
    resultsFound?.calcStats();
    resultsFound.stats.overall = resultsFound.stats.overall + '%';
    resultsFound.stats.source = "results-list";
    return resultsFound.stats ? resultsFound.stats : default_case;
  }

  //otherwise 3 -> return a random result

  result = { source: "randomizer" };

  result.partners = partners;
  result.love = random(100);
  result.chemistry = result.love + random(100 - result.love);
  result.tension = result.chemistry + random(100 - result.chemistry);
  let { love, chemistry, tension } = result;
  result.overall = +((love + chemistry + tension) / 3).toFixed(2);
  return result;
}

//Events
btnResults.addEventListener("click", (e) => {
  console.log("Getting results");

  //Getting partners from the inputs

  let p1, p2;
  p1 = document.getElementById("partner-1");
  p2 = document.getElementById("partner-2");
  


  console.log(p1.value, p2.value);
  let res = partnerEval([p1.value, p2.value], results);
  let love_phrase = (res.phrase)? res.phrase :getPhrase(res.overall, phraseList)


  //chaning the DOM

  lovePercent.textContent = res.love + '%'
  loveBar.style.width = res.love + '%'

  chemistryPercent.textContent = res.chemistry + '%'
  chemistryBar.style.width = res.chemistry + '%'

  tensionPercent.textContent = res.tension + '%'
  tensionBar.style.width = res.tension + '%'
  

  
  couple_shown.textContent = `${p1.value} con ${p2.value}`
  overall.textContent = res.overall
  phrase_span.textContent = love_phrase


  p1.value = "";
  p2.value = "";
  console.log(res);
});
