jQuery("document").ready(function($){

	$('div.dt-sc-agent-sorting > a').click(function(e){

		e.preventDefault();

		$("div.dt-sc-agent-sorting > a").removeClass("active-sort");
		$(this).addClass("active-sort");

		$filter = $('div.dt-sc-agent-sorting > a.active-sort').data('filter');

		if(typeof $filter === 'undefined'){
			$filter = $('div.dt-sc-agent-sorting > a.active-sort').html();
		}

		var $data = {
			'action' : 'dt_sc_filter_agents',
			'data'	: { 
				'title': $filter,
				'type' : $('div.dt-sc-agents-container').data('type')
			}
		};

		jQuery.ajax({
			url: dttheme_urls.ajaxurl,
			data: $data,
			beforeSend: function() {
				$("div.dt-sc-agents-container").html('<div class="dt-sc-loading"></div>');
			},
			success: function( response ) {
				$("div.dt-sc-agents-container").html(response).fadeIn();	
			}
		});
	});	
});