const getState = ({ getStore, setStore }) => {
	return {
		store: {
			contacts: []
			//Your data structures, A.K.A Entities
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			createUser: async () => {
				try {
					await fetch("https://playground.4geeks.com/apis/fake/contact/", {
						method: "POST",
						body: JSON.stringify([]),
						headers: {
							"Content-Type": "application/json"
						}
					});
				} catch (error) {
					console.error(error);
				}
			},
			obtenerContacts: async () => {
				try {
					const openConection = await fetch(
						"https://playground.4geeks.com/apis/fake/contact/agenda/DJTest4",
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json"
							}
						}
					);
					const dataContacts = await openConection.json();
					setStore({ contacts: dataContacts });
					console.log(dataContacts);
				} catch (error) {
					console.error(error);
				}
			},
			crearContact: async ({ name, email, address, phone }) => {
				let contact = {
					full_name: name,
					email: email,
					agenda_slug: "DJTest4",
					address: address,
					phone: phone
				};
				try {
					const openConection = await fetch("https://playground.4geeks.com/apis/fake/contact/", {
						method: "POST",
						body: JSON.stringify(contact),
						headers: {
							"Content-Type": "application/json"
						}
					});
					const dataContacts = await openConection.json();
					console.log(dataContacts);
				} catch (error) {
					console.error(error);
				}
			},
			deleteContact: async () => {
				//OBTENER ID
				try {
					const openConection = await fetch("https://playground.4geeks.com/apis/fake/contact/", {
						method: "DELETE",
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
		}
	};
};

export default getState;
