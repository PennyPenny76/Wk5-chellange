var currentDayEl = $('#currentDay');
var saveBtn = $('.saveBtn');

function displayTime() {
  var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  currentDayEl.text(rightNow);
}

function showTimeStatus(){

  for (var i = 9; i < 18; i ++) {
  var hourEl = $('#hour-' + i);
  // console.log('hour',i)
  // console.log(hourEl)

  var nowHour = dayjs().hour();
  // console.log('2hour',nowHour)
  
  if ( i < nowHour) {
   
  } else if (i === nowHour) {
    hourEl.removeClass('past');
    hourEl.addClass('present');
  } else {
    hourEl.removeClass('past');
    hourEl.addClass('future');
  }
  }
}

displayTime();
setInterval(displayTime, 1000);
showTimeStatus()

function readInfoFromStorage() {
  
  var newInfoOfDay = localStorage.getItem('newInfoOfDay');
  if (newInfoOfDay) {
    newInfoOfDay = JSON.parse(newInfoOfDay);
    console.log('newInfoOfDayparse',newInfoOfDay)
  } else {
    newInfoOfDay = [];
  }
  return newInfoOfDay;
}

function printInfo(){

  
  for (var i = 9; i < 18; i ++) {
    
    var infoTextArea = $('#hour-' + i);
    
    infoTextArea.children('textarea').empty();
    var newInfoOfDay = readInfoFromStorage();
    console.log ('i',i)
    

    for (var j = 0; j < 9; j ++) {
      var newInfoPerHour = newInfoOfDay[j];

     if ( i === newInfoOfDay[j].Time) {
      console.log ('newInfoOfDay.Time',newInfoOfDay[j].Time)
      // console.log ('newInfoOfDay.Info',newInfoOfDay.Info)
      infoTextArea.children('textarea').text(newInfoPerHour.Info);}}
    
  }

}


function saveInfoToLocalStorage(){
  localStorage.clear();
  for (var i = 9; i < 18; i ++) {
    var infoTextArea = $('#hour-' + i);
    var infoPerHour = infoTextArea.children('textarea').val();
    console.log('tesinfoPerHourting',infoPerHour)

    var infoOfDay = {
      Time : i,
      Info : infoPerHour,
    }

    var newInfoOfDay = readInfoFromStorage();
    newInfoOfDay.push(infoOfDay);

    localStorage.setItem('newInfoOfDay', JSON.stringify(newInfoOfDay)); 

    }

  printInfo()
}

saveBtn.on('click',saveInfoToLocalStorage);


// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
printInfo()

