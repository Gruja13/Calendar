<!DOCTYPE html>
<html>
<head>
	<title>@yield('pageTitle')</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400" rel="stylesheet">
  <!-- Compiled and minified CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
  <!-- ICON PACK -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
	<link rel="stylesheet/less" type="text/css" href="{{ asset('css/style.less') }}">
	@yield('style')
</head>
<body>
  <div class="container">
    <div class="row">
      {{-- Calendar main window --}}
      <div class="calendar">
        {{-- Months --}}
        <div class="row">
          <div class="col s12">
            <div class="calendarMonths">
              {{-- Current month --}}
              <div class="months">
                <h3 id="currentMonth"></h3>
              </div>
              {{-- Change month --}}
              <div class="calendarArrows">
                <div class="arrows">
                  <button id="prev" class="buttonArrow"><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i></button>
                  <button id="next" class="buttonArrow"><i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
				<div class="row">
					{{-- Saved modal --}}
					<div id="saved" class="saved">
						<div id="savedItem" class="savedItem">
						</div>
					</div>
					{{-- Modal window --}}
					<div id="modal" class="modal">
						{{-- Date --}}
						<div id="date" class="col s12 date"></div>
						{{-- Title --}}
						<div class="input-field col s6 input">
			         <input placeholder="Input Title" id="title" type="text" value="" class="inputTitle">
			       </div>
						{{-- Text --}}
						<div class="input-field col s12 text">
			         <textarea id="textarea" class="materialize-textarea" type="text" placeholder="Write..." value=""></textarea>
			       </div>
						<div class="col s12 icons">
							<button><i id="save" class="fa fa-floppy-o" aria-hidden="true"></i></button>
						</div>
						<div class="col s12 close">
							<span><i class="fa fa-times" aria-hidden="true"></i></span>
						</div>
					</div>
				</div>
        {{-- Calendar --}}
        <div class="row">
          <div class="col s12">
            <div id="calendar" class="calendarView"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

	<script>
  less = {
    env: "development",
    async: false,
    fileAsync: false,
    poll: 1000,
    functions: {},
    dumpLineNumbers: "comments",
    relativeUrls: false,
    rootpath: ":/a.com/"
  };
</script>
<script src="//cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<!-- Compiled and minified JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>
<script type="text/javascript" src="{{ asset('js/functions.js') }}"></script>
</body>
</html>
