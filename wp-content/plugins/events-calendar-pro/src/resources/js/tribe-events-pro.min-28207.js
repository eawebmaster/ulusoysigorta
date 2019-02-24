Object.prototype.hasOwnProperty.call(window,"tribe_ev")&&(tribe_ev.geoloc={map:[],geocoder:[],geocodes:[],bounds:[],markers:[],refine:!1}),function(e,t,r,i,o,n,a,s,l){r.extend(tribe_ev.fn,{has_address:function(e,t){for(var r=0;r<t.length;r++)if(t[r].formatted_address==e)return!0;return!1},pre_ajax:function(e){if(r("#tribe-bar-geoloc").length){var t=r("#tribe-bar-geoloc").val();t.length?o.process_geocoding(t,function(i){if(n.geocodes=i,n.geocodes.length>1&&!o.has_address(t,n.geocodes))o.print_geo_options();else{var a=i[0].geometry.location.lat(),s=i[0].geometry.location.lng();a&&r("#tribe-bar-geoloc-lat").val(a),s&&r("#tribe-bar-geoloc-lng").val(s),e&&"function"==typeof e&&(r("#tribe_events_filter_item_geofence").length&&r("#tribe_events_filter_item_geofence").show(),e())}}):(r("#tribe-bar-geoloc-lat, #tribe-bar-geoloc-lng").val(""),e&&"function"==typeof e&&(r("#tribe_events_filter_item_geofence").length&&(r("#tribe_events_filter_item_geofence input").prop("checked",!1),r("#tribe_events_filter_item_geofence").hide().find("select").prop("selectedIndex",0)),e()))}else e&&"function"==typeof e&&e()},print_geo_options:function(){r("#tribe-geo-links").empty(),r("#tribe-geo-options").show();var e=[];n.refine=!0;for(var t=0;t<n.geocodes.length;t++){var i=n.geocodes[t].formatted_address;e[i]||(e[i]=!0,r("<a/>").text(i).attr("href","#").addClass("tribe-geo-option-link").data("index",t).appendTo("#tribe-geo-links"),s.map_view()&&o.map_add_marker(n.geocodes[t].geometry.location.lat(),n.geocodes[t].geometry.location.lng(),i))}n.refine=!1},pro_tooltips:function(){var e=r("#tribe-events"),t=r("body"),i=(e.hasClass("tribe-events-shortcode"),e.hasClass("view-month")||t.hasClass("events-gridview"),e.hasClass("view-week")||t.hasClass("tribe-events-week"));e.hasClass("view-photo")||t.hasClass("tribe-events-photo"),e.hasClass("view-day")||t.hasClass("tribe-events-day"),e.hasClass("view-list")||t.hasClass("events-list"),e.hasClass("view-map")||t.hasClass("tribe-events-map"),t.hasClass("single-tribe_events");e.on("mouseenter",'div[id*="tribe-events-event-"], div[id*="tribe-events-daynum-"]:has(a), div.event-is-recurring',function(){var e=0,t=r(this);if(i&&t.tribe_has_attr("data-tribejson"))if(t.parents(".tribe-grid-allday").length){var o=t.find(".tribe-events-tooltip");if(!o.length){var n=t.data("tribejson");t.append(tribe_tmpl("tribe_tmpl_tooltip",n)),o=t.find(".tribe-events-tooltip")}e=t.outerHeight()+6,o.css("bottom",e).show()}else{var o=t.find(".tribe-events-tooltip");if(!o.length){var n=t.data("tribejson");t.append(tribe_tmpl("tribe_tmpl_tooltip",n)),o=t.find(".tribe-events-tooltip")}var a,s,l,c=r(".tribe-week-grid-wrapper .scroller-content"),g=t.parent(),b=g.parent(),d=Math.ceil(b.width()),p=Math.ceil(t.width()),v=Math.ceil(o.outerWidth()),_=c.height(),h=c.scrollTop(),u=g.position(),f=t.position(),m=Math.ceil(f.top),w=h-m,C=g.hasClass("tribe-events-right"),y={};o.hasClass("hovered")||o.data("ow",v).addClass("hovered"),a=C?Math.ceil(u.left)-20:d-p-Math.ceil(u.left),v=v>=a?a:o.data("ow")>a?a:o.data("ow"),y=C?{right:p+20,bottom:"auto",width:v+"px"}:{left:p+20,bottom:"auto",width:v+"px"},o.css(y),s=o.height(),w>=0?w+=5:(l=w+_,w=s>l?l-s-8:5),o.css("top",w).show()}})},process_geocoding:function(e,t){var r={address:e,bounds:new google.maps.LatLngBounds(new google.maps.LatLng(TribeEventsPro.geocenter.min_lat,TribeEventsPro.geocenter.min_lng),new google.maps.LatLng(TribeEventsPro.geocenter.max_lat,TribeEventsPro.geocenter.max_lng))};n.geocoder.geocode(r,function(e,r){return r==google.maps.GeocoderStatus.OK?(t(e),e):r==google.maps.GeocoderStatus.ZERO_RESULTS?(GeoLoc.map_view&&spin_end(),r):r})},set_recurrence:function(e){e?(a.recurrence=!0,tribe_storage&&tribe_storage.setItem("tribeHideRecurrence","1")):(a.recurrence=!1,tribe_storage&&tribe_storage.setItem("tribeHideRecurrence","0"))}}),r.extend(tribe_ev.tests,{hide_recurrence:function(){return!!r("#tribeHideRecurrence:checked").length}}),r(t).ready(function(){r(".tribe-bar-geoloc-filter").length&&r(".tribe-bar-geoloc-filter").append('<div id="tribe-geo-options"><div id="tribe-geo-links"></div></div>');var c=r("#tribe-events"),g=r("#tribe-bar-geoloc"),b=r("#tribe-geo-options"),d=!1;o.pro_tooltips(),s.hide_recurrence()&&o.set_recurrence(!0),a.recurrence=s.hide_recurrence(),c.on("click","#tribeHideRecurrence",function(){a.popping=!1,a.do_string=!0,a.paged=1,d=!!r(this).is(":checked"),o.set_recurrence(d),r(i).trigger("tribe_ev_updatingRecurrence").trigger("tribe_ev_runAjax"),r(i).trigger("updating-recurrence.tribe").trigger("run-ajax.tribe")}),r(i).on("pre-collect-bar-params.tribe",function(){if(g.length){var e=g.val();e.length?"map"===a.view_target&&(a.url_params.action="tribe_geosearch"):r("#tribe-bar-geoloc-lat, #tribe-bar-geoloc-lng").val("")}tribe_storage&&"1"===tribe_storage.getItem("tribeHideRecurrence")&&"month"!==a.view_target&&"week"!==a.view_target&&(a.url_params.tribeHideRecurrence="1")}),s.map_view()||(b.length&&(c.on("click",".tribe-geo-option-link",function(e){e.preventDefault(),e.stopPropagation();var t=r(this);r(".tribe-geo-option-link").removeClass("tribe-option-loaded"),t.addClass("tribe-option-loaded"),g.val(t.text()),r("#tribe-bar-geoloc-lat").val(n.geocodes[t.data("index")].geometry.location.lat()),r("#tribe-bar-geoloc-lng").val(n.geocodes[t.data("index")].geometry.location.lng()),o.pre_ajax(function(){r(i).trigger("tribe_ev_runAjax"),r(i).trigger("run-ajax.tribe"),b.hide()})}),r(t).on("click",function(e){b.hide()})),o.snap("#tribe-geo-wrapper","#tribe-geo-wrapper","#tribe-events-footer .tribe-events-nav-previous a, #tribe-events-footer .tribe-events-nav-next a")),r("#wp-toolbar").on("click",".tribe-split-single a, .tribe-split-all a",function(){var t="";if(t=r(this).parent().hasClass("tribe-split-all")?TribeEventsPro.recurrence.splitAllMessage:TribeEventsPro.recurrence.splitSingleMessage,!e.confirm(t))return!1}),l&&debug.info("TEC Debug: tribe-events-pro.js successfully loaded")})}(window,document,jQuery,tribe_ev.events,tribe_ev.fn,tribe_ev.geoloc,tribe_ev.state,tribe_ev.tests,tribe_debug);