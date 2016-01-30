// input, a string with 5 cards, ie. input = "9D 10D 9H 9C AS"
// output is a lists all possible combinations
// https://en.wikipedia.org/wiki/List_of_poker_hands
function getCardArray(hand) {
  return hand.split(" ").sort();
}

function getCardValue (numberFace){
  var cardHash = {"A": 14, "K": 13, "Q": 12, "J": 11, "10":10, "9": 9, "8": 8, "7": 7, "6": 6, "5": 5, "4":4, "3": 3, "2": 2};
  return cardHash[numberFace];
}

function getFaceValue (numberFace){
  var faceHash = {14: "A", 13: "K", 12: "Q", 11: "J", 10: "10", 9: "9", 8: "8", 7: "7", 6: "6", 5: "5", 4: "4", 3: "3", 2: "2"};
  return faceHash[numberFace];
}

function getElementArray(hand, element) {
  var cardArray = getCardArray(hand),
      elementArray = [];
  for(var i=0; i < cardArray.length; i++) {
    var cardValue = (element == "number") ? getCardValue(cardArray[i].slice(0, -1)) : cardArray[i].slice(-1);
    elementArray.push(cardValue);
  }
  return elementArray;
}

function hashCount(hand, element) {
  var elementArray = getElementArray(hand, element),
      counts = {};
  for(var i=0; i < elementArray.length; i++) {
    counts[elementArray[i]] = (counts[elementArray[i]] || 0) + 1;
  }
  return counts;
}

function highestCard (hand) {
  var sortedNumberArray = getElementArray(hand, "number").sort(function(a, b){return b-a;}),
      highCard,
      faceValue = getFaceValue(sortedNumberArray[0]);
  var highCardIndex = hand.indexOf(faceValue);
  highCard = hand.slice(highCardIndex, (highCardIndex+ faceValue.length + 1));
  return "high card is " + highCard.toString();
}

function ofAKind(hand) {
  var counts = hashCount(hand, "number"),
      ofAKindInHand = [];
  for(var key in counts) {
    if (counts[key] === 4) {
      ofAKindInHand.push("four");
    } else if (counts[key] === 3) {
      ofAKindInHand.push("three");
    } else if (counts[key] === 2) {
      ofAKindInHand.push("two");
    }
  }
  return ofAKindInHand;
}

function fullHouse(ofAKindOptions) {
  return (ofAKindOptions.indexOf("two") >= 0 && ofAKindOptions.indexOf("three") >= 0) ? "full house" : "" ;
}

function fourOfAKind(ofAKindOptions) {
  return ofAKindOptions.indexOf("four") >= 0 ? "four of a kind" : "" ;
}

function threeOfAKind(ofAKindOptions) {
  return ofAKindOptions.indexOf("three") >= 0 ? "three of a kind" : "";
}

function twoOfAKind(ofAKindOptions) {
  return ofAKindOptions.indexOf("two") >= 0 ? numPairs(ofAKindOptions) : "";
}

function numPairs(ofAKindOptions) {
  return ofAKindOptions.length === 2 ? "two pairs" : "1 pair" ;
}

function straightFlush(hand) {
  return (straight(hand) && flush(hand)) ? "straight flush" : "";
}

function flush(hand) {
  return Object.keys(hashCount(hand, "suit")).length === 1 ? "flush" :  "";
}

function straight (hand) {
  var sortedNumberArray = getElementArray(hand, "number").sort(function(a, b){return b-a;});
  for (var i=0; i < sortedNumberArray.length-1; i++) {
    if (sortedNumberArray[i] - sortedNumberArray[i+1] === 1) {
      continue;
    } else {
      return "";
    }
  }
  return "straight";
}

function getOutput () {
  var hand = "9D 10D 9H 9C 10S";
  var ofAKindOptions = ofAKind(hand);
  var output = [straightFlush(hand),
                fourOfAKind(ofAKindOptions),
                fullHouse(ofAKindOptions),
                flush(hand),
                straight(hand),
                threeOfAKind(ofAKindOptions),
                twoOfAKind(ofAKindOptions),
                highestCard (hand)];
  console.log(output.filter(String));
}

getOutput();
