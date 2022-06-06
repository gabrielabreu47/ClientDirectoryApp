import axiosInstance from "./axios.instance";
import { loadAbort } from "../helpers";

export const getClients = ({ take = 15, skip = 0 }) => {
	const controller = loadAbort();
	const call = axiosInstance.get("/Client", {
		params: {
			take,
			skip,
		},
		signal: controller.signal,
	});
	return { call, controller };
};

export const getClientDetails = ({ id }) => {
	const controller = loadAbort();
	const call = axiosInstance.get(`/Client/${id}`, {
		signal: controller.signal,
	});
	return { call, controller };
};

export const createClient = ({ clientData }) => {
	const controller = loadAbort();
	const call = axiosInstance.post("/Client", clientData);
	return { call, controller };
};

export const editClient = ({ clientData }) => {
	const controller = loadAbort();
	const call = axiosInstance.put("/Client", clientData);
	return { call, controller };
};

export const deleteClient = ({ id }) => {
	const controller = loadAbort();
	const call = axiosInstance.delete(`/Client/${id}`, {
		signal: controller.signal,
	});
	return { call, controller };
};

export default {
	getClients,
	getClientDetails,
};
