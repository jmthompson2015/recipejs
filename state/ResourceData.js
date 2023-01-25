import IV from "../utility/InputValidator.js";

const ResourceData = {};

ResourceData.create = ({
  imageUrl,
  key,
  name,
  value = 0,
  clientProps = {},
}) => {
  IV.validateIsString("name", name);
  const myKey = key || name;

  return Immutable({
    imageUrl,
    key: myKey,
    name,
    value,
    clientProps,
  });
};

Object.freeze(ResourceData);

export default ResourceData;
