import { Child_Selection_Modal } from "../component/child_selection_modal";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			username: null,
			favorites: [],
            selectFavorites: [],
			userData: [],
			selectedEvent: null,
			selectedChildren: [], //PRUEBA PARA MODAL DE NIÑOS SELECCIONADOS
			selectedCategory: null,
			events_filtered: [],
			message: null,
			
			tutorData: {
				name: "",
				lastName: "",
				birthDate: "",
				city: "",
				children: []
			},

			eventData: {
				event_id: "",
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

			participantData: {
				name: "",
				lastName: "",
				birthDate: "",
			},

			categories: ["Escuelas de Surf", "Clases de Teatro", "Campamentos de Verano", "Campings", "Parques Acuáticos", "Cocina", "Programación", "Música", "Fútbol", "Baile"],
			childData: null,
			events: [],

		},

		actions: {

			//******************************VARIOS BÁSICOS P/MANEJO DE FRONT (SIN CONEX. A API)*************************** */
			clearFilteredEvents: () => {
				setStore({ events_filtered: [],});
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

			
			//************************************SECCIÓN TOKEN, LOGIN, LOGOUT, SIGN UP USER************************************/
			
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
					console.log("actions.login: error", resp.status, await resp.text());
					return false;
				  }
				  const data = await resp.json();
				  console.log("ok", data);
				  localStorage.setItem("token", data.access_token);
				  localStorage.setItem("username", email);
				
				  setStore({ token: data.access_token })
				
				  return true;
				}
				catch (error) {
				  console.error("There has been an error login in", error)
				}
			},
			
			getUserInfo: async () => {
				const username = localStorage.getItem("username");
				const token = localStorage.getItem("token");
			  
				if (!username || username === "") {
				  console.error("No se encuentra el nombre de usuario en el localStorage");
				  return;
				}
				try {
				  const params = new URLSearchParams({
					"username": username,
				  });
			  
				  const res = await fetch(`${process.env.BACKEND_URL}/api/signup/info?${params.toString()}`, {
					headers: {
					  Authorization: `Bearer ${token}`
					},
				  });
			  
				  if (!res.ok) {
					console.error(`Error en la solicitud: ${res.status}`);
					return;
				  }
				  const data = await res.json();
				  setStore({ userData: data });
				  console.log("ESTA INFO DEL USUARIO ESTÁ ALMACENADA EN EL STORE DE FLUX, EN userData:", getStore().userData);
			  
				  if (getStore().userData.info.advertiser === true) {
					try {
					  const params = new URLSearchParams({ 
						"username": username,
					  });
					  const res1 = await fetch(`${process.env.BACKEND_URL}/api/signup/advertiser?${params.toString()}`, {
						headers: {
						  Authorization: `Bearer ${token}`
						},
					  });
					  const dataAdvertiser = await res1.json();
					  setStore({ advertiserData: dataAdvertiser });
					  console.log("ESTA INFO DEL ANUNCIANTE ESTÁ ALMACENADA EN EL STORE DE FLUX, EN advertiserData:", getStore().advertiserData); // Agrega los paréntesis a 'getStore()'
					
					} catch (error) {
					  console.error("Error al intentar recuperar los datos del anunciante del back:", error);
					  return;
					}
				  }
				  if (getStore().userData.info.tutor === true) {
					try {
					  const params = new URLSearchParams({
						"username": username,
					  });
					  const res = await fetch(`${process.env.BACKEND_URL}/api/signup/tutor?${params.toString()}`, {
						headers: {
						  Authorization: `Bearer ${token}`
						},
					  });
			  
					  const dataTutor = await res.json();
					  setStore({ tutorData: dataTutor });
					  console.log("ESTA INFO DEL TUTOR ESTÁ ALMACENADA EN EL STORE DE FLUX, EN tutorData:", getStore().tutorData);
					
					} catch (error) {
					  console.error("Error al intentar recuperar los datos del tutor del back:", error);
					  return;
					}
				  }
				} catch (error) {
				  console.error("Error al intentar recuperar los datos del usuario:", error);
				  return;
				}
			},
						  
			logout: () => {
				const token = localStorage.removeItem("token");
				const username = localStorage.removeItem("username");
				setStore({ username: null});
				setStore({ token: null });
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
/*
			getUserData: async () => {
				const store = getStore();
				const username = localStorage.getItem("username");
				const token = localStorage.getItem("token");
			
				if (!username || username === "") {
					console.error("No se encuentra el nombre de usuario en el localStorage");
					return;
				}
			
				try {
					const params = new URLSearchParams({
						"username": username,
					});
			
					const res = await fetch(`${process.env.BACKEND_URL}/api/signup/info?${params.toString()}`, {
						headers: {
							Authorization: `Bearer ${token}`

						},
					});
			
					if (!res.ok) {
						console.error(`Error en la solicitud: ${res.status}`);
						return;
					}
			
					const data = await res.json();
					setStore({ tutorData: data });
					return data;
				} catch (error) {
					console.error("Error al intentar recuperar los datos del usuario:", error);
					return {
					  is_tutor: false,
					  children: [],
					};
				}
				
			},*/



			//*****************************************SECCION TUTOR Y "CHILDRENS"****************************************/
			createTutor: async (email, tutorData) => {
				const store = getStore();
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
							"Content-type": "application/json",
							Authorization: `Bearer ${store.token}`							
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
									"Content-type": "application/json",
									Authorization: `Bearer ${store.token}`
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

			modifyTutor: async (email, tutorData, token) => {
				const store = getStore();
				try {
					let user = { "username": email }
					let userTutor = Object.assign({}, user, tutorData)
					console.log(userTutor)
					const tutorRequestOptions = {
						method: "PUT",
						headers: {
							"Content-type": "application/json",
							Authorization: `Bearer ${store.token}`
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
	
			addChild: (childData) => {
				const store = getStore();
				const newChildren = [...store.tutorData.children, childData];
				setStore({ tutorData: { ...store.tutorData, children: newChildren } });
			},

			getTutorData: async () => {
				const store = getStore();
				const username = localStorage.getItem("username");
				const token = localStorage.getItem("token");
			
				if (!username || username === "") {
					console.error("No se encuentra el nombre de usuario en el localStorage");
					return;
				}
			
				try {
					const params = new URLSearchParams({
						"username": username,
					});
			
					const res = await fetch(`${process.env.BACKEND_URL}/api/signup/tutor?${params.toString()}`, {
						headers: {
							Authorization: `Bearer ${token}`

						},
					});
			
					if (!res.ok) {
						console.error(`Error en la solicitud: ${res.status}`);
						return;
					}
			
					const data = await res.json();
					setStore({ tutorData: data });
					console.log("Tutor recuperado OK del back, esta es la info: ", tutorData)
					return data;
				} catch (error) {
					console.error("Error al intentar recuperar los datos del Tutor:", error);
					return {
					  is_tutor: false,
					  children: [],
					};
				}
			},

			//******************************************SECCIÓN EVENTOS************************************************ */
			createEvent: async (email, eventData, token) => {
				const store = getStore();
				try {
					let user = {
						"username": email};
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
							Authorization: `Bearer ${store.token}`
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
						done: false,
						
					});
			  
				  const eventsResp = await fetch(`${process.env.BACKEND_URL}/api/event/all?${params.toString()}`);
			  
				  const eventsDataResp = await eventsResp.json();
				  
				  const store = getStore();
				  const events = [...eventsDataResp.msg]; 
				  setStore({ events });
				  console.log("Info almacenada de los eventos:", events);
			  
				} catch (error) {
				  console.error("Error al obtener los eventos:", error);
				}
			},

			//PARA SELECCIONAR UN EVENTO ESPECÍFICO AL HACER CLIC EN CARD DESEADA:			
			selectEvent: (event) => {
				console.log("Event received in selectEvent:", event);
				setStore({ ...getStore(), selectedEvent: event, });
			},

			//PARA FILTRAR EVENTOS POR CATEGORÍA (AGREGAR EN EL ONCLICK AL CAROUSEL Y EN LA VISTA DE LAS CARDS RENDERIZAR EVENTOS DE FILTERED EVENTS)
			filterEventsByCategory: (selectedCategory) => {
				const store = getStore();
				const events_filtered = store.events.filter(event => event.category === selectedCategory);
				setStore({ events_filtered: events_filtered });
			},
			
			//PARA FILTRAR EVENTOS POR BÙSQUEDA MEDIANTE STRING:
			filterEventsByKeyword: (keyword) => {
				const store = getStore();
				const events_filtered = store.events.filter(event => 
					event.name.toLowerCase().includes(keyword.toLowerCase()) ||
					event.description.toLowerCase().includes(keyword.toLowerCase())
				);
				setStore({ events_filtered: events_filtered });
			},
			
			//**********************************************SECCIÓN ANUNCIANTE************************************************ */	
			
			createAdvertiser: async (email, advertiserData) => {
				const store = getStore();
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
							"Content-type": "application/json",
							Authorization: `Bearer ${store.token}`
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

			//*************************************************SECCIÓN PARTICIPANTES*******************************************/

			setSelectedChildren: (selectedChildren) => {
				const store = getStore();
				setStore({
				  ...store,
				  selectedChildren: selectedChildren,
				});
			},
			  
			handleParticipantRegister: () => {
				const store = getStore();
				const token = localStorage.getItem("token");
			  
				if (!token || token === "" || token === "undefined") {
				  return <Modal_login_signup />;
				}
			  
				const userData = getActions().getUserData();
			  
				if (userData.is_tutor && userData.children.length !== 0) {
				  <Child_Selection_Modal/>
				}
			},
			  
			handleChildSelectionSubmit: async (selectedChildren) => {
				const store = getStore();
				const token = localStorage.getItem("token");
				const eventId = store.selectedEvent.id;

				console.log("Niños seleccionados:", selectedChildren);
				onHide();
				try {
					for (const child of selectedChildren) {
						const response = await fetch("/api/event/participant", {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${store.token}`
							},
							body: JSON.stringify({
								event_id: eventId,
								child_id: child.id,
								was_there: false,
								score_given: 0
							})
						});

						if (response.ok) {
							const data = await response.json();
							console.log(`Inscripción correcta de ${data.participant_added} al evento ${data.event}`);
						} else {
							console.error("Error al inscribir el niño en el evento");
						}
					}
				} catch (error) {
					console.error("Error al inscribir los niños en el evento:", error);
				}
			},
		}
	};
};

export default getState;