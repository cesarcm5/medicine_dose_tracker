import { toast } from "react-hot-toast";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: "Hello World",
			token: localStorage.getItem("token") || null,
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
			users: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getUsers: async () => {
				const response = await fetch(process.env.BACKEND_URL + "api/users", {
					method: 'GET'
				});
				const data = await response.json()
				console.log("usuarios:", data)
				setStore({ users: data })
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
			signIn: async (first_name, last_name, email, password) => {
				console.log(email)
				const resp = await fetch(process.env.BACKEND_URL + "api/signin", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						first_name: first_name,
						last_name: last_name,
						email: email,
						password: password
					})
				})
				const data = await resp.json()

				localStorage.setItem("token", data.token)

				setStore({ user: data.user });
				setStore({ token: data.token });


				if (resp.ok) {
					toast.success("Your usser has been logged");
					toast("We've login for you",
						{
							duration: 5000,
						}
					);
				}
				else {
					toast.error("Signup error");
				}
			},
			logIn: async (email, password) => {
				const resp = await fetch(process.env.BACKEND_URL + "api/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				})
				const data = await resp.json()

				if (resp.ok) {
					localStorage.setItem("token", data.token)
					setStore({ token: data.token });
					toast.success("Your usser has been logged");
					toast("We've login for you",
						{
							duration: 5000,
						}
					);
				} else {
					toast.error("Login error");
				}
			},
			logout: () => {
				localStorage.removeItem("token");
				setStore({ token: null });
				toast.success("Your usser has been logout");
				toast("We've logout for you",
					{
						duration: 5000,
					}
				);
			},
		}
	};
};

export default getState;
