import { Children, cloneElement, Component } from "react";
import Spinner from "../spinner/spinner";
import "./item-details.css";

const Record = ({ item, field, label }) => {
	return (
		<li className="list-group-item">
			<span className="term">{label}</span>
			<span>{item[field]}</span>
		</li>
	);
};

export { Record };

export default class ItemDetails extends Component {
	state = {
		item: null,
		loading: false,
		image: null,
	};

	componentDidMount() {
		this.updateItem();
	}

	componentDidUpdate(prevProps) {
		if (
			this.props.itemId !== prevProps.itemId ||
			this.props.getData !== prevProps.getData ||
			this.props.getImageUrl !== prevProps.getImageUrl
		) {
			this.updateItem();
		}
	}

	updateItem() {
		const { itemId, getData, getImageUrl } = this.props;
		if (!itemId) {
			return;
		}
		this.setState({ loading: true });
		getData(itemId).then((item) =>
			this.setState({ item, loading: false, image: getImageUrl(item) })
		);
	}

	render() {
		const { item, loading, image } = this.state;
		if (!item) {
			return <span>Select an item from a list</span>;
		}
		if (loading) {
			return <Spinner />;
		}
		const { name } = item;
		return (
			<div className="person-details card">
				<img className="person-image" src={image} alt={name} />
				<div className="card-body">
					<h4>{name}</h4>
					<ul className="list-group list-group-flush">
						{Children.map(this.props.children, (child) => {
							return cloneElement(child, { item });
						})}
					</ul>
				</div>
			</div>
		);
	}
}
