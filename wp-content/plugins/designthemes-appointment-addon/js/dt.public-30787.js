jQuery(window).on('load', function(){
	
	if(jQuery('#appointment-step-checker').val() != 'false') {
		jQuery('#appointment-step').val(1);
	} else {
		jQuery('#appointment-step').val(2);	
	}
	
	jQuery(".dt-select-service, .dt-select-store").trigger("change");
	
});

jQuery(document).ready(function($){
	
	$('#aptdatepicker').datepicker({
		dateFormat : 'yy-mm-dd'
	}); 

	$(".dt-select-service, .dt-select-store").change(function(){
		var $serviceid = $('#serviceid').val(),
			$storeid = $('#storeid').val();
			
		$.ajax({
			method:'POST',
			url: dttheme_urls.ajaxurl,
			type: 'html',
			data:{ action: 'insurance_fill_staffs', service_id :$serviceid, store_id :$storeid },
			complete: function(response){
				if( response.status === 200 ) {
					var $append = "";
					if( $.trim(response.responseText).length > 0 ) {
						$append += response.responseText;
						$(".dt-select-staff").empty().append($append);
					}
				}
			}
		});
	});

	$("body").delegate(".appointment-goback","click",function(e){
		
		$('.steps').hide();
		
		var curr_step_val = $('#appointment-step').val();
		var step_to_show = parseInt(curr_step_val, 10) - 1;
		
		$('.dt-sc-schedule-progress-wrapper .step'+curr_step_val).removeClass('dt-sc-current-step');
		$('.dt-sc-schedule-progress-wrapper .step'+step_to_show).removeClass('dt-sc-completed-step');
		$('.dt-sc-schedule-progress-wrapper .step'+step_to_show).addClass('dt-sc-current-step');
		
		$('.step' + step_to_show).fadeIn(800);
		
		$('#appointment-step').val(step_to_show);
		
		if(step_to_show == 1) {
			$('.dt-sc-goback-box').hide();
		}
		
		if(step_to_show == 1) {
			$('.dt-sc-instant-notification-box').hide();
			$('.dt-sc-instant-notification-schedulebox').hide();
			$('.dt-sc-instant-notification-contactbox').hide();
		} else if(step_to_show == 2) {
			$('.dt-sc-instant-notification-contactbox').hide();
		}
		
	});
	
	$("input[name='payment_type']").change(function(){
		if($(this).val() == 'paypal') {
			$('.make-payment').val(dtAppointmentCustom.paymentPaypal);	
		} else {
			$('.make-payment').val(dtAppointmentCustom.paymentAfterarrival);	
		}
	});
	
	function calculate_step_value() {
		
		$('.dt-sc-goback-box').show();
		
		var curr_step_val = $('#appointment-step').val();
		var updated_step_val = parseInt(curr_step_val, 10) + 1;
		
		$('.dt-sc-schedule-progress-wrapper .dt-sc-schedule-progress').removeClass('dt-sc-current-step');
		$('.dt-sc-schedule-progress-wrapper .step'+curr_step_val).addClass('dt-sc-completed-step');
		if(updated_step_val == 4) {
			$('.dt-sc-schedule-progress-wrapper .step'+updated_step_val).addClass('dt-sc-completed-step');
		} else {
			$('.dt-sc-schedule-progress-wrapper .step'+updated_step_val).addClass('dt-sc-current-step');
		}
				
		$('#appointment-step').val(updated_step_val);
		if(updated_step_val == 4 || updated_step_val == 1) { $('.dt-sc-goback-box').hide(); }
		
	}
	
	$("body").delegate(".generate-timeslot","click",function(e){
		
		var $storeid = $('#storeid').val();
		var $serviceid = $('#serviceid').val();
		var $staffid = $('#staffid').val();
		var $aptdatepicker = $('#aptdatepicker').val();
		
		if( $serviceid.length == "" ){
			alert(dtAppointmentCustom.chooseService);
			return false;
		}
		
		$.ajax({
			method:'POST',
			url: dttheme_urls.ajaxurl,
			type: 'html',
			data:{ action: 'insurance_generate_schedule', storeid :$storeid, serviceid :$serviceid, staffid :$staffid, aptdatepicker :$aptdatepicker },
			beforeSend: function(){
				$(".dt-sc-timeslot-box").hide();
			},
			complete: function(response){
				$(".appointment-ajax-holder").html(response.responseText);
				$(".dt-sc-timeslot-box").fadeIn(800);
			}
		});
		
	});
	
	$("body").delegate("a.time-slot","click",function(e){
		
		e.preventDefault();
		
		var $daydate = $(this).data('daydate'),
			$time = $(this).data('time'),
			$storeid = $(this).data('storeid'),
			$storename = $(this).data('storename'),
			$serviceid = $(this).data('serviceid'),
			$servicename = $(this).data('servicename'),
			$staffid = $(this).data('staffid'),
			$staffname = $(this).data('staffname'),
			$amount = $(this).data('amount'),
			$start = $(this).data('start'),
			$end = $(this).data('end'),
			$date = $(this).data('date'),
			$currencysymbol = $(this).data('currencysymbol');
			
		var $item_name = [];
		
		var schedule_details_paa = '<ul>';
				if($daydate != '') { schedule_details_paa += '<li><label>' + dtAppointmentCustom.day + ' : </label>' + $daydate + '</li>'; }
				if($time != '') { schedule_details_paa += '<li><label>' + dtAppointmentCustom.time + ' : </label>' + $time + '</li>'; }
				if($storename != '') { schedule_details_paa += '<li><label>' + dtAppointmentCustom.store + ' : </label>' + $storename + '</li>'; }
				if($servicename != '') { schedule_details_paa += '<li><label>' + dtAppointmentCustom.service + ' : </label>' + $servicename + '</li>'; }
				if($staffname != '') { schedule_details_paa += '<li><label>' + dtAppointmentCustom.staff + ' : </label>' + $staffname + '</li>'; }
				if($amount != '' && $amount > 0) { schedule_details_paa += '<li><label>' + dtAppointmentCustom.amount + ' : </label>' + $amount + $currencysymbol + '</li>'; }
			schedule_details_paa += '</ul>';
			
		$('#dt-sc-schedule-details').html(schedule_details_paa);
		$('#dt-sc-instant-schedule-details').html(schedule_details_paa);
		$('.dt-sc-instant-notification-box').show();
		$('.dt-sc-instant-notification-schedulebox').fadeIn(800);
		
		var schedule_details;
		schedule_details = $daydate + '#';
		schedule_details += $time + '#';
		schedule_details += $storename + '#';
		schedule_details += $servicename + '#';
		schedule_details += $staffname + '#';
		schedule_details += $start + '#';
		schedule_details += $end + '#';
		schedule_details += $date + '#';
		schedule_details += $amount + $currencysymbol;
		
		var schedule_details_ids;
		schedule_details_ids = $storeid + '#';
		schedule_details_ids += $serviceid + '#';
		schedule_details_ids += $staffid;
				
		if($storename != '') { $item_name.push($storename.replace(/\s+/g, '').toUpperCase()); }
		if($servicename != '') { $item_name.push($servicename.replace(/\s+/g, '').toUpperCase()); }
		if($staffname != '') { $item_name.push($staffname.replace(/\s+/g, '').toUpperCase()); }
		
		var $item_name_str = $item_name.join('_');
		$('.dt-sc-appointment-payment-form').find('#paypal_item_name').val($item_name_str);
		$('.dt-sc-appointment-payment-form').find('#paypal_amount').val($amount);
		$('.dt-sc-appointment-payment-form').find('#custom').val(schedule_details + '|' + schedule_details_ids);	

		if(!($amount > 0)) {
			$( ".dt-sc-appointment-payment-form label:nth-child(2)" ).hide();
		}
		
		$('.dt-sc-schedule-box').hide();
		$('.dt-sc-contactdetails-box').fadeIn(800);
		
		$("a.time-slot").removeClass('selected');
		$(this).addClass('selected');
		
		$("ul.time-table").find('li,ul.time-slots').removeClass('selected'); 
 		$(this).parentsUntil("ul.time-table").addClass('selected'); 
		
		calculate_step_value();
		
	});
	
	$('form[name="dt-sc-appointment-contactdetails-form"]').on('submit', function () {	
		
		var $firstname = $('#firstname').val();
		var $lastname = $('#lastname').val();
		var $phone = $('#phone').val();
		var $emailid = $('#emailid').val();
		var $address1 = $('#address1').val();
		var $address2 = $('#address2').val();
		var $city = $('#city').val();
		var $state = $('#state').val();
		var $zip = $('#zip').val();
		var $notes = $('#notes').val();
		
		var contact_details_paa = '<ul>';
				if($firstname != '') { contact_details_paa += '<li><label>' + dtAppointmentCustom.name + ' : </label>' + $firstname + ' ' + $lastname + '</li>'; }
				if($address1 != '') { contact_details_paa += '<li><label>' + dtAppointmentCustom.address1 + ' : </label>' + $address1 + '</li>'; }
				if($address2 != '') { contact_details_paa += '<li><label>' + dtAppointmentCustom.address2 + ' : </label>' + $address2 + '</li>'; }
				if($city != '') { contact_details_paa += '<li><label>' + dtAppointmentCustom.city + ' : </label>' + $city + '</li>'; }
				if($state != '') { contact_details_paa += '<li><label>' + dtAppointmentCustom.state + ' : </label>' + $state + '</li>'; }
				if($zip != '') { contact_details_paa += '<li><label>' + dtAppointmentCustom.zip + ' : </label>' + $zip + '</li>'; }
				if($phone != '') { contact_details_paa += '<li><label>' + dtAppointmentCustom.phone + ' : </label>' + $phone + '</li>'; }
				if($emailid != '') { contact_details_paa += '<li><label>' + dtAppointmentCustom.email + ' : </label>' + $emailid + '</li>'; }
			contact_details_paa += '</ul>';
			
		$('#dt-sc-contact-info').html(contact_details_paa);
		$('#dt-sc-instant-contact-info').html(contact_details_paa);
		$('.dt-sc-instant-notification-contactbox').fadeIn(800);
		
		var contact_details;
		contact_details = $firstname + '#';
		contact_details += $lastname + '#';
		contact_details += $address1 + '#';
		contact_details += $address2 + '#';
		contact_details += $city + '#';
		contact_details += $state + '#';
		contact_details += $zip + '#';
		contact_details += $phone + '#';
		contact_details += $emailid + '#';
		contact_details += $notes;
					
		$('.dt-sc-appointment-payment-form').find('#customer_first_name').val($firstname);
		$('.dt-sc-appointment-payment-form').find('#customer_last_name').val($lastname);
		$('.dt-sc-appointment-payment-form').find('#customer_address1').val($address1);
		$('.dt-sc-appointment-payment-form').find('#customer_address2').val($address2);
		$('.dt-sc-appointment-payment-form').find('#customer_city').val($city);
		$('.dt-sc-appointment-payment-form').find('#customer_state').val($state);
		$('.dt-sc-appointment-payment-form').find('#customer_zip').val($zip);
		$('.dt-sc-appointment-payment-form').find('#customer_email').val($emailid);
		
		var schedule_details = $('.dt-sc-appointment-payment-form').find('#custom').val();
		$('.dt-sc-appointment-payment-form').find('#custom').val(schedule_details+'|'+contact_details);	
		
		$('.dt-sc-contactdetails-box').hide();
		$('.dt-sc-payment-box').fadeIn(800);
		
		calculate_step_value();
		
		return false;

	});	
	
	
	$('form[name="dt-sc-appointment-payment-form"]').on('submit', function () {	
		
		var payment_type = $('input[name=payment_type]:checked').val();
		
		if(payment_type == 'payatarrival' || payment_type == 'freetransaction') {
			
			var $appt_datas = $('#custom').val();
			$.ajax({
				method: 'POST',
				url: 	dttheme_urls.ajaxurl,
				data: 	{ 
					action: "dttheme_new_reservation",
					appt_datas: $appt_datas
				},
				dataType: 'json',
				beforeSend: function(){
					$('.dt-sc-payment-box').addClass('dt-sc-appointment-under-process');
					$('#dt-sc-ajax-load-image').show();
				},
				success: function( response ){
					$('.dt-sc-instant-notification-box').hide();
					$('.dt-sc-instant-notification-schedulebox').hide();
					$('.dt-sc-instant-notification-contactbox').hide();
					$('.dt-sc-payment-box').hide();
					$('.dt-sc-notification-details').show();
					$('.dt-sc-appointment-notification-box').fadeIn(800);
					if(response == 'Success') {
						$('.dt-sc-apt-success-box').fadeIn(800);
					} else {
						$('.dt-sc-apt-error-box').fadeIn(800);
					}
				},
				complete: function(response){
					$('.dt-sc-payment-box').removeClass('dt-sc-appointment-under-process');
					$('#dt-sc-ajax-load-image').hide();
					calculate_step_value();
				} 
			});
			
			return false;
			
		}
		
	});	

});