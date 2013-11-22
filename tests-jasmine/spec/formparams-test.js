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
			expect($.fn.formParams).not.toBeUndefined();
		});
		it('should exist for a jquery form', function () {
			expect($.fn.formParams).toBeA('function');
		});
	});


	describe('read', function () {
		it('read data from form elements into data model (js object)', function () {
			expect(form.formParams()).toEqual(comparer1);
		});
		it('read and convert form elements into data model (js object)', function () {
			expect(form.formParams(true)).toEqual(comparer2);
		});
	});


	describe('write', function () {
		it('write data model into form fields', function () {
			form.formParams(setter);

			expect(formEl.name.value).toEqual(setter.name);
			expect(formEl.surname.value).toEqual(setter.surname);
			expect(formEl.optin.checked).toEqual(true);
			expect(form.find('input[name=gender]:checked').val()).toEqual(setter.gender);
			expect(formEl['address[line1]'].value).toEqual(setter.address.line1);
			expect(formEl['address[line2]'].value).toEqual(setter.address.line2 + '');
			expect(formEl['address[line3]'].value).toEqual(setter.address.line3 + '');

			expect(form.formParams(true)).toEqual(setter);
		});
	});


	describe('overwrite', function () {
		it('overwrite data model into form fields (over the previous one)', function () {
			form.formParams(setter).formParams(setter2);

			expect(formEl.name.value).toEqual(setter2.name);
			expect(formEl.surname.value).toEqual(setter.surname);
			expect(formEl.optin.checked).toEqual(setter2.optin);
			expect(form.find('input[name=gender]:checked').val()).toEqual(setter2.gender);
			expect(formEl['address[line1]'].value).toEqual(setter.address.line1);
			expect(formEl['address[line2]'].value).toEqual(setter.address.line2 + '');
			expect(formEl['address[line3]'].value).toEqual(setter.address.line3 + '');
		});
	});


	describe('overwrite and clear', function () {
		it('overwrite js object into form fields and clear fields which are undefined in model', function () {
			form.formParams(setter).formParams(setter2, true);

			expect(formEl.name.value).toEqual(setter2.name);
			expect(formEl.surname.value).toEqual('');
			expect(formEl.optin.checked).toEqual(setter2.optin);
			expect(form.find('input[name=gender]:checked').val()).toEqual(setter2.gender);
			expect(formEl['address[line1]'].value).toEqual('');
			expect(formEl['address[line2]'].value).toEqual('');
			expect(formEl['address[line3]'].value).toEqual('');
		});
	});


	describe('clear', function () {
		it('write an empty model into form fields (to clear all fields)', function () {
			form.formParams({}, true);

			expect(formEl.name.value).toEqual('');
			expect(formEl.surname.value).toEqual('');
			expect(formEl.optin.checked).toEqual(false);
			expect(form.find('input[name=gender]:checked').val()).toBeAn('undefined');
			expect(form.find('input[name=gender]:checked').val()).not.toBeDefined();
			expect(formEl['address[line1]'].value).toEqual('');
			expect(formEl['address[line2]'].value).toEqual('');
			expect(formEl['address[line3]'].value).toEqual('');
		});
	});


	describe('set and get', function () {
		it('write and read data model into form fields', function () {
			form.formParams(comparer1);
			expect(form.formParams()).toEqual(comparer1);
		});
		it('write and read & convert data model into form fields', function () {
			form.formParams(comparer1);
			expect(form.formParams(true)).toEqual(comparer2);
		});
	});


});
