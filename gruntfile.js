/*global module:false*/
module.exports = function (grunt) {
	grunt.initConfig({

		jasmine: {
			files: {
				src: 'js/jquery.formparams.js',
				options: {
					vendor: 'js/jquery.min.js',
					helpers: 'tests-jasmine/lib/jasmine-ext.js',
					specs: 'tests-jasmine/spec/*.js'
				}
			}
		},

		qunit: { files: ['tests-qunit/*.html'] }


	});

	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('default', [ 'qunit', 'jasmine' ]);
};