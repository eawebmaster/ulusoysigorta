var tribe_events_bar_action;!function(e,t,a,r,i,n,s,b,l){a(t).ready(function(){function o(e){if(!e.parents(".tribe-bar-disabled").length){var t=e.width();t>800?e.removeClass("tribe-bar-mini tribe-bar-collapse").addClass("tribe-bar-full"):e.removeClass("tribe-bar-full").addClass("tribe-bar-mini"),t<728?e.removeClass("tribe-bar-mini").addClass("tribe-bar-collapse"):e.removeClass("tribe-bar-collapse")}}function d(){if(tribe_events_bar_action="change_view","month"===s.view&&c.length){var l=c.val(),o=n.get_day();"0"!=s.datepicker_format?(l=tribeDateFormat(c.bootstrapDatepicker("getDate"),"tribeMonthQuery"),c.val(l+o)):7===l.length&&c.val(l+o)}s.url_params={},a(i).trigger("tribe_ev_preCollectBarParams"),a(i).trigger("pre-collect-bar-params.tribe");var d=a(t.getElementById("tribe-bar-form")).add(t.getElementById("tribe_events_filters_wrapper")),v=d.find("input, select");v.each(function(){var e=a(this);e.val()&&e.val().length&&!e.hasClass("tribe-no-param")&&("month"!==s.view&&"0"!==s.datepicker_format&&e.is(c)?s.url_params[e.attr("name")]=tribeDateFormat(e.bootstrapDatepicker("getDate"),"tribeQuery"):e.is(":checkbox")?e.is(":checked")&&("undefined"==typeof s.url_params[e.attr("name")]&&(s.url_params[e.attr("name")]=[]),s.url_params[e.attr("name")].push(e.val())):"radio"===e.attr("type")?e.is(":checked")&&(s.url_params[e.attr("name")]=e.val()):"undefined"!=typeof e.attr("name")&&(s.url_params[e.attr("name")]=e.val()))});var p=a(".tribe-bar-views-option-"+r.default_mobile_view).data("redirected");(r.redirected_view||p)&&(s.url_params.tribe_redirected=!0),s.url_params=a.param(s.url_params),a(i).trigger("tribe_ev_postCollectBarParams"),a(i).trigger("post-collect-bar-params.tribe"),s.url_params.length&&(s.cur_url+=b.starting_delim()+s.url_params),e.location.href=s.cur_url}l&&(a().bootstrapDatepicker||debug.warn("TEC Debug: vendor bootstrapDatepicker was not loaded before its dependant file tribe-events-bar.js"),a().placeholder||debug.warn("TEC Debug: vendor placeholder was not loaded before its dependant file tribe-events-bar.js"));var v=a(t.getElementById("tribe-bar-form")),c=a(t.getElementById("tribe-bar-date")),p=(a(t.getElementById("tribe-events")),a(t.getElementById("tribe-events-header"))),m=0,u=a("select[name=tribe-bar-view]");if(p.length&&(m=p.data("startofweek")),o(v),v.resize(function(){o(v)}),!a(".tribe-events-week-grid").length&&"month"!==s.view){var _="yyyy-mm-dd";if("0"!==s.datepicker_format){_=r.datepicker_formats.main[s.datepicker_format];var g=n.get_url_param("tribe-bar-date");g?c.val(tribeDateFormat(g,s.datepicker_format)):"day"===s.view&&0!==c.val().length&&c.val(tribeDateFormat(c.val(),s.datepicker_format))}l&&debug.info('TEC Debug: bootstrapDatepicker was just initialized in "tribe-events-bar.js" on:',c),r.datepicker_opts={weekStart:m,format:_,autoclose:!0},c.bootstrapDatepicker(r.datepicker_opts)}c.blur(function(){""===c.val()&&a(".datepicker.dropdown-menu").is(":hidden")&&b.live_ajax()&&b.pushstate&&(s.date=r.cur_date,r.cur_url=r.base_url,a(i).trigger("tribe_ev_runAjax"),a(i).trigger("run-ajax.tribe"))}),a(".tribe-bar-settings").length&&a(t.getElementById("tribe-events-bar")).addClass("tribe-has-settings"),a("#tribe-events-bar .hasDatepicker").length&&a(t.getElementById("tribe-events-bar")).addClass("tribe-has-datepicker"),a('input[name*="tribe-bar-"]').placeholder(),a('<ul class="tribe-bar-views-list" />').insertAfter(u);var f=a(".tribe-bar-views-list");u.find("option").each(function(e){var t=a(this);displaying=t.data("view");var r="tribe-bar-views-option-"+t.data("view");a("<li></li>",{"class":"tribe-bar-views-option "+r,"data-tribe-bar-order":e,"data-view":displaying}).html(['   <a href="#">','   <span class="tribe-icon-'+displaying+'">'+t.text()+"</span>","</a>"].join("")).appendTo(".tribe-bar-views-list")});var h=u.find(":selected").data("view"),w=f.find("li[data-view="+h+"]");w.prependTo(f).addClass("tribe-bar-active"),u.hide(),v.on("click","#tribe-bar-views",function(e){e.stopPropagation(),a(this).toggleClass("tribe-bar-views-open")}),v.on("click",".tribe-bar-views-option",function(e){e.preventDefault();var t=a(this);if(!t.is(".tribe-bar-active")){var r=t.data("view");s.cur_url=a("option[data-view="+r+"]").val(),s.view_target=a('select[name=tribe-bar-view] option[value="'+s.cur_url+'"]').data("view"),tribe_events_bar_action="change_view",d()}}),n.maybe_default_view_change(),v.on("change",".tribe-bar-views-select",function(e){e.preventDefault();var t=a("option:selected",this),r=t.data("view");s.cur_url=a("option[data-view="+r+"]").val(),s.view_target=a('select[name=tribe-bar-view] option[value="'+s.cur_url+'"]').data("view"),tribe_events_bar_action="change_view",d()}),v.on("click","#tribe-bar-collapse-toggle",function(){a(this).toggleClass("tribe-bar-filters-open"),a(".tribe-bar-filters").slideToggle("fast")}),a('label[for="tribe-bar-date"], input[name="tribe-bar-date"]').wrapAll('<div id="tribe-bar-dates" />'),a(t.getElementById("tribe-bar-filters")).before(a(t.getElementById("tribe-bar-dates"))),a(i).on("tribe_ev_serializeBar",function(){a("form#tribe-bar-form input, form#tribe-bar-form select, #tribeHideRecurrence").each(function(){var e=a(this);if(e.is("#tribe-bar-date")){var t=e.val();t.length?"month"===s.view?(s.params[e.attr("name")]=tribeDateFormat(s.mdate,"tribeMonthQuery"),s.url_params[e.attr("name")]=tribeDateFormat(s.mdate,"tribeMonthQuery")):t.match(/[0-9]{4}-[0-9]{2}/)?s.params[e.attr("name")]=s.url_params[e.attr("name")]=t:(s.params[e.attr("name")]=tribeDateFormat(e.bootstrapDatepicker("getDate"),"tribeQuery"),s.url_params[e.attr("name")]=tribeDateFormat(e.bootstrapDatepicker("getDate"),"tribeQuery")):e.is(".placeholder")&&e.is(".bd-updated")?s.url_params[e.attr("name")]=e.attr("data-oldDate"):s.date=r.cur_date}!e.val().length||e.hasClass("tribe-no-param")||e.is("#tribe-bar-date")||(e.is(":checkbox")?e.is(":checked")&&(s.params[e.attr("name")]=e.val(),"map"!==s.view&&(s.url_params[e.attr("name")]=e.val()),("month"===s.view||"day"===s.view||"week"===s.view||s.recurrence)&&s.pushcount++):(s.params[e.attr("name")]=e.val(),"map"!==s.view&&(s.url_params[e.attr("name")]=e.val()),"month"!==s.view&&"day"!==s.view&&"week"!==s.view||s.pushcount++))})});var k=a('#tribe-events-bar [class^="tribe-bar-button-"]'),y=k.next(".tribe-bar-drop-content");k.click(function(){var e=a(this);return e.toggleClass("open"),e.next(".tribe-bar-drop-content").toggle(),!1}),a(t).click(function(){a(t.getElementById("tribe-bar-views")).removeClass("tribe-bar-views-open"),k.hasClass("open")&&(k.removeClass("open"),y.hide())}),y.click(function(e){e.stopPropagation()}),l&&debug.info("TEC Debug: tribe-events-bar.js successfully loaded")})}(window,document,jQuery,tribe_ev.data,tribe_ev.events,tribe_ev.fn,tribe_ev.state,tribe_ev.tests,tribe_debug);