import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// Don't change, here is where we initialize our context, by default its just going to be Null.
export const Context = React.createContext(null);

const fakeContacts = [
	{
		full_name: "Dave Bradley",
		email: "dave@gmail.com",
		agenda_slug: "DJTest3",
		address: "47568 NW 34ST, 33434 FL, USA",
		phone: "7864445566"
	}
];

async function createUser() {
	try {
		const openConection = await fetch("https://playground.4geeks.com/apis/fake/contact/", {
			method: "POST",
			body: JSON.stringify(fakeContacts),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(data => console.log(data))
			.catch(err => console.log(err));
		console.log(openConection);
	} catch (error) {
		console.error(error);
	}
}

async function obtenerContacts() {
	try {
		const openConection = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda/DJTest", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		const dataContacts = await openConection.json();
		console.log(dataContacts);
	} catch (error) {
		console.error(error);
	}
}

// This function injects the global store to any view/component where you want to use it, we will inject the context to Layout.jsx, you can see it here:
// https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/src/js/layout.jsx#L35
const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		//this will be passed as the contenxt value
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			createUser();

			//obtenerContacts();
			/**
			 * EDIT THIS!
			 * This function is the equivalent to "window.onLoad", it only run once on the entire application lifetime
			 * you should do your ajax requests or fetch api requests here
			 *
			 * state.loadSomeData(); <---- calling this function from the flux.js actions
			 *
			 **/
		}, []);

		// the initial value for the context its not null anymore, but the current state of this component,
		// the context will have a getStore and setStore functions available then, because they were declared
		// on the state of this component
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;
