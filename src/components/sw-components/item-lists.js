import SwapiService from "../../services/swapi-service";
import { withData } from "../hoc-helpers";
import ItemList from "../item-list";

const { getAllPeople, getAllPlanets, getAllStarships } = new SwapiService();

const withChildFunction = (WrappedComponent, func) => {
	return (props) => {
		return <WrappedComponent {...props}>{func}</WrappedComponent>;
	};
};

const renderName = ({ name }) => <span>{name}</span>;
const renderModelAndName = ({ name, model }) => (
	<span>
		{name} ({model})
	</span>
);

const PersonList = withData(withChildFunction(ItemList, renderName), getAllPeople);
const PlanetList = withData(withChildFunction(ItemList, renderName), getAllPlanets);
const StarshipList = withData(withChildFunction(ItemList, renderModelAndName), getAllStarships);

export { PersonList, PlanetList, StarshipList };
