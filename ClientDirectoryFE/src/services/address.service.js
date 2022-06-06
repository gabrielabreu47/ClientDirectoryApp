import axiosInstance from "./axios.instance";
import { loadAbort } from "../helpers";

export const getAddressOfClient = ({ take = 15, skip = 0, clientId }) => {
	const controller = loadAbort();
	const call = axiosInstance.get(`/Address/Client/${clientId}`, {
		params: {
			take,
			skip,
		},
		signal: controller.signal,
	});
	return { call, controller };
};

export const getAddress = ({ id }) => {
	const controller = loadAbort();
	const call = axiosInstance.get(`/Address/${id}`, {
		signal: controller.signal,
	});
	return { call, controller };
};

export const createAddress = ({ addressData }) => {
	const controller = loadAbort();
	const call = axiosInstance.post("/Address", addressData);
	return { call, controller };
};

export const editAddress = ({ addressData }) => {
	const controller = loadAbort();
	const call = axiosInstance.put("/Address", addressData);
	return { call, controller };
};

export const deleteAddress = ({ id }) => {
	const controller = loadAbort();
	const call = axiosInstance.delete(`/Address/${id}`, {
		signal: controller.signal,
	});
	return { call, controller };
};

export const getCountries = () => {
	const controller = loadAbort();
	const call = axiosInstance.get("/Country", {
		signal: controller.signal,
	});
	return { call, controller };
};

export const getStates = ({ countryId }) => {
	const controller = loadAbort();
	const call = axiosInstance.get(`/State/Country/${countryId}`, {
		signal: controller.signal,
	});
	return { call, controller };
};

export const getCities = ({ stateId }) => {
	const controller = loadAbort();
	const call = axiosInstance.get(`/City/State/${stateId}`, {
		signal: controller.signal,
	});
	return { call, controller };
};

export default {
	getAddressOfClient,
};
