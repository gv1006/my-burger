export const updateObject = (obj, updatedProperties) => {
    return {
        ...obj,
        ...updatedProperties
    };
};