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
	setter2 = { name: 'Dana', optin: false, gender: 'f' };


describe('formparams - read:', function () {
	var form = $('<form/>').html(formHtml);

	it('Form Data is defined', function () {
		expect(form.formParams()).toBeDefined();
	});

	it('Read', function () {
		expect(form.formParams()).toEqual(comparer1);
	});

	it('Read and convert', function () {
		expect(form.formParams(true)).toEqual(comparer2);
	});

});


describe('formparams - write:', function () {
	var form, formEl;

	beforeEach(function () {
		form = $('<form/>').html(formHtml);
		formEl = form[0].elements;
	});

	it('write', function () {
		form.formParams(setter);

		expect(formEl.name.value).toEqual(setter.name);
		expect(formEl.surname.value).toEqual(setter.surname);
		expect(formEl.optin.checked).toEqual(true);
		expect(form.find('input[name=gender]:checked').val()).toEqual(setter.gender);
		expect(formEl['address[line1]'].value).toEqual(setter.address.line1);
		expect(formEl['address[line2]'].value).toEqual(setter.address.line2 + '');
		expect(formEl['address[line3]'].value).toEqual(setter.address.line3 + '');
	});

	it('overwrite', function () {
		form.formParams(setter).formParams(setter2);

		expect(formEl.name.value).toEqual(setter2.name);
		expect(formEl.surname.value).toEqual(setter.surname);
		expect(formEl.optin.checked).toEqual(setter2.optin);
		expect(form.find('input[name=gender]:checked').val()).toEqual(setter2.gender);
		expect(formEl['address[line1]'].value).toEqual(setter.address.line1);
		expect(formEl['address[line2]'].value).toEqual(setter.address.line2 + '');
		expect(formEl['address[line3]'].value).toEqual(setter.address.line3 + '');
	});

	it('write and clear', function () {
		form.formParams(setter).formParams(setter2, true);

		expect(formEl.name.value).toEqual(setter2.name);
		expect(formEl.surname.value).toEqual('');
		expect(formEl.optin.checked).toEqual(setter2.optin);
		expect(form.find('input[name=gender]:checked').val()).toEqual(setter2.gender);
		expect(formEl['address[line1]'].value).toEqual('');
		expect(formEl['address[line2]'].value).toEqual('');
		expect(formEl['address[line3]'].value).toEqual('');
	});

	it('clear', function () {
		form.formParams({}, true);

		expect(formEl.name.value).toEqual('');
		expect(formEl.surname.value).toEqual('');
		expect(formEl.optin.checked).toEqual(false);
		expect(form.find('input[name=gender]:checked').val()).toBeUndefined();
		expect(formEl['address[line1]'].value).toEqual('');
		expect(formEl['address[line2]'].value).toEqual('');
		expect(formEl['address[line3]'].value).toEqual('');
	});
});



describe('formparams - write and read:', function () {
	var form;

	beforeEach(function () {
		form = $('<form/>').html(formHtml);
	});

	it('set and normal get', function () {
		form.formParams(comparer1);
		expect(form.formParams()).toEqual(comparer1);
	});

	it('set and get converted', function () {
		form.formParams(comparer1);
		expect(form.formParams(true)).toEqual(comparer2);
	});

	it('set and get converted (2)', function () {
		form.formParams(setter);
		expect(form.formParams(true)).toEqual(setter);
	});
});