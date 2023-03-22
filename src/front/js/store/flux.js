const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			username: null,
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

			addChild: (childData) => {
				const store = getStore();
				const newChildren = [...store.tutorData.children, childData];
				setStore({ tutorData: { ...store.tutorData, children: newChildren } });
			},


			//Para sincronizar el token almacenado en el almacenamiento local (localStorage) con el estado de la aplicación (setStore)
			syncToken: () => {
				const token = localStorage.getItem("token");
				console.log("App just loaded, synching the local storage");
				if (token && token != "" && token != undefined) setStore({ token: token }); // Si el token existe y no está vacío ni es undefined, actualiza el estado de la aplicación con el token obtenido del almacenamiento local.

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
						
						/*if (setShowTutorForm) {
							console.log("*****PRUEBA*****")
							actions.createTutor(email, tutorData, token)*/
							/*let user = {"username": email}
							let userTutor = Object.assign({}, user, tutorData)
							console.log(userTutor)
							const tutorRequestOptions = {
								method: "POST",
								headers: {
									"Content-type": "application/json"
								},
								body: JSON.stringify(userTutor)
							};
				
							const tutorResp = await fetch(process.env.BACKEND_URL + "/api/signup/tutor", tutorRequestOptions)
							const tutorDataResp = await tutorResp.json();
							console.log("Tutor data:", tutorDataResp);*/
				
							/*if (tutorResp.status === 200 && tutorData.children.length > 0) {
								const childRequestOptions = {
									method: "POST",
									headers: {
										"Content-type": "application/json"
									},
									body: JSON.stringify(tutorData.children)
								};
								const childResp = await fetch(process.env.BACKEND_URL + "/api/signup/tutor/child", childRequestOptions)
								const childDataResp = await childResp.json();
								console.log("Child data:", childDataResp);
							}
						}
				
						if (setShowAdvertiserForm === true) {
							const advertiserRequestOptions = {
								method: "POST",
								headers: {
									"Content-type": "application/json"
								},
								body: JSON.stringify(advertiserData)
							};
				
							const advertiserResp = await fetch(process.env.BACKEND_URL + "/api/signup/advertiser", advertiserRequestOptions)
							const advertiserDataResp = await advertiserResp.json();
							console.log("Advertiser data:", advertiserDataResp);
						}*/
					
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

			
			createTutor: async (email, tutorData, token) => {
				console.log("**************", email, tutorData, "**********")
				try {
					let user = {"username": email}
					let userTutor = Object.assign({}, user, tutorData)
					console.log(userTutor)
					const tutorRequestOptions = {
						method: "POST",
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

			modifyTutor: async (email, tutorData, token) => {
				console.log("$$$$$$", email, tutorData, "$$$$$$")
				try {
					let user = {"username": email}
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

			createAdvertiser: async (advertiserData, token) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/signup/advertiser", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`,
						},
						body: JSON.stringify(advertiserData),
					});
					if (response.ok) {
						console.log("RESPONSE RECIBIDA EN FRONT para Anunciante: OK)");
					} else {
						throw new Error("Error al crear anunciante");
					}
				} catch (error) {
					console.error("Error al crear anunciante:", error);
				}
			},

		}
	};
};

export default getState;



/* PRUEBA PARA CONEXION CON API:

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
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

			handleChange: (e, formType) => {
				const store = getStore();
				setStore({ [formType]: { ...store[formType], [e.target.name]: e.target.value } });
			},

			handleSignup: async (e) => {
				e.preventDefault();
				const store = getStore();

				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(store.signup)
					});

					const data = await response.json();
					if (response.ok) {
						alert("Usuario registrado exitosamente!");
					} else {
						alert(data.msg);
					}
				} catch (error) {
					console.log("Error al registrar usuario:", error);
				}
			},

			handleLogin: async (e) => {
				e.preventDefault();
				const store = getStore();

				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(store.login)
					});

					const data = await response.json();
					if (response.ok) {
						sessionStorage.setItem("access_token", data.access_token);
						alert("Inicio de sesión exitoso!");
					} else {
						alert(data.msg);
					}
				} catch (error) {
					console.log("Error al iniciar sesión:", error);
				}
			}
		}
	};
};

export default getState;
*/