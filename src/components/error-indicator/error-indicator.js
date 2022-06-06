import "./error-indicator.css";
import errorIcon from "./death-star.png";

const ErrorIndicator = () => {
	return (
		<div className="error-indicator">
			<img src={errorIcon} alt="Error Image" />
			<span className="boom">BOOM!</span>
			<span>something has gone terribly wrong</span>
			<span>(but we already sent droids to fix it)</span>
		</div>
	);
};

export default ErrorIndicator;
