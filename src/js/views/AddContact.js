import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
export const AddContact = () => {
	const { actions, store } = useContext(Context);

	useEffect(() => {
		actions.createUser();
	}, []);

	const [contact, setContact] = useState({ name: "", email: "", phone: 0, address: "" });

	const handleInputChange = e => {
		const { name, value } = e.target;
		setContact(contact => ({
			...contact,
			[name]: value
		}));
		console.log(contact);
	};

	const handleSubmit = e => {
		actions.crearContact(contact);
	};

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							value={contact.name}
							onChange={handleInputChange}
							name="name"
							className="form-control"
							placeholder="Full Name"
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							value={contact.email}
							onChange={handleInputChange}
							name="email"
							className="form-control"
							placeholder="Enter email"
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							value={contact.phone}
							onChange={handleInputChange}
							name="phone"
							className="form-control"
							placeholder="Enter phone"
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							value={contact.address}
							onChange={handleInputChange}
							name="address"
							className="form-control"
							placeholder="Enter address"
						/>
					</div>
					<button type="submit" className="btn btn-primary form-control">
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};
