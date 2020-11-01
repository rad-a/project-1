// for nodejs when we integrate
//const moment = require('moment');

//selector for our div within the pug template
const calendar = document.getElementById('plannerdiv')

const dateFormat = 'MM-DD-YYYY';
let today = '08-07-2020'
const numberOfDays = 7;

//for large screen display
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
//smaller screen displays
const shortMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const shortDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

//$(document).ready(function() {
    //console.log("ready to fire!");
    //setCalendar();
//});



//function setCalendar () {
//variable for current day to receive data for the month and year we are in
let currentDate = moment().format(dateFormat);
console.log(currentDate)

const now = moment();


//creating start of Month from the currentDate  
const startMonth = now.startOf('month').format(dateFormat);
console.log(startMonth)
const endMonth = now.endOf('month').format(dateFormat);
console.log(endMonth)
//week # at begin of month and end of month
const startWeek = now.week();
const endWeek = now.week();

//create new date to build calendar from
currentDate = moment(today,dateFormat);
console.log(currentDate)

// # of rows needed to render the current Month
const totalNumberOfWeeks = endWeek - startWeek; 
//check for correct weeks
console.log(totalNumberOfWeeks)

//Create div to display month header and current year 
//set class to monthHeader and then style with css later
//append monthHeader to calendar
let monthHeader = $("<div>").text(shortMonths[moment().get('month')] + " "+moment().get('year'));
monthHeader.attr('class','monthHeader');
calendar.append(monthHeader)

//same process for weekHeaders that will contain individual days
const weekHeader = $('<div>').attr('class','weekHeader');
calendar.append(weekHeader);

//adding individual day-headers to weekHeader div we just created
for (let i=0; i> numberOfDays; i++ ) {
    let dayOfWeek = $('<div>').text(shortDays[i]).attr('class', 'dayHeader');
    document.getElementsByClassName('.weekHeader').append(dayOfWeek[i]);
}
/*for(let i of day=0; day[i] < numberOfDays; day++){
    let dayOfWeek = $('<div>').text(shortDays[day]);
    dayOfWeek.attr('class','dayHeader');
    //getElementsByClassName returns an array of each day of the week
    document.querySelectorAll('.weekHeader')[0].append(dayOfWeek);
}
//appending weeks to the month div
for (const i = startWeek; i<=endWeek;i++){
    const weekElement = document.createElement('div');
    weekElement.setAttribute('class','week');
    weekElement.setAttribute('id','week'+i);//week1 etc
    document.getElementById('#plannerdiv').append(weekElement);
}

//date
const startOfMonthLoop = moment(currentDate,dateFormat).startOf('#plannerdiv');

let endOfMonthFlag = true;

for(let day=0;day<numberOfDays;day++){ // day will cycle from 0 to 6
    const dayElement = document.createElement('div');
    dayElement.setAttribute('class','day');

    if(day==0 || day==6){
        dayElement.setAttribute('class','day weekend');
    }
    
    if(i == startOfMonthLoop.week() && day==startOfMonthLoop.day() && endOfMonthFlag){
        
        if(startOfMonthLoop.date()==endDate.date()){
            endOfMonthFlag=false;
            }
        console.log('start of month ',startOfMonthLoop.date(),'end date' ,endDate.date(),'current time: ',today.date());
        if( (startOfMonthLoop.date() == today.date() ) && (day==0 || day==6) ){
            dayElement.setAttribute('class','day weekend today');
        } else if (startOfMonthLoop.date() == today.date()) {
            dayElement.classList.add('today');
            dayElement.classList.add('day');
        }
        // div class=dayNumber (number header)
        const dayNumberElement = document.createElement('div');
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


//appending days to each week div
var firstNumericalDay = startDate.date(); // for mar: 1
var firstDay = startDate.day(); 
var lastNumericalDay = endDate.date(); // for mar: 31
var lastDay = endDate.day(); 

for(var i = firstNumericalDay; i<=lastNumericalDay;i++){
   
   //a check should be made to see what week we're in and 
}



//}
function createEvent(element) {

};*/