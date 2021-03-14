var players = [];

var cards = ['killer', 'killer', 'police', 'police', 'doctor', 'gunSmith', 'silencer', 
'villager', 'villager', 'villager', 'villager', 'villager'];

// var cards = ['killer', 'villager', 'villager', 'police', 'villager', 'gunSmith', 'silencer', 
// 'villager', 'killer', 'villager', 'police', 'villager'];

var existingPlayers = [];
var roundAction = [];

// Join player to game and show cards
function playerJoin(id, username) {

  if (players.length < 6) {
    return assignPlayer(id, username);
  } else {
    console.log('more than 6 players joined')
    players = [];
    cards = ['killer', 'killer', 'police', 'police', 'doctor', 'gunSmith', 'silencer', 
    'villager', 'villager', 'villager', 'villager', 'villager'];
    return assignPlayer(id, username);
  }
}

function getPlayerSide(card1, card2) {
  let map = new Map();
  map.set('killer', -3);
  map.set('police', 3);
  map.set('silencer', -2);
  map.set('doctor', 1);
  map.set('gunSmith', 1);
  map.set('villager', 0);
  return map.get(card1) + map.get(card2);
}

function assignPlayer(id, username) {
  // get first card
  const i = Math.floor(Math.random() * (cards.length-1));
  // const i =0;
  const card1 = cards[i];
  cards.splice(i, 1);
  // get second card
  const j = Math.floor(Math.random() * (cards.length-1));
  // const j =0;
  const card2 = cards[j];
  cards.splice(j, 1);

  const side = getPlayerSide(card1, card2);
  const poison = 0;
  const playerId = players.length;

  const player = {id, username, card1, card2, side, poison, playerId};

  players.push(player);
  console.log(`player: ${player}`);
  return player;
}

function playerReady(id, currentPlayer) {
  existingPlayers.push(currentPlayer);
  return existingPlayers;
}

function playerAction(playerId, action, round) {
  if (roundAction[round-1]==undefined) {
    var thisRound = {"killed": -1, "checked": -1, "gunned": -1, "injected": -1};
    roundAction.push(getThisRoundAction(thisRound, action, playerId));
  } else {
    var thisRound = roundAction[round-1];
    roundAction[round-1] = getThisRoundAction(thisRound, action, playerId);
  }
}

function getThisRoundAction(thisRound, action, playerId) {
  if (action==='kill') {
    thisRound.killed = playerId;
  } else if (action==='check') {
    thisRound.checked = playerId;
  } else if (action==='gun') {
    thisRound.gunned = playerId;
  } else if (action==='inject') {
    thisRound.injected = playerId;
  }
  return thisRound;
}

module.exports = {
  playerJoin,
  playerReady,
  playerAction
};