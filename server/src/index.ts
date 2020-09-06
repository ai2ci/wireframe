import express, { request } from "express";
import bodyParser from "body-parser";
import path from "path";
import { URLSearchParams } from "url";
import https, { RequestOptions } from "https";
import Base64 from "base-64";
import { loadHttpsData } from "./utils";

const app = express();
const { env } = process;
const port = env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Authorization = `Basic ` + Base64.encode(`${env.USER}:${env.API_KEY}`);

const requestOptions: RequestOptions = {
	hostname: env.API_HOST,
	method: "get",
	headers: {
		"X-Instance-Name": env.API_INSTANCE_NAME,
		Authorization,
	},
};

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
});

app.get("/main.js", (req, res) => {
	res.sendFile(path.join(__dirname, "../../client/dist", "main.js"));
});

app.get("/api/company/", async (req, res) => {
	const params = new URLSearchParams({
		fulltext: `${req.query.fulltext?.toString()}`,
		offset: "0",
		limit: "20",
	});

	const data = await loadHttpsData({
		...requestOptions,
		path: `/api/v2/company/?${params.toString()}`,
	});

	res.status(data.statusCode);
	res.send(data);
	res.end();
});

app.get("/api/companyCategory/", async (req, res) => {
	const data = await loadHttpsData({
		...requestOptions,
		path: "/api/v2/companyCategory/",
	});

	res.status(data.statusCode);
	res.send(data);
	res.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
