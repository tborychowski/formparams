/*global describe, it, expect */

var formHtml =
		'<input name="name" placeholder="name" value="Tom"/>' +
		'<input name="surname" placeholder="surname" value="Smith"/>' +
		'<input type="checkbox" name="optin" />Opt-In<br>' +
		'<input type="radio" name="gender" value="m" checked="checked" />M <input type="radio" name="gender" value="f" />F<br>' +
		'<input name="address[line1]" placeholder="address line 1" value="building"/>' +
		'<input name="address[line2]" placeholder="address line 2" value="12"/>' +
		'<input name="address[line3]" placeholder="address line 3" value="3"/>',
	comparer1 = { name: 'Tom', surname: 'Smith', optin: false, gender: 'm', address: {line1: 'building', line2: '12', line3: '3' } },
	comparer2 = { name: 'Tom', surname: 'Smith', optin: false, gender: 'm', address: {line1: 'building', line2: 12, line3: 3 } },
	setter = { name: 'Adam', surname: 'Brown', optin: true, gender: 'm', address: {line1: 'house', line2: 10, line3: 123 } },
	setter2 = { name: 'Dana', optin: false, gender: 'f' },
	form = $('<form/>').html(formHtml),
	formEl = form[0].elements;


describe('$.fn.formParams', function () {

	describe('exists', function () {
		it('should be a function', function () {
			$.fn.formParams.should.not.be.an('undefined');
			$.fn.formParams.should.be.a('function');
		});
		it('should exist for a jquery form', function () {
			form.formParams.should.be.a('function');
		});
	});


	describe('read', function () {
		it('read data from form elements into data model (js object)', function () {
			form.formParams().should.deep.equal(comparer1);
		});
		it('read and convert form elements into data model (js object)', function () {
			form.formParams(true).should.deep.equal(comparer2);
		});
	});


	describe('write', function () {
		it('write data model into form fields', function () {
			form.formParams(setter);

			formEl.name.value.should.equal(setter.name);
			formEl.surname.value.should.equal(setter.surname);
			formEl.optin.checked.should.equal(true);
			form.find('input[name=gender]:checked').val().should.equal(setter.gender);
			formEl['address[line1]'].value.should.equal(setter.address.line1);
			formEl['address[line2]'].value.should.equal(setter.address.line2 + '');
			formEl['address[line3]'].value.should.equal(setter.address.line3 + '');

			form.formParams(true).should.deep.equal(setter);
		});
	});


	describe('overwrite', function () {
		it('overwrite data model into form fields (over the previous one)', function () {
			form.formParams(setter).formParams(setter2);

			formEl.name.value.should.equal(setter2.name);
			formEl.surname.value.should.equal(setter.surname);
			formEl.optin.checked.should.equal(setter2.optin);
			form.find('input[name=gender]:checked').val().should.equal(setter2.gender);
			formEl['address[line1]'].value.should.equal(setter.address.line1);
			formEl['address[line2]'].value.should.equal(setter.address.line2 + '');
			formEl['address[line3]'].value.should.equal(setter.address.line3 + '');
		});
	});


	describe('overwrite and clear', function () {
		it('overwrite js object into form fields and clear fields which are undefined in model', function () {
			form.formParams(setter).formParams(setter2, true);

			formEl.name.value.should.equal(setter2.name);
			formEl.surname.value.should.equal('');
			formEl.optin.checked.should.equal(setter2.optin);
			form.find('input[name=gender]:checked').val().should.equal(setter2.gender);
			formEl['address[line1]'].value.should.equal('');
			formEl['address[line2]'].value.should.equal('');
			formEl['address[line3]'].value.should.equal('');
		});
	});


	describe('clear', function () {
		it('write an empty model into form fields (to clear all fields)', function () {
			form.formParams({}, true);
			formEl.name.value.should.equal('');
			formEl.surname.value.should.equal('');
			formEl.optin.checked.should.equal(false);
			expect(form.find('input[name=gender]:checked').val()).to.be.an('undefined');
			expect(form.find('input[name=gender]:checked').val()).to.not.equal('undefined');
			formEl['address[line1]'].value.should.equal('');
			formEl['address[line2]'].value.should.equal('');
			formEl['address[line3]'].value.should.equal('');
		});
	});



	describe('set and get', function () {
		it('write and read data model into form fields', function () {
			form.formParams(comparer1);
			form.formParams().should.deep.equal(comparer1);
		});
		it('write and read & convert data model into form fields', function () {
			form.formParams(comparer1);
			form.formParams(true).should.deep.equal(comparer2);
		});
	});


});
