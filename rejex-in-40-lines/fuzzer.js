const fs = require("fs");
const path = require("path");
const corpus = fs.readFileSync(path.join(__dirname, "corpus.txt")).toString();

const assert = require('assert');
const myRegex=require("./rejex.js");
const lowercase="abcdefghijklmnopqrstuvwxyz".split("");
const uppercase =lowercase.map(letter => letter.toUpperCase());
const special = ["?", "*", "."];
const regexGrammar = special.concat(lowercase,uppercase);

function generateRegexString(n){
  let regexString = new Array(n).fill(0).map(chooseOne).join("");
  if(Math.random()<0.1) regexString = "^" + regexString;
  if(Math.random()<0.1) regexString = regexString + "$";
  if(validRegex(regexString)){
    return regexString;
  }else{
    return generateRegexString(n);
  }
}

function validRegex(regexString){
    return (
    regexString.indexOf("**") === -1 &&
    regexString.indexOf("??") === -1 &&
    regexString.indexOf("*?") === -1 &&
    regexString.indexOf("?*") === -1 &&
    regexString.indexOf("^?") === -1 &&
    regexString.indexOf("^*") === -1 &&
    !regexString.startsWith("*") &&
    !regexString.startsWith("?")
  );
}

function chooseOne(){
  return regexGrammar[Math.floor(Math.random() * regexGrammar.length)];
}

function getRandomInt(min,max){
  min = Math.ceil(min);
  max=Math.floor(max);
  return Math.floor(Math.random()*(max-min))+min;
}


function fuzzer(totalTests, corpus){
  const maxRegexLength =50;
  let testsRun =0;
  while(testsRun<totalTests){
    const regexLength = getRandomInt(1,50);
    const regexString = generateRegexString(regexLength);
    const testRegex = new RegExp(regexString);
    try{
      assert.equal(testRegex.test(corpus),myRegex(regexString,corpus));
    }catch(err){
      console.log("TR:",testRegex);
      console.log("err",err);
    }
    testsRun++;
  }
}


fuzzer(99999, corpus);
