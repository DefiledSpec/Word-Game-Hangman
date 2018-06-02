let arr = ['b', 'l', 'u', 'e'];



function checkWord(userIn) {
    arr.forEach((ltr, idx) => {
        if(ltr === userIn) {
            console.log('hello');
        }
    });
}

checkWord('b');




function add(a, b) {
    console.log(a + b);
}

add(1,5);
add(89,43);
