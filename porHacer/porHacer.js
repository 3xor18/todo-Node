const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
	let data = JSON.stringify(listadoPorHacer);
	fs.writeFile('db/data.json', data, (err) => {
		if (err) throw new Error('No se pudo grabar');
	});
};

const cargarDB = () => {
	try {
		listadoPorHacer = require('../db/data.json');
	} catch (error) {
		listadoPorHacer = [];
	}
};

const getListado = () => {
	cargarDB();
	return listadoPorHacer;
};

const actualizar = (descripcion, completado) => {
	cargarDB();
	let index = listadoPorHacer.findIndex((tarea) => tarea.descripcion === descripcion);
	if (index >= 0) {
		listadoPorHacer[index].completado = completado;
		guardarDB();
		return true;
	} else {
		return false;
	}
};

const crear = (descripcion) => {
	cargarDB();
	let porHacer = {
		descripcion,
		completado: false,
	};

	listadoPorHacer.push(porHacer);
	guardarDB();
	return porHacer;
};

const borrar = (descripcion) => {
	cargarDB();
	const newArray = listadoPorHacer.filter((tarea) => tarea.descripcion !== descripcion);
	if (newArray.length === listadoPorHacer) return false;
	listadoPorHacer = newArray;
	guardarDB();
	return true;
};

module.exports = { crear, getListado, actualizar, borrar };
