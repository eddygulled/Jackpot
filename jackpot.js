// create random teams
// create match simulation ie ( team1 Vs team2)
// assign win, draw and lose states
// run test jackpot
// implement jackpot filter formulas

const chars = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const state = ["1", "X", "2"];
// _RANDOM TEAM NAME GENERATOR

var number_of_teams; // change to fit use
var teamsGenerated = []; //array to store random teams generated

//function to create single team name from random arrangement of characters defined above
function getTeamName() {
  var __team__ = "";
  for (var i = 1; i <= 3; i++) {
    let char = chars[Math.floor(Math.random() * (chars.length - 1))];
    __team__ += char;
  }
  return __team__;
}

// function to check if a team created already exist in teamsGenerated array
// if it exist function returns true else false taking into consideration array length
function checkTeamName(_team_) {
  for (var i = 0; i < number_of_teams; i++) {
    if (teamsGenerated.length > 0 && teamsGenerated[i] == _team_) {
      break;
      return true;
    }
  }
  return false;
}

// function to generate an array of teams
function generateTeams(numberOfTeams) {
  number_of_teams = numberOfTeams;
  for (var i = 1; i <= number_of_teams; i++) {
    let team_created = getTeamName();
    if (
      !checkTeamName(team_created) &&
      teamsGenerated.length <= number_of_teams
    ) {
      teamsGenerated.push(team_created);
    }
  }
}

// match simulation schema
// singleMatch = [team1, team2]
// jackpot match arrangement schema
// jack = [[singleMatch], [singleMatch]]

var jack = []; // holds match list
var jack_states = []; //hold match list results
var complete_jackpot = []; // hold jackpot match list and results
function create_jack() {
  for (var i = 0; i < teamsGenerated.length; i += 2) {
    var singleMatch = [];
    singleMatch.push(teamsGenerated[i]);
    singleMatch.push(teamsGenerated[i + 1]);
    jack.push(singleMatch);
  }
}

/**********
 * possible matches to score
 * psb = [random team index with fixed match result]
 ************ */
var psb_frst = 3; //forced win
var psb_scnd = psb_frst + 2; //forced win

// create match results for each match in the jackpot match list
function simulateMatch() {
  for (var i = 0; i < jack.length; i++) {
    if (i == psb_frst || i == psb_scnd) {
      jack_states.push("WIN _1");
    } else {
      let choice = state[Math.floor(Math.random() * 3)];
      jack_states.push(choice);
    }
  }
}

function completeJackpot() {
  for (var i = 0; i < jack.length; i++) {
    var complete_match = [];
    complete_match.push(jack[i]);
    complete_match.push(jack_states[i]);
    complete_jackpot.push(complete_match);
  }
}

function session_run(number_of_teams) {
  generateTeams(number_of_teams);
  create_jack();
  simulateMatch();
  completeJackpot();
  console.log(complete_jackpot);
}
/*
* User guide
* most of the variables declared are on global scope to give more 
* control to user tester 

* if you need only teams run <generateTeams()>
* to create jackpot without results <create_jack()>
* to assign scores to jackpot matches <simulateMatch()>
* to acces all variables run <completeJackpot()>
NB to simulate everything from scratch follow the series above
the whole project is created to run in chain
* for simplicity <session_run( [number_of_teams] )>
* Number of matches shall be mu]ltiple of two
* MATCH SCORES ARE STORED IN jack_states
* Expected betslip format {  var bet_slip = ['1', '2', 'X'] }
*/

session_run(20);
// console.log(jack_states)
