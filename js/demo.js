$(function(){
	App.Publish('log', ['App Ready!']);

	var form = $('#testForm');

	$('#btnRead').on('click', function(){
		var formData = form.formParams();
		console.log(formData);

		App.Publish('log', [ unescape($.param(formData)) ]);
	});


	$('#btnWrite').on('click', function(){
		var formData = [
				{ name: 'Tom', surname: 'Tom', optin: true, gender: 'm', address: { line1: 'street1', line2: 'postcode1', line3: 'county1' } },
				{ name: 'Johan', surname: 'Wolfgang', optin: false, gender: 'm' },
				{ name: 'Emiel', surname: 'Regis', optin: true, gender: 'f', address: { line1: 'street3', line2: 'postcode3', line3: 'county3' }  },
				{ name: 'Ahmed', optin: false, gender: 'f' }
			],
			n = Math.floor(Math.random()*formData.length);

		console.log(formData[n]);
		form.formParams(formData[n], true);
	});


});


var App = App || {};

App.Publish = function(channel, args){ $.publish(channel, args); };
App.Subscribe = function(channel, callback, scope){ $.subscribe(channel, callback, scope || App); };
