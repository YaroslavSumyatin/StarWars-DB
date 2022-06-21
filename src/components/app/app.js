import { Component } from "react";
import SwapiService from "../../services/swapi-service";
import DummyService from "../../services/dummy-service";
import ErrorBoundry from "../error-boundry";
import Header from "../header";
import RandomPlanet from "../random-planet/random-planet";
import { SwapiServiceProvider } from "../swapi-service-context";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { StarshipDetails } from "../sw-components";
import { PeoplePage, PlanetPage, StarshipPage, LoginPage, SecretPage } from "../pages";
import "./app.css";

export default class App extends Component {
	state = {
		swapiService: new SwapiService(),
		isLoggedIn: false,
	};

	onLogin = () => {
		this.setState({ isLoggedIn: true });
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
		const { swapiService, isLoggedIn } = this.state;
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
							<Route path="/people/:id?" component={PeoplePage} />
							<Route path="/planets/" component={PlanetPage} />
							<Route path="/starships/" component={StarshipPage} exact />
							<Route
								path="/starships/:id"
								render={({ match }) => {
									const { id } = match.params;
									return <StarshipDetails itemId={id} />;
								}}
							/>
							<Route
								path="/login"
								render={() => (
									<LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin} />
								)}
							/>
							<Route
								path="/secret"
								render={() => <SecretPage isLoggedIn={isLoggedIn} />}
							/>
						</Router>
					</SwapiServiceProvider>
				</ErrorBoundry>
			</div>
		);
	}
}
