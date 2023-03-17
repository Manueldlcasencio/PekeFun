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
			],

			tutorData: {
				firstName: "",
				lastName: "",
				birthDate: "",
				city: "",
				children: []
			  }
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

			createTutor: (tutorData) => {
				setStore({ tutorData: { ...getStore().tutorData, ...tutorData } });
			},
		
			addChild: (childData) => {
				const store = getStore();
				const newChildren = [...store.tutorData.children, childData];
				setStore({ tutorData: { ...store.tutorData, children: newChildren } });
			  }

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