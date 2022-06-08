import { Component, Fragment } from "react";
import PropTypes from "prop-types";
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator";
import "./random-planet.css";

const MIN_ID = 2;
const MAX_ID = 19;

export default class RandomPlanet extends Component {
	static defaultProps = {
		updateInterval: 2500,
	};

	static propTypes = {
		updateInterval: PropTypes.number,
	};

	swapiService = new SwapiService();

	state = {
		planet: {},
		loading: true,
		error: false,
	};

	componentDidMount() {
		const { updateInterval } = this.props;
		this.updatePlanet();
		this.interval = setInterval(this.updatePlanet, updateInterval);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	onError = (err) => {
		this.setState({ error: true });
	};

	onPlanetLoad = (planet) => {
		this.setState({ planet, loading: false });
	};

	currentId = MIN_ID;
	updatePlanet = () => {
		if (this.currentId > MAX_ID) {
			this.currentId = MIN_ID;
		}
		const id = this.currentId++;
		this.swapiService.getPlanet(id).then(this.onPlanetLoad).catch(this.onError);
	};

	render() {
		const { loading, planet, error } = this.state;
		const content = loading ? <Spinner /> : <PlanetView planet={planet} />;
		return (
			<div className="random-planet jumbotron rounded">
				{error ? <ErrorIndicator /> : content}
			</div>
		);
	}
}

const PlanetView = ({ planet }) => {
	const { id, name, population, rotationPerion, diameter } = planet;
	return (
		<Fragment>
			<img
				className="planet-image"
				src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
				alt={name}
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
