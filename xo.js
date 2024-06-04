let turn = 1;
let i;
const squares = document.getElementsByClassName("square")
var flag = 0
const winningOpt = winOpt()

function playTurn(num) {
    const square = document.getElementById(num)
    const turnS = document.getElementById("turn")
    if (!square.textContent) {
        const sygn = turn === 1 ? "X" : "O";
        turnS.classList = turn === 2 ? "ix" : "igul";
        turnS.innerHTML = turn === 2 ? "X :תור" : "O :תור";
        square.textContent = sygn;
        square.classList.add(turn === 1 ? "ix" : "igul");
        turn = turn === 1 ? 2 : 1
        // בדוק זכייה
        if (checkWin(square.dataset.game)) {
            onWin(3 - turn)
        }
        if (checkDraw(square.dataset.game)) {
            onDraw()
        }
    }
}

function onWin(winner) {
    flag = 1
    const winMessageDiv = document.createElement('div');
    winMessageDiv.className = "winmessage"
    winMessageDiv.innerHTML = `!שחקן ${winner}  ניצח`
    document.body.appendChild(winMessageDiv)
    const winButton = document.createElement('button');
    winButton.className ="btn btn-success winButton";
    winButton.innerHTML = "rematch";
    winButton.onclick = () => location.reload();
    document.body.appendChild(winButton);
}

function onDraw() {
    flag = 1
    const winMessageDiv = document.createElement('div');
    winMessageDiv.className = "winmessage"
    winMessageDiv.innerHTML = "תיקו!"
    document.body.appendChild(winMessageDiv)
    const winButton = document.createElement('button');
    winButton.className ="btn btn-success winButton";
    winButton.innerHTML = "rematch";
    winButton.onclick = () => location.reload();
    document.body.appendChild(winButton);
}

function winOpt() {
    var onedim = []
    for (var j = 0; j < 4; j++) {
        onedim.push([1 + 4 * j, 2 + 4 * j, 3 + 4 * j, 4 + 4 * j])
        onedim.push([1 + j, 5 + j, 9 + j, 13 + j])
    }
    onedim.push([1, 6, 11, 16]); onedim.push([4, 7, 10, 13])
    const example = onedim;
    for (var j = 1; j <= 3; j++) {
        const mid = example.map(line => line.map(number => number + 16 * j));
        onedim = onedim.concat(mid)
    }
    for (var j = 1; j <= 16; j++) {
        onedim.push([j, j + 16, j + 32, j + 48])
    }
    const row3 = [[1, 18, 35, 52], [4, 19, 34, 49]]
    onedim = onedim.concat(row3)
    const col3 = [[1, 21, 41, 61], [13, 25, 37, 49]]
    onedim = onedim.concat(col3)
    for (var j = 1; j <= 3; j++) {
        const midr = row3.map(line => line.map(number => number + 4 * j));
        onedim = onedim.concat(midr)
        const midc = col3.map(line => line.map(number => number + j));
        onedim = onedim.concat(midc)
    }
    onedim = onedim.concat([[1, 22, 43, 64], [16, 27, 38, 49], [13, 26, 39, 52], [4, 23, 42, 61]])
    console.log(onedim)
    return onedim;
}

function calcId(num) {
    const x = num % 16;
    var a = Math.floor(num / 16);
    var str = x.toString();
    switch (a) {
        case 0:
            str += 'a';
            break;
        case 1:
            str += 'b';
            break;
        case 2:
            str += 'c';
            break;
        case 3:
            str += 'd';
    }
    return str;
}

function checkDraw(game) {
    line = []
    for(var j = 1; j <= 48; j++){
        line.push(j)
    }
    if (line.every(game => squares[game - 1].textContent)) {
      return true;
    }
}

function checkWin(game) {
    for (const line of winningOpt) {
        const mark = squares[line[0] - 1].textContent; // Get the mark from the first element
        if (mark && line.every(game => squares[game - 1].textContent === mark)) {
          return true;
        }
    }

    return false;
}

function main() {
    document.addEventListener("DOMContentLoaded", function() {
        const squares = document.getElementsByClassName("square");
            for (let i = 0; i < squares.length; i++) {
                squares[i].addEventListener("click", () => {
                if(!flag) {console.log(calcId(i));
                    playTurn(calcId(i))};
            });
        }
    });
}

main()