// for nodejs
const moment = require('moment');
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
//be the start month for our calendar display
const startMonth = currentDate.startOf('month');
//week # at begin of month
const startWeek = startMonth.week();

// end of the month
var endMonth = currentDate.endOf('month');
// week # at end of month
var endWeek = endMonth.week();

//create new date to build calendar from
currentDate = moment(today.dateFormat);

// # of rows needed to render the current Month
const totalNumberOfWeeks = endWeek - startWeek; 
//check for correct weeks
//console.log(totalNumberOfWeeks)