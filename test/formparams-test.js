/*global test, ok, strictEqual, deepEqual */

test('formparams', function () {
	var formHtml =
		'<input name="name" placeholder="name" value="Tom"/>' +
		'<input name="surname" placeholder="surname" value="O&apos;Don"/>' +
		'<input type="checkbox" name="optin" />Opt-In<br>' +
		'<input type="radio" name="gender" value="m" checked="checked" />M <input type="radio" name="gender" value="f" />F<br>' +
		'<input name="address[line1]" placeholder="address line 1" value="building"/>' +
		'<input name="address[line2]" placeholder="address line 2" value="12"/>' +
		'<input name="address[line3]" placeholder="address line 3" value="3"/>',
	comparer1 = { name: 'Tom', surname: 'O\'Don', optin: false, gender: 'm', address: {line1: 'building', line2: '12', line3: '3' } },
	comparer1a = { name: 'Tom', surname: 'O&apos;Don', optin: false, gender: 'm', address: {line1: 'building', line2: '12', line3: '3' } },
	comparer2 = { name: 'Tom', surname: 'O\'Don', optin: false, gender: 'm', address: {line1: 'building', line2: 12, line3: 3 } },
	setter = { name: 'Adam', surname: 'Brown', optin: true, gender: 'm', address: {line1: 'house', line2: 10, line3: 123 } },
	setter2 = { name: 'Dana', optin: false, gender: 'f' },
	form = $('<form/>').html(formHtml),
	formEl = form[0].elements;


	/*** EXISTS *******************************************************************************************************/
	ok(typeof $.fn.formParams === 'function', 'Should exist');



	/*** READ *********************************************************************************************************/
	ok(form.formParams !== 'undefined', 'Should exist on an element');
	deepEqual(form.formParams(), comparer1, 'Read form');
	deepEqual(form.formParams(true), comparer2, 'Read and convert');



	/*** WRITE ********************************************************************************************************/
	form.formParams(setter);
	strictEqual(formEl.name.value, setter.name, 'Write 1');
	strictEqual(formEl.surname.value, setter.surname, 'Write 2');
	strictEqual(formEl.optin.checked, true, 'Write 3');
	strictEqual(form.find('input[name=gender]:checked').val(), setter.gender, 'Write 4');
	strictEqual(formEl['address[line1]'].value, setter.address.line1, 'Write 5');
	strictEqual(formEl['address[line2]'].value, setter.address.line2 + '', 'Write 6');
	strictEqual(formEl['address[line3]'].value, setter.address.line3 + '', 'Write 7');



	/*** OVERWRITE ****************************************************************************************************/
	form.formParams(setter).formParams(setter2);
	strictEqual(formEl.name.value, setter2.name, 'Overwrite 1');
	strictEqual(formEl.surname.value, setter.surname, 'Overwrite 2');
	strictEqual(formEl.optin.checked, setter2.optin, 'Overwrite 3');
	strictEqual(form.find('input[name=gender]:checked').val(), setter2.gender, 'Overwrite 4');
	strictEqual(formEl['address[line1]'].value, setter.address.line1, 'Overwrite 5');
	strictEqual(formEl['address[line2]'].value, setter.address.line2 + '', 'Overwrite 6');
	strictEqual(formEl['address[line3]'].value, setter.address.line3 + '', 'Overwrite 7');



	/*** OVERWRITE AND CLEAR ******************************************************************************************/
	form.formParams(setter).formParams(setter2, true);
	strictEqual(formEl.name.value, setter2.name, 'write and clear');
	strictEqual(formEl.surname.value, '', 'write and clear');
	strictEqual(formEl.optin.checked, setter2.optin, 'write and clear');
	strictEqual(form.find('input[name=gender]:checked').val(), setter2.gender, 'write and clear');
	strictEqual(formEl['address[line1]'].value, '', 'write and clear');
	strictEqual(formEl['address[line2]'].value, '', 'write and clear');
	strictEqual(formEl['address[line3]'].value, '', 'write and clear');



	/*** CLEAR ********************************************************************************************************/
	form.formParams({}, true);
	strictEqual(formEl.name.value, '', 'Clear 1');
	strictEqual(formEl.surname.value, '', 'Clear 2');
	strictEqual(formEl.optin.checked, false, 'Clear 3');
	ok(form.find('input[name=gender]:checked').val() !== 'undefined', 'Clear 4');
	strictEqual(formEl['address[line1]'].value, '', 'Clear 5');
	strictEqual(formEl['address[line2]'].value, '', 'Clear 6');
	strictEqual(formEl['address[line3]'].value, '', 'Clear 7');



	/*** SET & GET ****************************************************************************************************/
	form.formParams(comparer1);
	deepEqual(form.formParams(), comparer1, 'set and normal get');

	form.formParams(comparer1a);
	deepEqual(form.formParams(), comparer1, 'set and normal get');

	form.formParams(comparer1);
	deepEqual(form.formParams(true), comparer2, 'set and get converted 1');

	form.formParams(setter);
	deepEqual(form.formParams(true), setter, 'set and get converted 2');

});