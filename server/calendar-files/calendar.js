// for nodejs
// var moment = require('moment');
const dateFormat = 'YYYY-MM-dd';
const myDate = '2020-08-08';
const numberOfDays = 7;

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const shortMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const shortDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

// date
let currentTime = moment(myDate,dateFormat) // current date & time
//let currentTime = moment(myDate,dateFormat)
// console.log(currentTime);

// start of the month
var startDate = currentTime.startOf('plannerdiv');
// week # at start of month
var startWeek = startDate.week();

// end of the month
var endDate = currentTime.endOf('plannerdiv');
// week # at end of month
var endWeek = endDate.week();

//console.log(currentTime);

// date: obtaining new instance of date & time
currentTime = moment(myDate,dateFormat);
//let currentTime = moment(myDate,dateFormat)

// console.log(currentTime);

var totalNumberOfWeeks = endWeek - startWeek; // # of rows needed to render the current Month

var monthHeaderString = shortMonths[currentTime.month()] + " "+currentTime.year();

//appending the month as a div to body
var monthHeader = document.createElement('DIV');
monthHeader.setAttribute('class','monthHeader');
monthHeader.innerText = monthHeaderString;

document.getElementById('plannerdiv').append(monthHeader);

var weekHeader = document.createElement("DIV");
weekHeader.setAttribute("class","weekHeader");
document.getElementById('plannerdiv').append(weekHeader);

//adding day headers to weekHeader div
for(var day=0;day<numberOfDays;day++){
    // create a DOM div element
    var dayOfWeek = document.createElement('DIV');
    dayOfWeek.setAttribute('class','dayHeader');
    dayOfWeek.innerText = shortDays[day];
    //getElementsByClassName returns an array
    document.getElementsByClassName('weekHeader')[0].append(dayOfWeek);
}
//appending weeks to the month div
for (var i = startWeek; i<=endWeek;i++){
    var weekElement = document.createElement('DIV');
    weekElement.setAttribute('class','week');
    weekElement.setAttribute('id','week'+i);//week1 etc
    document.getElementById('plannerdiv').append(weekElement);
}

// console.log('currentTime before cloning',currentTime);

//date
var startOfMonthLoop = moment(currentTime).startOf('plannerdiv');
//let currentTime = moment(myDate,dateFormat)
// console.log('start of month:', startOfMonthLoop);

var endOfMonthFlag = true;
//populating each week with a day div. Final grid should be number of weeks x 7 days
for(var i = startWeek; i<=endWeek;i++){
    for(var day =0;day<numberOfDays;day++){ // day will cycle from 0 to 6
        var dayElement = document.createElement('DIV');
        dayElement.setAttribute('class','day');

        if(day==0 || day==6){
            dayElement.setAttribute('class','day weekend');
        }
        
        if(i == startOfMonthLoop.week() && day==startOfMonthLoop.day() && endOfMonthFlag){
            
            if(startOfMonthLoop.date()==endDate.date()){
                endOfMonthFlag=false;
                }
            console.log('start of month ',startOfMonthLoop.date(),'end date' ,endDate.date(),'current time: ',currentTime.date());
            if( (startOfMonthLoop.date() == currentTime.date() ) && (day==0 || day==6) ){
                dayElement.setAttribute('class','day weekend today');
            } else if (startOfMonthLoop.date() == currentTime.date()) {
                dayElement.classList.add('today');
                dayElement.classList.add('day');
            }
            // div class=dayNumber (number header)
            var dayNumberElement = document.createElement('DIV');
            dayNumberElement.setAttribute('class','dayNumber');

            dayNumberElement.innerText = startOfMonthLoop.date();
            dayElement.append(dayNumberElement);

                //dayBody div class=dayBody
            var dayBodyElement = document.createElement('DIV');
            dayBodyElement.classList.add('dayBody');

            var dayFooterElement = document.createElement('DIV');
            dayFooterElement.classList.add('dayFooter');
            var plusIcon = document.createElement('SPAN');
            plusIcon.classList.add('fas');
            plusIcon.classList.add('fa-calendar-plus');
            plusIcon.classList.add('icon');
            plusIcon.setAttribute('onclick','createEvent(this)')
            dayFooterElement.append(plusIcon);

            dayElement.append(dayBodyElement);
            dayElement.append(dayFooterElement);

            startOfMonthLoop.add(1,'days');//increment by 1 day
        } 

        document.getElementById('week'+i).append(dayElement);
        

    }
}

//appending days to each week div
var firstNumericalDay = startDate.date(); // for mar: 1
var firstDay = startDate.day(); 
var lastNumericalDay = endDate.date(); // for mar: 31
var lastDay = endDate.day(); 

for(var i = firstNumericalDay; i<=lastNumericalDay;i++){
    
    //a check should be made to see what week we're in and 
}


function createEvent(element) {

}