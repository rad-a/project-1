// for nodejs when we integrate
//const moment = require('moment');

const dateFormat = 'YYYY-MM-dd';
let today = '2020-08-07'
const numberOfDays = 7;

//for large screen display
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
//smaller screen displays
const shortMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const shortDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

//variable for current day to receive data for the month and year we are in
let currentDate = moment()
console.log(currentDate)

//creating start of Month from the currentDate 
//ex. today is 2020-08-07 so we set August to 
//be the only month that displays on our calendar
const startMonth = currentDate.startOf('#plannerdiv');
const endMonth = currentDate.endOf('#plannerdiv');
//week # at begin of month and end of month
const startWeek = startMonth.week();
const endWeek = endMonth.week();

//create new date to build calendar from
currentDate = moment(today.dateFormat);

// # of rows needed to render the current Month
const totalNumberOfWeeks = endWeek - startWeek; 
//check for correct weeks
//console.log(totalNumberOfWeeks)

//Create display for month header and current year
let monthHeader = $("<div>").text(shortMonths[currentDate.month()] + " "+currentDate.year())

//appending the month as a div to body

//set class to monthHeader and then style with css later
monthHeader.attr('class','monthHeader');
//set inner text to be our current month and year
//monthHeader.innerText = monthHeader;
let calendar = document.querySelector('#plannerdiv')
calendar.append(monthHeader)
//same process for weekHeaders
const weekHeader = $("<div>").attr("class","weekHeader");

calendar.append(weekHeader);

//adding day headers to weekHeader div
for(const day=0;day<numberOfDays;day++){
    // create a DOM div element
    const dayOfWeek = document.createElement('div');
    dayOfWeek.setAttribute('class','dayHeader');
    dayOfWeek.innerText = shortDays[day];
    //getElementsByClassName returns an array
    document.getElementsByClassName('weekHeader')[0].append(dayOfWeek);
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


function createEvent(element) {

}