const checkBtn = document.querySelector("check-palindrome");
const outputEl = document.querySelector("#output");
const dateInput = document.querySelector("bday-input")

function reverseStr(str){
    var listOfCharaters = str.split('');
    var reverseListOfCharacters = listOfCharaters.revese()

    var reverseStr = reverseListOfCharacters.join('');

    return reverseStr
}

function isPalindrome(str){
    var reverse = reverseStr(str);

    if(str === reverse){
        outputEl.innerText = ("Your Birthday is a Palindrome!")
    }else{
        outputEl.innerText = ("Your Birthday is not a Palindrome!")
    }

}

function convertDateToString(date){
    var dateStr = {day : '',month : '',year : ''}
    if(dateStr.day < 10){
        dateStr.date = '0' + date.day;
    }else{
        dateStr.day = date.day.toString();
    }

    if(dateStr.month < 10){
        dateStr.month = '0' + date.month;
    }else{
        dateStr.month = date.month.toString();
    }

    dateStr.year =date.year.toString();

    return dateStr
}

function getAllDateFormats(date){
    var dateStr = convertDateToString(date)

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy , mmddyyyy , yyyymmdd , ddmmyy , mmddyy , yymmdd]
}

function checkPalindromeForAllDateFormates(date){
    var listOfPalindrome = getAllDateFormats(date)

    var confirmPalindrom

    for(var i=0; i<listOfPalindrome.length; i++){
        if(isPalindrome(listOfPalindrome[i])){
            confirmPalindrom = true
            break
        }
    }

    return confirmPalindrom
}

function isLeapYear(year){
    if(year % 400 === 0){
        return true
    }

    if(year % 100 === 0){
        return false
    }

    if(year % 4 === 0){
        return true
    }

    return false 
}

function getNextDate(date){
    var day = date.day + 1
    var month = date.month
    var year = date.year

    var daysInMonth = [31 ,28,31,30,31,30,31,31,30,31,30,31]

    if(month === 2){
        if(isLeapYear(year)){

           if(day > 29){
               day = 1
            month++
        }
    }
     else{
       if(day > 28){
        day = 1
        month++
       }
     }
    }
    else{
        if(day > daysInMonth[month - 1]){
            day = 1;
            month++;
        }
    }

    if(month > 12){
        month = 1
        year++
    }

    return{
        day : day,
        month : month,
        year : year
    }
}

function getNextPalindromeDate(date){
    var ctr = 0
    var nextDate = getNextDate(date);

    while(1){
        ctr++
        var isPalindrome = checkPalindromeForAllDateFormates(nextDate)
        if(isPalindrome){
            break
        }
        nextDate = getNextDate(nextDate)
    }

    return [ctr, nextDate]
}

function clickHandler(e){
    var bdayStr = dateInput.value

    if(bdayStr !==''){
        var listOfDate = bdayStr.split('-')
        var date ={
            day : Number(listOfDate[2]),
            month : Number(listOfDate[1]),
            year : Number   (listOfDate[0])
        }
        var isPalindrome = checkPalindromeForAllDateFormates(date)

        if(isPalindrome){
            outputEl.innerText = 'Yay! Your bday is a palindrome'
        }
        else{
            var [ctr,nextDate] = getNextPalindromeDate(date)
            outputEl.innerText = 'The next palindrome is ${nextDate.days}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days!'
        }
    }
}

checkBtn.addEventListener('click', clickHandler);