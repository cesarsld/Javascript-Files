function GameExecution(gameArray) {
    //for loop to find disc procs in column
    for (var i = 0; i < gameArray.length; i++) {
        var vertDiscCount = gameArray[i].length;
        for (var j = 0; j < vertDiscCount; j++) {
            if (gameArray[i][j] == vertDiscCount) {
                gameArray[i][j] = 0;
            }
        }
    }
    //forloop to find disc procs on rows
    for (var i = 0; i < gameArray.length; i++) {
        var chain = 0;
        for (var j = 0; j <= gameArray.length; j++) {
            if (j < gameArray.length && gameArray[j].length >= i + 1) {
                chain++;
            }
            else if (chain > 0){
                for (k = j - chain; k < j; k++) {
                    if (gameArray[k][i] == chain) {
                        gameArray[k][i] = 0;
                    }
                }
                chain = 0;
            }
        }
    } 
    //for loop to explode surrounding stones
    for (var i = 0; i < gameArray.length; i++) {
        for (var j = 0; j < gameArray[i].length; j++) {
            if (gameArray[i][j] == 0) {
                ExplodeSurroundingStones(gameArray, i, j);
            }
        }
    }
}

//obsolete function
function spliceGaps(gameArray) {
    var numsToCheck = 1;
    while (numsToCheck != 0) {
        for (var i = 0; i < gameArray.length; i++) {
            for (var j = 0; j < gameArray[i].length; j++) {
                if (gameArray[i][j] == 0) {
                    gameArray[i].splice(j, 1);
                    numsToCheck = 2;
                }
            }
        }
        numsToCheck--;
    }
}

//function to check if game array constains gaps in array
function containsGaps(gameArray){
    for (var i = 0; i < gameArray.length; i++) {
        for (var j = 1 ; j < gameArray[i].length ; j++){
            if (gameArray[i][j] == 0) return true;
        }
    }
    return false;
}

//remove destroyed discs (gaps) on top of arrays
function spliceTopGap(gameArray){
    var keepChecking = true;
    for (var i = 0; i < gameArray.length; i++) {
        while (keepChecking) {
            if (gameArray[i][gameArray[i].length - 1] == 0){
                gameArray[i].pop();
            }
            else keepChecking = false;
        }
        keepChecking = true;
    }
}

//function to remove the first encoutner of gap chain within array
function spliceOuterChainGap(gameArray) {
    var numToDelete = 0;
    var gapDetected = false;
    var gapLocation = 0;
    spliceTopGap(gameArray);
    for (var i = 0; i < gameArray.length; i++) {
        for (var j = 0; j < gameArray[i].length; j++) {
            if (gameArray[i][j] == 0 && !gapDetected) {
                numToDelete++;
                gapDetected = true;
                gapLocation = j;
            }
            else if (gapDetected && gameArray[i][j] == 0)
            {
                numToDelete++;
            }
            else if (gapDetected && gameArray[i][j] != 0)
            {
                gameArray[i].splice(gapLocation, numToDelete);
                gapDetected = false;
                break;
            }
        }
    }
}

function initGameArray(array) {
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < 3; j++) {
            array[i][j] = Math.floor(Math.random() * 8 + 1);
            if (array[i][j] == 8) array[i][j] = -2;
        }
    }
}

//creates a deep copy of another array to make sure 
function deepCopyArray(array) {
    var arrayCopy = new Array(array.length);
    for (var i = 0; i < array.length; i++) {
        arrayCopy[i] = new Array();
        for (var j = 0; j < array[i].length; j++) {
            arrayCopy[i].push(array[i][j]);
        }
    }
    return arrayCopy
}
//checks if 2 arrays are equal
function arraysEqual(arr1, arr2) {
    for (var i = 0 ; i < arr2.length ; i++) {
        for (var j = 0 ; j < arr2[i].length ; j ++) {
            if (arr1[i][j] != arr2[i][j]) return false;
        }
    }
    return true;
}

function ExplodeSurroundingStones(gameArray, posX, posY) {
    for (var i = -1 ; i < 2 ; i++){
        for (var j = -1 ; j < 2 ; j++){
            if (Math.abs(i) == Math.abs(j)) continue;
            if(posX + i >= 0 && posX + i < gameArray.length && posY + j >= 0 && posY + j < gameArray[posX + i].length){
                if (gameArray[posX + i][posY + j] < 0){
                    gameArray[posX + i][posY + j]++;
                    if (gameArray[posX + i][posY + j] == 0){
                        gameArray[posX + i][posY + j] = Math.floor(Math.random() * 7 + 1);
                    }
                }
            }
        }
    }
}

//returns an array that contains the information on how many gaps to drop above discs and at what index to start
function returnDroppingArray (gameArray){
    var blocksLengthToDrop = new Array(7);

    for (var i = 0 ; i < gameArray.length ; i++){
        blocksLengthToDrop[i] = new Array(2);
        blocksLengthToDrop[i][0] = 0;
        blocksLengthToDrop[i][1] = 0;
        for (var j = 0; j < gameArray[i].length; j++) {
            if (gameArray[i][j] == 0){
                blocksLengthToDrop[i][0]++;
                blocksLengthToDrop[i][1] = j + 1;
                if (j == gameArray[i].length - 1) {
                    blocksLengthToDrop[i][0] = 0;
                }
            }
            else if(blocksLengthToDrop[i][0] != 0){
                break;
            }
        }
    }
    return blocksLengthToDrop;
}
//add layer of stones at the bottom
function PushStones(gameArray) {
    for (i = 0; i < gameArray.length; i++) {
        gameArray[i].splice(0, 0, -2);
    }
}