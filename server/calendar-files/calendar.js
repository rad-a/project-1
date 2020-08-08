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
const startMonth = currentDate.startOf('month');
const endMonth = currentDate.endOf('month');
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

$('#plannerdiv').appendChild(monthHeader)
//same process for weekHeaders
const weekHeader = document.createElement("DIV");
weekHeader.setAttribute("class","weekHeader");
document.getElementById('month').appendChild(weekHeader);

//adding day headers to weekHeader div
for(const day=0;day<numberOfDays;day++){
    // create a DOM div element
    const dayOfWeek = document.createElement('DIV');
    dayOfWeek.setAttribute('class','dayHeader');
    dayOfWeek.innerText = shortDays[day];
    //getElementsByClassName returns an array
    document.getElementsByClassName('weekHeader')[0].appendChild(dayOfWeek);
}
//appending weeks to the month div
for (const i = startWeek; i<=endWeek;i++){
    const weekElement = document.createElement('DIV');
    weekElement.setAttribute('class','week');
    weekElement.setAttribute('id','week'+i);//week1 etc
    document.getElementById('month').appendChild(weekElement);
}