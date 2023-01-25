import IV from "../utility/InputValidator.js";

const ResourceFunction = {};

ResourceFunction.toString = (resourceData) => {
  IV.validateNotNil("resourceData", resourceData);

  return resourceData.name;
};

export default ResourceFunction;
