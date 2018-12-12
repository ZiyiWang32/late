// Code goes here
// Code goes here

let asd = false;
function generateDeck(cardType, number){
  let deck = []
  for (let i = 0; i < cardType.length; i++) {
    for (let j = 0; j < number.length; j++) {
      let card = {
        type: cardType[i],
        value: number[j]
      };
      deck.push(card);
    }
  }
  return deck;
}


function toStringCard(card) {
  let str = card.type + " " + card.value;
  return str;
}

function youAskAgain(deck, yourCards){
  randomNum= Math.round(Math.random()*(deck.length-1));
  yourCards.push(deck[randomNum]);
  deck.splice(randomNum,1);
  document.getElementById("pTwo").innerText += "\n " + toStringCard(yourCards[yourCards.length-1]);
}

function aiAskAgain(deck, aiCards){
  randomNum= Math.round(Math.random()*(deck.length-1));
  aiCards.push(deck[randomNum]);
  deck.splice(randomNum,1);
  document.getElementById("pOne").innerText += "\n " + toStringCard(aiCards[aiCards.length-1]);
}

function getNumber(card)
{
  if(card.value === "J" || card.value === "Q" || card.value === "K"){
    return 10;
  }
  else if(card.value === "A"){
    return 1;
  }
  else{
    return parseInt(card.value,10);
  }
}

function getCurrentTotal(cards)
{
  let result = 0;
  for(let i = 0; i < cards.length; i++)
  {
    result += getNumber(cards[i]);
    
  }
  return result;
}

function game(){
  let cardType = ["Hongtao", "Heitao", "Meihua", "Fangpian"];
  let number = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  let deck = generateDeck(cardType, number);
  let randomNum;
  
  //get two cards for each player at first
  let yourCards = [];
  randomNum= Math.round(Math.random()*(deck.length-1));
  yourCards.push(deck[randomNum]);
  deck.splice(randomNum,1);
  randomNum= Math.round(Math.random()*(deck.length-1));
  yourCards.push(deck[randomNum]);
  deck.splice(randomNum,1);
  
  let aiCards = [];
  randomNum = Math.round(Math.random()*(deck.length-1));
  aiCards.push(deck[randomNum]);
  deck.splice(randomNum,1);
  randomNum = Math.round(Math.random()*(deck.length-1));
  aiCards.push(deck[randomNum]);
  deck.splice(randomNum,1);
  
  let p1 = document.getElementById("pOne");
  let p2 = document.getElementById("pTwo");
  p1.innerText = "AI got:\n"+ toStringCard(aiCards[0]) + "\n" + toStringCard(aiCards[1]);
  p2.innerText = "you got:\n"+ toStringCard(yourCards[0]) + "\n" + toStringCard(yourCards[1]);
  
  
  let btnContinue = document.getElementById("startGameButton")
  btnContinue.innerText = "Ask for a card again";
  let btnStop = document.createElement("BUTTON");
  document.body.appendChild(btnStop);
  btnStop.innerText = "No more cards for me";
  
  btnContinue.onclick = function(){
    youAskAgain(deck, yourCards);
    if(getCurrentTotal(aiCards) < 14){
      aiAskAgain(deck, aiCards);
    }
    
    if(getCurrentTotal(yourCards) > 21 || getCurrentTotal(aiCards) > 21){
      document.body.removeChild(btnStop);
      btnContinue.innerText = "Restart A Game";
      btnContinue.onclick = game;
    }
    
    if(getCurrentTotal(aiCards) > 21){
      p1.innerText += "\n AI got more than 21";
      if(getCurrentTotal(yourCards) <= 21){
        p2.innerText += "\n you Win";
      }
      
    }
    if(getCurrentTotal(yourCards) > 21){
      p2.innerText += "\n Your got more than 21";
      if(getCurrentTotal(aiCards) <= 21){
        p1.innerText += "\n AI Win";
      }
    }
  };

  btnStop.onclick = function(){
    //once you decide not to ask a card, you won't be able to ask again in this round
    btnContinue.disabled = "true";
    let aiWantsAnother = false;
    if(getCurrentTotal(aiCards) < 14){
      aiAskAgain(deck, aiCards);
      aiWantsAnother = true;
    }
    //if AI also doesn't want more, system will compare the value 
    if(aiWantsAnother === false){
      p1.innerText += "\nAI got " + getCurrentTotal(aiCards);
      p2.innerText += "\nYou got " + getCurrentTotal(yourCards);
      if(getCurrentTotal(yourCards) > getCurrentTotal(aiCards)){
        p2.innerText += ", YOU WIN!!!!!!!!!!!!!!!";
      }
      else if(getCurrentTotal(yourCards) === getCurrentTotal(aiCards)){
        p2.innerText += ", It's A TIE";
      }
      else{
        p2.innerText += ", YOU LOSE.........";
      }
      document.body.removeChild(btnStop);
      btnContinue.disabled = false;
      btnContinue.innerText = "Restart A Game";
      btnContinue.onclick = game;
      return;
    }
    //if ai asks a card, we need to exam if it is over 21;
    if(getCurrentTotal(aiCards) > 21){
      p1.innerText += "\n AI got more than 21";
      if(getCurrentTotal(yourCards) <= 21){
        p2.innerText += "\n YOU WIN!!!!!!!!!!!!!!!!!!";
      }
      document.body.removeChild(btnStop);
      btnContinue.innerText = "Restart A Game";
      btnContinue.disabled = false;
      btnContinue.onclick = game;
    }
  };
  
  
}

document.getElementById("startGameButton").onclick = game;






