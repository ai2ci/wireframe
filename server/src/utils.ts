import https, { RequestOptions } from "https";

export async function loadHttpsData(requestOptions: RequestOptions) {
	let status: number = 500;
	const data: object & { statusCode: number } = await new Promise(
		(resolve, reject) => {
			const request = https.get(requestOptions, (response) => {
				response.setEncoding("utf8");
				let bodyStream = "";

				if (response.statusCode) {
					status = response.statusCode;
				}

				response.on("data", (chunk) => {
					bodyStream += chunk;
				});
				response.on("end", () => {
					resolve(JSON.parse(bodyStream));
				});
			});

			request.on("error", (error) => {
				reject(error);
			});
		}
	);

	data.statusCode = status;

	return data;
}
