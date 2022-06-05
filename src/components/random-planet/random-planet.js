import { Component } from "react";
import "./random-planet.css";
import SwapiService from "../../services/swapi-service";

export default class RandomPlanet extends Component {
	swapiService = new SwapiService();

	state = {
		planet: {},
	};

	constructor() {
		super();
		this.updatePlanet();
	}

	onPlanetLoad = (planet) => {
		this.setState({ planet });
	};

	updatePlanet() {
		const id = Math.floor(Math.random() * 15 + 2);
		this.swapiService.getPlanet(id).then(this.onPlanetLoad);
	}

	render() {
		const {
			planet: { id, name, population, rotationPerion, diameter },
		} = this.state;
		return (
			<div className="random-planet jumbotron rounded">
				<img
					className="planet-image"
					src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
					alt="Planet Image"
				/>
				<div>
					<h4>{name}</h4>
					<ul className="list-group list-group-flush">
						<li className="list-group-item">
							<span className="term">Population</span>
							<span>{population}</span>
						</li>
						<li className="list-group-item">
							<span className="term">Rotation Period</span>
							<span>{rotationPerion}</span>
						</li>
						<li className="list-group-item">
							<span className="term">Diameter</span>
							<span>{diameter}</span>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}
