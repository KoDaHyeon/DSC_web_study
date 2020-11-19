
var typingBool = false;
var typingIdx=0;
var typingTxt=$('.typing-txt').text();

typingTxt=typingTxt.split(""); //문자열을 잘라 한글자씩 typingTxt배열에 추가
if(typingBool==false){
  typingBool = true;
  var tyInt = setInterval(typing, 100); //setInterval -> 일정시간(0.1s)마다 typing함수가 반복 호출되도록
}

function typing()
{
  if(typingIdx<typingTxt.length){
    $(".typing").append(typingTxt[typingIdx]); //한글자씩 이어 붙이기
    typingIdx++;
  }
  else{
    clearInterval(tyInt);
  }
}
