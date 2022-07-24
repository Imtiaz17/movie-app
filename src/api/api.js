const mainUrl = "https://api.themoviedb.org/3/";
const apiKey = "4354aae341acb8c062cc3d7968ffbd6c";
const apiKeyUrl = `?api_key=${apiKey}`;

export default {
	async fetchData(searchPath, additionalParams = "") {
		const url = `${mainUrl}${searchPath}${apiKeyUrl}${additionalParams}`;
		const reponse = await fetch(url);
		const data = await reponse.json();
		return data.results;
	},
	async fetchDetailData(mediaType, mediaId) {
		const url = `${mainUrl}${mediaType}/${mediaId}${apiKeyUrl}&append_to_response=credits`;
		const response = await fetch(url);
		const data = await response.json();
		return data;
	},
};
