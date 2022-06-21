import { Redirect } from "react-router-dom";

const SecretPage = ({ isLoggedIn }) => {
	if (isLoggedIn) {
		return (
			<div className="jumbotron text-center">
				<h3>Secrete Page!!!</h3>
			</div>
		);
	}

	return <Redirect to="/login" />;
};

export default SecretPage;
