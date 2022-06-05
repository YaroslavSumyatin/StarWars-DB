import { Component, Fragment } from "react";
import "./random-planet.css";
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/spinner";

const MIN_ID = 2;
const MAX_ID = 19;

export default class RandomPlanet extends Component {
	swapiService = new SwapiService();

	state = {
		planet: {},
		loading: true,
	};

	constructor() {
		super();
		this.updatePlanet();
	}

	onPlanetLoad = (planet) => {
		this.setState({ planet, loading: false });
	};

	updatePlanet() {
		const id = Math.floor(Math.random() * (MAX_ID - MIN_ID + 1) + MIN_ID);
		this.swapiService.getPlanet(id).then(this.onPlanetLoad);
	}

	render() {
		const { loading, planet } = this.state;
		const content = loading ? <Spinner /> : <PlanetView planet={planet} />;
		return <div className="random-planet jumbotron rounded">{content}</div>;
	}
}

const PlanetView = ({ planet }) => {
	const { id, name, population, rotationPerion, diameter } = planet;
	return (
		<Fragment>
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
		</Fragment>
	);
};
