import { Component } from "react";
import SwapiService from "../../services/swapi-service";
import DummyService from "../../services/dummy-service";
import ErrorBoundry from "../error-boundry";
import Header from "../header";
import RandomPlanet from "../random-planet/random-planet";
import { SwapiServiceProvider } from "../swapi-service-context";
import PeoplePage from "../pages/people-page";
import PlanetPage from "../pages/planets-page";
import StarshipPage from "../pages/starships-page";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./app.css";
import { StarshipDetails } from "../sw-components";

export default class App extends Component {
	state = {
		swapiService: new SwapiService(),
	};

	onServiceChange = () => {
		this.setState(({ swapiService }) => {
			const Service = swapiService instanceof SwapiService ? DummyService : SwapiService;
			return {
				swapiService: new Service(),
			};
		});
	};

	componentDidCatch() {
		this.setState({ errorCatched: true });
	}

	render() {
		const { swapiService } = this.state;
		return (
			<div className="swdb-app">
				<ErrorBoundry>
					<SwapiServiceProvider value={swapiService}>
						<Router>
							<Header onServiceChange={this.onServiceChange} />
							<RandomPlanet />
							<Route
								path="/"
								render={() => (
									<h2 className="text-center">Welcome to Star Wars DB</h2>
								)}
								exact
							/>
							<Route path="/people" component={PeoplePage} />
							<Route path="/planets" component={PlanetPage} />
							<Route path="/starships/" component={StarshipPage} exact />
							<Route
								path="/starships/:id"
								render={({ match }) => {
									const { id } = match.params;
									return <StarshipDetails itemId={id} />;
								}}
							/>
						</Router>
					</SwapiServiceProvider>
				</ErrorBoundry>
			</div>
		);
	}
}
