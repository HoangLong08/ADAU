import axios from "axios";
import authHeaderAdmin from "../services/auth-headers-admin";
import { notification } from "antd";
import { URL } from "../constants/app";

const openNotificationWithIcon = (type, notify) => {
	notification[type]({
		message: '',
		description: notify,
		duration: 30
	});
};

export async function uploadImage(file, info, uploadHandler) {

	const formData = new FormData();
	formData.append("file", file);
	console.log("formData fuction: ", formData);
	try {
		const response = await axios({
			method: "POST",
			url: URL + "upload-image",
			headers: authHeaderAdmin(),
			data: formData,
		});
		console.log("response: ", response.data.image);
		if (response.status === 200 || response.status === 201) {
			uploadHandler({
				result: [
					{
						url: response.data.image,
						// name: response.data.image,
						// size: image.size,
					},
				],
			});
		}
	} catch (error) {
		openNotificationWithIcon('error', error.response?.data?.msg)
		uploadHandler({
			errorMessage: "Kích thước ảnh tối đa 1MB",
			result: []
		})
	}
	// }



}

