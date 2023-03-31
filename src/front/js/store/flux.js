const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			username: null,
			favorites: [],
            selectFavorites: [],
			selectEvent: [],
			selectCategory: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],

			tutorData: {
				name: "",
				lastName: "",
				birthDate: "",
				city: "",
				children: []
			},

			eventData: {
				name: "",
				street: "",
				city: "",
				min_age: "",
				max_age: "",
				price: "",
				date: "",
				length: "",
				category: "",
				slots: "",
				description: "",
				contact: "",
				company: "",
				cloth: "",
				others: "",
			},

			advertiserData: {
				name: "",
				lastName: "",
				birthDate: "",
				city: "",
				contact: "",
				avatar: "",
				company: "",
				working_since: "",
				twitter: "",
			},
			categories: ["Escuelas de Surf", "Clases de Teatro", "Campamentos de Verano", "Campings", "Parques Acuáticos", "Cocina", "Programación", "Música", "Fútbol", "Baile"],
			childData: null,

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			addFavorite: ({id, name}, favorites) => {
                console.log("entró", {id, name});
                setStore({ favorites: [...favorites, {name}]});
            },

            deleteFavorite: ({id, name}, favorites) => {
                console.log("pedido de baja", {id, name});
                const updatedFavorites = favorites.filter((favorite) => favorite.name !== name);
                setStore({ favorites: updatedFavorites });
            },

			addChild: (childData) => {
				const store = getStore();
				const newChildren = [...store.tutorData.children, childData];
				setStore({ tutorData: { ...store.tutorData, children: newChildren } });
			},


			//Para sincronizar el token almacenado en el almacenamiento local (localStorage) con el estado de la aplicación (setStore)
			syncTokenAndEmail: () => {
				const token = localStorage.getItem("token");
				const email = localStorage.getItem("email");
				console.log("App just loaded, synching the local storage");
			
				let updatedStore = {};
			
				if (token && token !== "" && token !== "undefined") {
					updatedStore.token = token;
				}
			
				if (email && email !== "" && email !== "undefined") {
					updatedStore.email = email;
				}
			
				if (Object.keys(updatedStore).length > 0) {
					setStore(updatedStore);
				}
			},
	

			login: async (email, password) => {

				const requestOptions = {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify({
						"username": email,
						"password": password
					})
				};
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/login", requestOptions)
					if (resp.status != 200) {
						console.log("actions.login: error");
						return false;
					}
					const data = await resp.json();
					console.log("ok", data);
					localStorage.setItem("token", data.access_token);

					setStore({ token: data.access_token })

					return true;
				}
				catch (error) {
					console.error("There has been an error login in")
				}
			},

			register: async (email, password, setShowTutorForm, setShowAdvertiserForm, tutorData, advertiserData) => {
				const requestOptions = {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify({
						"username": email,
						"password": password
					})
				};
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/signup", requestOptions)
					if (resp.status == 200) {

						const data = await resp.json();
						console.log("User data:", data);

						return true;
					} else {
						console.log("error en API/signup");
						alert("An error has occurred while creating the user");
						return false;
					}
				} catch (error) {
					console.error("There has been an error creating a user")
				}
			},

			getUserData:
				async () => {
					const store = getStore();
					const requestOptions = {
						method: "GET",
						headers: {
							Authorization: `Bearer ${store.token}`,
						},
					};
					try {
						const res = await fetch(process.env.BACKEND_URL + "/api/protected", requestOptions);
						const data = await res.json();
						return data;
					} catch (error) {
						console.log(error);
					}
				},

			logout: () => {
				const token = localStorage.removeItem("token");
				setStore({ token: null });
			}, 


			createTutor: async (email, tutorData) => {
				console.log("**************", email, tutorData, "**********");
				try {
					let user = {
						"username": email,
						"name": tutorData.name,
						"lastname": tutorData.lastName,
						"birth": tutorData.birthDate,
						"location": tutorData.city
					};
					let userTutor = Object.assign({}, user, tutorData);
					console.log("+++++++++", userTutor, "+++++++");
					const tutorRequestOptions = {
						method: "POST",
						headers: {
							"Content-type": "application/json"
						},
						body: JSON.stringify(userTutor)
					};

					const tutorResp = await fetch(process.env.BACKEND_URL + "/api/signup/tutor", tutorRequestOptions);
					const tutorDataResp = await tutorResp.json();
					console.log("Tutor data:", tutorDataResp);

					// Verificar si el tutor se creó con éxito
					if (tutorResp.status === 200) {
						// Añadir hijos (children) al tutor creado una vez que se creó
						for (const child of tutorData.children) {
							const childData = {
								...child,
								"name": child.name,
								"username": email,
								"lastname": child.lastName,
								"preferences": child.preferences || "",
								"avatar": child.avatar || "",
								"school": child.school || "",
								"others": child.others || "",
								"parent": child.parent || "",
								"birth": child.birth
							};
							
							const childRequestOptions = {
								method: "POST",
								headers: {
									"Content-type": "application/json"
								},
								body: JSON.stringify(childData)
							};

							const childResp = await fetch(process.env.BACKEND_URL + "/api/signup/tutor/child", childRequestOptions);
							const childDataResp = await childResp.json();
							console.log("Child data:", childDataResp);
						}

					} else {
						console.error("Error al crear tutor:", tutorDataResp);
						return false;
					}

					return true;

				} catch (error) {
					console.error("Error al crear tutor:", error);
				}
			},


			/*FALTA EL GET EVENT y MODIFY EVENT*/

			createEvent: async (email, eventData, token) => {
				try {
					let user = {
						"username": email}
					let eventObj = {
						"name": eventData.name,
						"localization": eventData.street + ", " + eventData.city + ", Spain",
						"min_age": eventData.min_age,
						"max_age": eventData.max_age,
						"price": eventData.price,
						"date": eventData.date,
						"length": eventData.length,
						"category": eventData.category,
						"slots": eventData.slots,
						"description": eventData.description,
						"cloth": eventData.cloth,
						"others": eventData.others
					};

					let event = Object.assign({}, user, eventObj);
					const eventRequestOptions = {
						method: "POST",
						headers: {
							"Content-type": "application/json",
							//"Authorization": "Bearer " + token
						},
						body: JSON.stringify(event)
					};

					const eventResp = await fetch(process.env.BACKEND_URL + "/api/event", eventRequestOptions);
					const eventDataResp = await eventResp.json();
					console.log("Evento creado OK!!!! Respuesta del back:", eventDataResp);

				} catch (error) {
					console.error("Error al crear el Evento:", error);
				}
			},

	
			getEvents: async () => {
				try {
					const params = new URLSearchParams({
						done: "all",
						// Modificar/agregar otros parámetros de ser necesario, como palabra de búsqueda (word) o categoría (category)
					});
			
					const eventsResp = await fetch(`${process.env.BACKEND_URL}/api/event/all?${params.toString()}`);
			
					const eventsDataResp = await eventsResp.json();
					console.log("Info almacenada de los eventos:", eventsDataResp);
			
				} catch (error) {
					console.error("Error al obtener los eventos:", error);
				}
			},

			searchEvents: async (selectCategory) => {
				try {
					const params = new URLSearchParams({
						category: selectCategory,
						// Modificar/agregar otros parámetros de ser necesario, como palabra de búsqueda (word) o categoría (category)
					});
			
					const eventsResp = await fetch(`${process.env.BACKEND_URL}/api/event/all?${params.toString()}`);
			
					const eventsDataResp = await eventsResp.json();
					console.log("Eventos almacenados en esta categoría:", eventsDataResp);
			
				} catch (error) {
					console.error("Error al obtener los eventos de esta categoría:", error);
				}
			},
			

			modifyTutor: async (email, tutorData, token) => {
				try {
					let user = { "username": email }
					let userTutor = Object.assign({}, user, tutorData)
					console.log(userTutor)
					const tutorRequestOptions = {
						method: "PUT",
						headers: {
							"Content-type": "application/json"
						},
						body: JSON.stringify(userTutor)
					};

					const tutorResp = await fetch(process.env.BACKEND_URL + "/api/signup/tutor", tutorRequestOptions)
					const tutorDataResp = await tutorResp.json();
					console.log("Tutor data:", tutorDataResp);
					return true;

				} catch (error) {
					console.error("Error al crear tutor:", error);
				}
			},

			
			createAdvertiser: async (email, advertiserData) => {
				try {
					let user = {
						"username": email,
						"name": advertiserData.name,
						"lastname": advertiserData.lastName,
						"birth": advertiserData.birthDate,
						"location": advertiserData.city,
						"contact": advertiserData.contact,
						"avatar": advertiserData.avatar,
						"company": advertiserData.company,
						"working_since": advertiserData.working_since,
						"twitter": advertiserData.twitter
					}

					let userAdvertiser = Object.assign({}, user, advertiserData)
					const advertiserRequestOptions = {
						method: "POST",
						headers: {
							"Content-type": "application/json"
						},
						body: JSON.stringify(userAdvertiser)
					};

					const advertiserResp = await fetch(process.env.BACKEND_URL + "/api/signup/advertiser", advertiserRequestOptions)
					const advertiserDataResp = await advertiserResp.json();
					console.log("advertiser data:", advertiserDataResp);

					return true;

				} catch (error) {
					console.error("Error al crear anunciante:", error);
				}
			},
		}
	};
};

export default getState;