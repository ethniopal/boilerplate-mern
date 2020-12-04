/**
 * Sample Input
	let obj = {
		name: 'test',
		address: {
			personal: 'abc',
			office: {
				building: 'random',
				street: 'some street'
			}
		}
	}
 *
 *	expected Output : 
	{
		name : "test",
		address_personal: "abc"
		address_office_building: "random"
		address_office_street: "some street"
	}
 *
 * @param {*} obj
 * @param {*} parent
 * @param {*} res
 */

function flattenObj(obj, parent, res = {}) {
	for (let key in obj) {
		let propName = parent ? parent + '_' + key : key
		if (typeof obj[key] == 'object') {
			flattenObj(obj[key], propName, res)
		} else {
			res[propName] = obj[key]
		}
	}
	return res
}

module.exports = {
	flattenObj
}
