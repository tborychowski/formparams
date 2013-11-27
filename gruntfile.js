/*global module:false*/
module.exports = function (grunt) {
	grunt.initConfig({
		jshint: {
			options: { jshintrc: 'src/.jshintrc' },
			files: [ 'src/*.js' ]
		},
		uglify: { 
			jsh : { files: { 'dist/jquery.formparams.min.js': 'src/jquery.formparams.js' }}
		},
		qunit: { files: ['test/*.html'] }
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');

	grunt.registerTask('default', [ 'qunit' ]);
};