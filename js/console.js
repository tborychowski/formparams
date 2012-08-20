;(function($){
	var con = $('<div id="console"/>'), subHandle, ready = false,

	_cls = function(){
		con.text('');
		_log('Ready...');
	},

	_log = function(txt, overwrite){
		if (overwrite) con.html(txt+'<br>');
		else con.append(txt+'<br>');
		con.scrollTop(999999);
	},

	_init = function(txt){
		if (ready) return;
		$('body').append(con);
		//_log('<b>Console started</b>, '+(new Date()),1);
		subHandle = $.subscribe('log',_log);
		ready = true;
	},

	_destroy = function(){
		if (subHandle) $.unsubscribe(subHandle);
		con.remove();
		ready = false;
	};

	_init();

	return {
		init: _init,
		destroy: _destroy,
		cls: _cls,
		log: _log
	};
}(jQuery));