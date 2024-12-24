async function abcd() {


    var blob = await fetch(`https://randomuser.me/api/`);


    var res = await blob.json();

    console.log(res);



}
abcd();



// about the functions 

// function statemant 

function greed(){
    console.log("greed");


}

greed()// call the function or inhok the function 

// function expresstion 1

function one(fn){
    fn();

}

one(greed);



//function expresstion 2
const two =  function ram(){
    console.log("function expression");

}

two();