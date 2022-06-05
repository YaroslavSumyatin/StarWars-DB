class SwapiService {
	_apiBase = "https://swapi.dev/api";

	async getResource(url) {
		const resource = await fetch(`${this._apiBase}${url}`);
		if (!resource.ok) {
			throw new Error(
				`Could not fetch ${url}. Received ${resource.status} code.`
			);
		}
		return await resource.json();
	}

	async getAllPeople() {
		const response = await this.getResource(`/people/`);
		return response.results;
	}

	getPerson(id) {
		return this.getResource(`/people/${id}/`);
	}

	async getAllPlanets() {
		const response = await this.getResource(`/planets/`);
		return response.results;
	}

	getPlanet(id) {
		return this.getResource(`/planets/${id}/`);
	}

	async getAllStarships() {
		const response = await this.getResource(`/starships/`);
		return response.results;
	}

	getStarship(id) {
		return this.getResource(`/starships/${id}/`);
	}
}

const swapi = new SwapiService();
swapi.getStarship(1).then((person) => {
	console.log(person.name);
});
