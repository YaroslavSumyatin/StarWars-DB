export default class SwapiService {
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
		return response.results.map(this._transformPerson);
	}

	async getPerson(id) {
		const person = await this.getResource(`/people/${id}/`);
		return this._transformPerson(person);
	}

	async getAllPlanets() {
		const response = await this.getResource(`/planets/`);
		return response.results.map(this._transformPlanet);
	}

	async getPlanet(id) {
		const planet = await this.getResource(`/planets/${id}/`);
		return this._transformPlanet(planet);
	}

	async getAllStarships() {
		const response = await this.getResource(`/starships/`);
		return response.results.map(this._transformStarship);
	}

	async getStarship(id) {
		const starship = await this.getResource(`/starships/${id}/`);
		return this._transformStarship(starship);
	}

	_extractId(item) {
		const idRegExp = /\/([0-9]*)\/$/;
		return item.url.match(idRegExp)[1];
	}

	_transformPlanet(planet) {
		return {
			id: this._extractId(planet),
			name: planet.name,
			population: planet.population,
			rotationPerion: planet.rotation_period,
			diameter: planet.diameter,
		};
	}

	_transformStarship(starship) {
		return {
			id: this._extractId(starship),
			name: starship.name,
			model: starship.model,
			manufacturer: starship.manufacturer,
			costInCredits: starship.cost_in_credits,
			length: starship.length,
			crew: starship.crew,
			passengers: starship.passengers,
			cargoCapacity: starship.cargo_capacity,
		};
	}

	_transformPerson(person) {
		return {
			id: this._extractId(person),
			name: person.name,
			gender: person.gender,
			birthYear: person.birth_year,
			eyeColor: person.eye_color,
		};
	}
}