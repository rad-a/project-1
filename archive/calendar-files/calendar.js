// for nodejs
// const moment = require('moment');
const dateFormat = 'MM-DD-YYYY';
const myDate = '08-08-2020';
const numberOfDays = 7;

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const shortMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const shortDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

// date
let currentTime = moment() // current date & time
console.log(currentTime);

// start of the month
const startDate = currentTime.startOf('month');
// week # at start of month
const startWeek = startDate.week();

// end of the month
const endDate = currentTime.endOf('month');
// week # at end of month
const endWeek = endDate.week();

const totalNumberOfWeeks = endWeek - startWeek; // # of rows needed to render the current Month

const monthHeaderString = shortMonths[currentTime.month()] + " "+currentTime.year();

//appending the month as a div to body
const monthHeader = document.createElement('DIV');
monthHeader.setAttribute('class','monthHeader');
monthHeader.innerText = monthHeaderString;

document.getElementById('plannerdiv').append(monthHeader);

const weekHeader = document.createElement("DIV");
weekHeader.setAttribute("class","weekHeader");
document.getElementById('plannerdiv').append(weekHeader);

//adding day headers to weekHeader div
for(let day=0 ;day<numberOfDays; day++){
    // create a DOM div element
    const dayOfWeek = document.createElement('DIV');
    dayOfWeek.setAttribute('class','dayHeader');
    dayOfWeek.innerText = shortDays[day];
    //getElementsByClassName returns an array
    document.getElementsByClassName('weekHeader')[0].append(dayOfWeek);
}
//appending weeks to the month div
for (let i = startWeek; i<=endWeek;i++){
    const weekElement = document.createElement('DIV');
    weekElement.setAttribute('class','week');
    weekElement.setAttribute('id','week'+i);//week1 etc
    document.getElementById('plannerdiv').append(weekElement);
}

//date
const startOfMonthLoop = moment().startOf('month');
//let currentTime = moment(myDate,dateFormat);
// console.log('start of month:', startOfMonthLoop);

let endOfMonthFlag = true;
//populating each week with a day div. Final grid should be number of weeks x 7 days
for(let i = startWeek; i<=endWeek;i++){
    for(let day =0;day<numberOfDays;day++){ // day will cycle from 0 to 6
        const dayElement = document.createElement('DIV');
        dayElement.setAttribute('class','day');

        if(day==0 || day==6){
            dayElement.setAttribute('class','day weekend');
        }
        
        if(i == startOfMonthLoop.week() && day==startOfMonthLoop.day() && endOfMonthFlag){
            
            if(startOfMonthLoop.date()==endDate.date()){
                endOfMonthFlag=false;
                };
            console.log('start of month ',startOfMonthLoop.date(),'end date' ,endDate.date(),'current time: ',currentTime.date());
            if( (startOfMonthLoop.date() == currentTime.date() ) && (day==0 || day==6) ){
                dayElement.setAttribute('class','day weekend');
            }
            else if (startOfMonthLoop.date() == currentTime.date()) {
                dayElement.classList.add('today');
                dayElement.classList.add('day');
            }
            // div class=dayNumber (number header)
            const dayNumberElement = document.createElement('DIV');
            dayNumberElement.setAttribute('class','dayNumber');

            dayNumberElement.innerText = startOfMonthLoop.date();
            dayElement.append(dayNumberElement);

            //dayBody div class=dayBody will display event info
            const dayBodyElement = document.createElement('DIV');
            dayBodyElement.classList.add('dayBody');
            //footer holds icons for add, update, and delete event functions
            const dayFooterElement = document.createElement('DIV');
            dayFooterElement.classList.add('dayFooter');
            //create span element for a plus icon that can be targeted 
            //for a clickevent that opens the event form
            const plusIcon = document.createElement('SPAN');
            plusIcon.setAttribute('class', 'icon plus-icon');
            plusIcon.setAttribute('uk-icon','icon: plus-circle');
            plusIcon.setAttribute('uk-toggle','target: .addEvent');
            //plusIcon.setAttribute('onclick','addEvent(this)');
            
            dayFooterElement.append(plusIcon);
            dayElement.append(dayBodyElement);
            dayElement.append(dayFooterElement);
            //increment by 1 day
            startOfMonthLoop.add(1,'days');
            //if element has event then display these icons
            //const updateIcon = document.createElement('SPAN');
            //updateIcon.classList.add('icon update-icon');
            //updateIcon.setAttribute('uk-icon','icon: pencil')
            //updateIcon.setAttribute('onclick','updateEvent(this)')
            //dayFooterElement.append(updateIcon);

            //const deleteIcon = document.createElement('SPAN');
            //deleteIcon.classList.add('icon delete-icon');
            //deleteIcon.setAttribute('uk-icon','icon: trash')
            //deleteIcon.setAttribute('onclick','deleteEvent(this)')
            //dayFooterElement.append(updateIcon);
        } 

        document.getElementById('week'+i).append(dayElement);
        

    }
}

//appending days to each week div
const firstNumericalDay = startDate.date(); 
const firstDay = startDate.day(); 
const lastNumericalDay = endDate.date(); 
const lastDay = endDate.day(); 

//render all user events needs to be added
//plus icon brings up event form 
//we collect values from the form and send them to
//backend to be rendered
$("#save-btn").on("click", function(event) {
    
    let newEvent = {
        date: $(".date").val(),
        title: $(".title").val().trim(),
        details: $(".details").val().trim()
      };
    
});
