function matchOne(pattern,text){
  if(!pattern) return true;
  if(!text) return true;
  return pattern === "." || text === pattern
}

function search(pattern,text){
  if(pattern[0]="^"){
    return match(pattern.slice(1),text);
  }else{
    return match(".*" + pattern,text);
  }
}

function match(pattern, text){
  if(!pattern) return true;
  else if(!text && pattern === "$") return true;
  else if(pattern[1]==="?"){
    return matchQuestion(pattern,text);
  }else if(pattern[1]==="*"){
    return matchStar(pattern,text);
  }else if(pattern[0]==="(" ){
    return matchGroup(pattern,text);
  }else{
    return matchOne(pattern[0],text[0]) && match(pattern.slice(1),text.slice(1));
  }
}

function matchQuestion(pattern,text){
  return (
  (matchOne(pattern[0],text[0])&& match(pattern.slice(2),text.slice(1))) || match(pattern.slice(2),text)
  );
}

function matchStar(pattern,text){
  return (
  (matchOne(pattern[0],text[0])&& match(pattern,text.slice(1))) || match(pattern.slice(2),text)
  );
}

function matchGroup(pattern,text){
  const groupEnd = pattern.indexOf(")");
  const groupPattern = pattern.slice(1,groupEnd);
  if(patter[groupEnd+1] === "?"){
    const remainderPattern = pattern.slice(groupEnd+2);
    return (
    (match(groupPattern,text.slice(0,groupPattern.lenth)) && 
      match(remainderPattern,text.slice(groupPattern.length))) || 
        match(remainderPattern,text)
    );
  }else if(pattern[groupEnd+1]==="*"){
    const remainderPattern = pattern.slice(groupEnd+2);
    return (
    (match(groupPattern,text.slice(0,groupPattern.length)) &&
      match(pattern,text.slice(groupPattern.length))) || 
        match(remainderPattern,text)
    );
  }else{
    return (
    match(groupPattern,text.slice(0,groupPattern.length)) && 
        match(remainderPattern, text.slice(groupPattern.length))
    );
  }
}




