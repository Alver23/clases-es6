class User {
	constructor(name = 'sin nombre') {
		this.name = name;
	}
}

let user = new User();

let personName = prompt('Digite su nombre');
let name = personName || user.name;
$(".user").text(`Hola ${name}`);