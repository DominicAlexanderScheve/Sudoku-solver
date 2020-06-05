"use strict";
//Made by Dominic Alexander Scheve

//this basically generates the Sudoku field, with some spaces to make them 3x3 boxes
//with only 1 input possible per box
//creates 9x9
function generate (){
    document.forms.form.appendChild(document.createTextNode("\u00A0\u00A0"));
    for(let i = 1; i <= 9; i++){
        for(let j = 1; j <= 9; j++){
            let t = document.createElement("input");
            t.size = 1;
            t.maxLength = 1;
            t.type = "text";
            t.id = i + "/" + j;
            t.value = "";
            t.style="text-align:center";
            document.forms.form.appendChild(t);

            if (j % 9 == 0 ){
                document.forms.form.appendChild(document.createElement('br'));
            }
            if (j  % 9 == 0 && i % 3 == 0){
                document.forms.form.appendChild(document.createElement('br'));
            }
            if(j % 3 == 0){
                document.forms.form.appendChild(document.createTextNode("\u00A0\u00A0"));
            }
        }
    }
}

//this reads all input, if it's valid (1-9) or not (special charakters or charakters),
//if it's not valid input it will be treated as a 0
//also changes the backgroundcolor of valid entrys to green
function readTheBoard(){
    let insert = [[],[],[],[],[],[],[],[],[],[]];
    for (let i = 1; i <= 9; i++){
        for (let j = 1; j <= 9; j++){
            if (document.getElementById(i + "/" + j).value == "" || isNaN(document.getElementById(i + "/" + j).value)){
                insert[i][j] = 0;
            }else if (document.getElementById(i + "/" + j).value != ""){
                insert[i][j] = parseInt(document.getElementById(i + "/" + j).value);
                document.getElementById(i + "/" + j).style.backgroundColor = "green";
            }
        }
    }
    return insert;
}

//this checks directly after reading if there are conflicts in the input
//e.g. a row, column or box with double entrys
//returns true if there are no conflicts
function checkAllValid(insert){
    let b = true;
    for(let i = 1; i <= 9; i++){
        for(let j = 1; j <= 9; j++){
            b = checkColumn( j, insert) && checkRow( i, insert) && checkBox( i, j, insert);
            if(!b){
                return b;
            }
        }
    }
    return b;
}

//this checks if a possible insert is valid
//returns false if its valid, when returned false the while loop in the doYourThing-function stops
function checkValidAtPosition(i, j, insert){
    let b = checkColumn( j, insert) && checkRow( i, insert) && checkBox( i, j, insert);
    return !b;
}

//this fills an array at the position with the amount of user inputs that should be skipped when going back
//and returns it
function findAhead(dontChange){
    let howManyAhead = [[],[],[],[],[],[],[],[],[],[]];
    howManyAhead[1][1] = 0;
    for (let i = 1; i <= 9; i++){
        for(let j = 1; j <= 9; j++){
            if (dontChange[i][j-1] != 0 && j > 1){
                howManyAhead[i][j] = howManyAhead[i][j-1] + 1;
            }else if (dontChange[i-1][j+8] != 0 && j == 1 && i > 1){
                howManyAhead[i][j] = howManyAhead[i-1][j+8] + 1;
            }else if (dontChange[i][j-1] == 0 && j > 1){
                howManyAhead[i][j] = 0;
            }else if (dontChange[i-1][j+8] == 0 && j == 1 && i > 1){
                howManyAhead[i][j] = 0;
            }
        }
    }
    return howManyAhead;
}

//this finds the first changeable box
//needed to decide if a sudoku is solvable or not
function findFirst (insert){
    let firstChangeable = "11";
    for(let i = 1;i <= 9; i++){
        for(let j = 1; j <= 9; j++){
            if(insert[i][j] == 0){
                firstChangeable = i + "" + j;
                i = 9;
                j = 9;
            }
        }
    }
    return firstChangeable;
}

//this fills an array with all inserts of the column
//then gives it to findDouble
//returns true if there are no doubles
function checkColumn(j, insert){
    let s = [];
    let b = false;
    for(let i = 1; i <= 9; i++){
        s[i] = insert[i][j];
    }
    b = findDouble(s);
    return b;
}

//this fills an array with all inserts of the row
//then gives it to findDouble
//returns true if there are no doubles
function checkRow(i, insert){
    let z = [];
    let b = false;
    for (let j = 1; j <= 9; j++){
        z[j] = insert[i][j];
    }
    b = findDouble(z);
    return b;
}

//this fills an array with all inserts of the 3x3 box
//then gives it to findDouble
//returns true if there are no doubles
function checkBox(i,j, insert){
    let su = [];
    su[0] = 0;
    let b = false;
    if(i <= 3 && j <= 3){
        for(let k = 1;k <= 3; k++){
            for (let l = 1; l <= 3; l++){
                su.push(insert[k][l]);
            }
        }
    }else if (i <= 3 && j <= 6){
        for(let k = 1;k <= 3; k++){
            for (let l = 4; l <= 6; l++){
                su.push(insert[k][l]);
            }
        }
    }else if (i <= 3 && j <= 9){
        for(let k = 1;k <= 3; k++){
            for (let l = 7; l <= 9; l++){
                su.push(insert[k][l]);
            }
        }
    }else if(i <= 6 && j <= 3){
        for(let k = 4;k <= 6; k++){
            for (let l = 1; l <= 3; l++){
                su.push(insert[k][l]);
            }
        }
    }else if(i <= 6 && j <= 6){
        for(let k = 4;k <= 6; k++){
            for (let l = 4; l <= 6; l++){
                su.push(insert[k][l]);
            }
        }
    }else if(i <= 6 && j <= 9){
        for(let k = 4;k <= 6; k++){
            for (let l = 7; l <= 9; l++){
                su.push(insert[k][l]);
            }
        }
    }else if(i <= 9 && j <= 3){
        for(let k = 7;k <= 9; k++){
            for (let l = 1; l <= 3; l++){
                su.push(insert[k][l]);
            }
        }
    }else if(i <= 9 && j <= 6){
        for(let k = 7;k <= 9; k++){
            for (let l = 4; l <= 6; l++){
                su.push(insert[k][l]);
            }
        }
    }else if(i <= 9 && j <= 9){
        for(let k = 7;k <= 9; k++){
            for (let l = 7; l <= 9; l++){
                su.push(insert[k][l]);
            }
        }
    }
    b = findDouble(su);
    return b;
}

//this checks if there are double entrys in the array given
//returns true if there are no doubles
function findDouble(array){
    let b = true;
    for (let k = 1; k < array.length; k++){
        let duplikate = 0;
        for(let i = 1; i < array.length; i++){
            if( array[i] == array[k] && (i != k) && (array[i] != 0)){
                duplikate++;
            }
            if (duplikate > 0){
                b = false;
                return b;
            }
        } 
    }
    return b;
}

//this tries the next number for the insert
//if it gets above 9 it will return help as true and reset the insert to 0
//if help is returned the doYourThing-function will jump back to try the next inerst in the box jumped to
function tryNext(i, j, insert){
    let help = false;
    insert[i][j] = insert[i][j] + 1;
    if(insert[i][j] > 9){
        help = true;
        insert[i][j] = 0;
        return help;
    }
    return help;
}

//the magic function does it's thing when the button is pressed (have a look at the .html)
//more comments in the function
function doYourThing(){
    let bool = true;            //this boolean will decide if the while loop continues
    let insert = readTheBoard();    //the array of inserts that will be tested and if all inserts are legit inserted into the 9x9 field
    let dontChange = readTheBoard();    //the array of inserts with positions ([i][j]) that are not allowed to be changed
    let howManyAhead = findAhead(dontChange);   //the array of amount to jump back at a certain position
    let firstChangeable = findFirst(insert);    //finds the first changeable position as a string initialized as "11" in case no inserts are given
    let help = true;           //this boolean will decide if the function needs to go back and check another number for a already valid checked insert
    let b = true;               //if this becomes false the function will understand the sudoku as unsolveable
    let valid = checkAllValid(insert);  //this boolean determines if the user inserts are valid
    if(valid){
        for (let i = 1; i <= 9; i++){
            for(let j = 1; j <= 9; j++){
                bool = true;                //setting this boolean true for every loop run
                if (insert[i][j] != 0 && dontChange[i][j] == insert[i][j]){         //if the insert is a dont change insert and not 0 nothing will happen
                        
                }else{
                    while(bool){            //will run until a valid number is found or the loop gets a little bit back (needs help)
                        help = tryNext(i,j, insert);
                        bool = checkValidAtPosition(i, j, insert);
                        if(help){
                            if (i <= parseInt(firstChangeable.charAt(0)) && j <= parseInt(firstChangeable.charAt(1))){      //this determines if the sudoku is solveable or not
                                i = 9;                                                                                      //will become true if the first changeable insert is above 9, therefore all possibilities for this firstchangeable insert are done
                                j = 9;                                                                                      //will end the for loops, the while loop and set the boolean to state that it is not solveable to false (not solveable)
                                b = false;
                                bool = false;
                            }
                            if ((j - 1 - howManyAhead[i][j]) > 0){                                                          //this is the part how the for-loops should jump back based on how far it has to jump back
                                j = j - 2 - howManyAhead[i][j];
                            }else if((j - 1 - howManyAhead[i][j]) < 0 && i > 1){
                                if(howManyAhead[i][j] > 9){
                                    if(i - Math.floor(howManyAhead[i][j] / 9) >= 1){
                                        i = i - Math.floor(howManyAhead[i][j] / 9);
                                    }else{
                                        i = 1;
                                    }
                                    j = j - 2 - (howManyAhead[i][j] % 9);
                                }else{
                                    j = j + 9 - 2 - howManyAhead[i][j];
                                    i = i - 1;
                                }
                            }else if ((j - 1 - howManyAhead[i][j]) == 0 && i > 1){
                                j = 8;
                                i = i - 1;
                            }    
                        }
                    }
                }
            }
        }
        if(b){                              //if the sudoku is solveable it will fill the field with the inserts
            for(let i = 1; i <= 9; i++){
                for(let j = 1; j <= 9; j++){
                    document.getElementById(i + "/" + j).value = parseInt(insert[i][j]);
                }
            }
        }else{
            alert("Unsolvable, check your input.")
        }
    }else{
        alert("Invalid input!");
    }
}

//generates the 9x9 field
generate();