const compose =
	(...wrappers) =>
	(component) => {
		return wrappers.reduceRight((prevResult, wrapper) => wrapper(prevResult), component);
	};

export default compose;
