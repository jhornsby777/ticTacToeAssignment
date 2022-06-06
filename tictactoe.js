$(function () {
    let player = 1;
    let turnCounter =0;
    const table = $('table');
    let message = $('.message');
    let turn = $('.turn');
    showNextPlayer(turn, player);

    $('td').click(function () {
        let td = $(this)
        let spaceState = getState(td)

        if (!spaceState) {
            let symbol = defineSymbolForCurrentPlayer(player)

            changeSpaceState(symbol, td)
            if (playerWon(table, symbol , turnCounter)) {
                // alert(`${player} has won!`)
                $('.alertDiv').addClass(['alert' , ' alert-primary'])
                $('.alertDiv').html(alert(`${player} has won!`))
                turn.html('')
            } else {
                turnCounter ++;
                player = setNextPlayer(player)
                showNextPlayer(turn, player)
            }
        } else {
            message.html('Please choose another space.')
        }
    })
    $('.reset').click(function(){
        player = 1
        message.html('')
        reset(table)
        turnCounter = 0
        showNextPlayer(turn , player)
    })
})

const getState = (td) => {
    if (td.hasClass('x') || td.hasClass('o')) {
        return true
    } else {
        return false
    }
}

const showNextPlayer = (turn, player) => {
    turn.html(`Is is ${player}'s turn.`)
}

const defineSymbolForCurrentPlayer = (player) => {
    if (player === 1) {
        return 'x'
    } else {
        return 'o'
    }
}

const changeSpaceState = (symbol, td) => {
    // IF BREAKING CHECK HERE
    td.addClass(symbol)
}

const checkForWin = (table, symbol, spacesToCheck) => {
    let won = true
    spacesToCheck.forEach((space) => {
        console.log(table.find(space).hasClass(symbol))
        console.log(won)
        if (table.find(space).hasClass(symbol) && won) {
            won = true
        } else {
            won = false
        }
    })
    // console.log(won)
    return won
}

const playerWon = (table, symbol , turnCounter) => {
    let winningStatus = false
    if (checkForWin(table, symbol, ['.spc-1', '.spc-2', '.spc-3'])) {
        winningStatus = true
    } else if (checkForWin(table, symbol, ['.spc-1', '.spc-4', '.spc-7'])) {
        winningStatus = true
    } else if (checkForWin(table, symbol, ['.spc-1', '.spc-5', '.spc-9'])) {
        winningStatus = true
    } else if (checkForWin(table, symbol, ['.spc-4', '.spc-5', '.spc-6'])) {
        winningStatus = true
    } else if (checkForWin(table, symbol, ['.spc-7', '.spc-8', '.spc-9'])) {
        winningStatus = true
    } else if (checkForWin(table, symbol, ['.spc-2', '.spc-5', '.spc-8'])) {
        winningStatus = true
    } else if (checkForWin(table, symbol, ['.spc-3', '.spc-6', '.spc-9'])) {
        winningStatus = true
    } else if (checkForWin(table, symbol, ['.spc-3', '.spc-5', '.spc-7'])) {
        winningStatus = true
    } else if (turnCounter >= 8 && winningStatus === false){
        alert("It's a draw! Hit reset and try again.")
    }
    console.log(turnCounter)
    return winningStatus
}

const setNextPlayer = (player) => player === 1 ? 2 : 1

const reset = function(table) {
    table.find('td').each(function() {
        $(this).removeClass('x').removeClass('o')
    })
}