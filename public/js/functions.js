(function ($) {

  var monthNames = ['January', 'February', 'March',
    'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];

  var day = new Date();
  var todaysDate = new Date().getDate();
  var month = day.getMonth();
  var year = day.getFullYear();
  var firstDate = monthNames[month] + " " + 1 + " " + year;

  var currentId;

  // First date in calendar
  var tmp = new Date(firstDate).toDateString();

  var firstDay = tmp.substring(0, 3); // Monday
  var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  var dayNum = dayNames.indexOf(firstDay);
  var days = new Date(year, month + 1, 0).getDate();

  var calendar = getCalendar(dayNum, days);

  // Displaying full table
  $('#currentMonth').append("<span id='month'>" + monthNames[month] + "</span>" + year); // Heading of table
  $('#calendar').append(calendar); // Full calendar days

  function isPresentMonth() {
    if (monthNames[day.getMonth()] === $("#month").text()) {
      return true;
    }
  }

  function getCalendar(dayNum, days) {

    var table = document.createElement('table');
    var tr = document.createElement('tr');

    var calendarDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    for (var i = 0; i < calendarDays.length; i++) {
      var td = document.createElement('td');
      td.innerHTML = calendarDays[i];
      tr.appendChild(td);
    }
    table.appendChild(tr);

    // Create second row
    tr = document.createElement('tr');
    var i;
    for (var i = 0; i < 6; i++) {
      if (i == dayNum) {
        break;
      }
      var td = document.createElement('td');
      td.innerHTML = "";
      tr.appendChild(td);
    }
    var count = 1;

    for (; i <= 6; i++) {
      var td = document.createElement('td');
      if (isPresentMonth()) {
        if (count == todaysDate) {
          td.className = 'today';
        }
      }
      td.innerHTML = count;
      count++;
      tr.appendChild(td);
    }
    table.appendChild(tr);

    // Rest of the rows
    for (var r = 3; r <= 6; r++) {
      tr = document.createElement('tr');
      for (var i = 0; i <= 6; i++) {
        if (count > days) {
          table.appendChild(tr);
          return table;
        }
        var td = document.createElement('td');
        if (count == todaysDate) {
          td.className = 'today';
        }
        td.innerHTML = count;
        count++;
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
  }

  // Set to the next MONTH
  $('#next').on('click', function () {

    $('#currentMonth').empty();
    firstDate++;
    calendar = getCalendar(dayNum, days);
    $('#currentMonth').append("<span id='month'>" + monthNames[month + 1] + "</span>" + year);

    $('#calendar').empty();
    month++;
    days = new Date(year, month + 1, 0).getDate();
    calendar = getCalendar(dayNum, days);
    $('#calendar').append(calendar);

    // Remove current day highlight
    if (!isPresentMonth()) {
    var selected = $('.today');
    $(selected).removeClass('today');}
    showModel();
  });

  // Set to the previous MONTH
  $('#prev').on('click', function () {

    $('#currentMonth').empty();
    firstDate--;
    calendar = getCalendar(dayNum, days);
    $('#currentMonth').append("<span id='month'>" + monthNames[month - 1] + "</span>" + year);

    $('#calendar').empty();
    month--;
    days = new Date(year, month + 1, 0).getDate();
    calendar = getCalendar(dayNum, days);
    $('#calendar').append(calendar);

    // Remove current day highlight
    if (!isPresentMonth()) {
    var selected = $('.today');
    $(selected).removeClass('today');}
    showModel();
  });

  // Open modal on date click
  function showModel() {
    $('td').click(function () {
      event.stopPropagation();

      var element = $(this);

      // Display date in modal
      var currentDay = $(this).text();
      var currentDate = year + "-" + (month + 1) + "-" + currentDay;

      $('#date').empty();
      $('#date').append(currentDate);

      $('#modal').fadeIn(300);
      $('span').click(function () {
        $('#modal').fadeOut(300);
      });
      $('#save').on('click',function(e){
        e.preventDefault;
        saveEvent(element);
      });
    });
    $('body').click(function () {
      $('#modal').fadeOut(300);
    });
    $('#modal').click(function () {
      event.stopPropagation();
    });
  }
  showModel();
  showSaved();

  // Modal for saved items
  function showSaved() {
    $.ajax({
      url: 'show',
      type: 'GET',

      success: function (data) {

        $('td').click(function () {
          for (var i = 0; i < data.length; i++) {
            if (data[i].day == this.innerHTML) {
              currentId = data[i].id;
              $('#saved').show();
              $('#savedItem').empty();
              $('#savedItem').append(data[i].title + " " + data[i].description + '<span><i class="fa fa-trash-o" aria-hidden="true"></i></span></li>');
            }
          }
        });
        $('#saved').mouseleave(function (e) {
          $('#saved').hide();
        });
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status, 'status');
        console.log(thrownError, 'err');
      }
    });
  }

  // Save function
  var saveEvent = function(element){
    $('#save').on('click', function (e) {
      e.preventDefault();

    var currDate = $('#date').text();
    var title = $('#title').val();
    var text = $('#textarea').val();
    var dataString = 'title=' + title + 'text=' + text;

    $.ajax({
      url: 'save',
      type: 'POST',
      data: { 'title': title, 'description': text, 'date': currDate },

      success: function (data) {
        $('#modal').hide();
        $(element).css('border','1px solid red');
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status, 'status');
        console.log(thrownError, 'err');
      }
    });
    // Reset title input
    $('input[type="text"]').val('');
    });
  }

  // Delete function
  $('#savedItem').on('click', 'span', function (event) {
    event.stopPropagation();
    $(this).parent().fadeOut(400, function () {
      $(this).remove();
    });
    var currDate = $('#date').text();

    var title = $('#title').val();
    var text = $('#textarea').val();
    var dataString = 'title=' + title + 'text=' + text;

    $.ajax({
      url: 'delete',
      type: 'POST',
      data: { 'id': currentId },

      success: function (data) {
        $(this).parent().fadeOut(400, function () {
          $(this).remove();
        });
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status, 'status');
        console.log(currentId);
        console.log(thrownError, 'err');
      }
    });
  });

})(jQuery);
