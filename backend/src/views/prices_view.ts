import PropertyPrice from '../models/PropertyPrice';

export default {
    render(property: PropertyPrice) {
        return {
            id: property.id,
        };
    },

    renderMany(propertyPrices: PropertyPrice[]) {
        return propertyPrices;
    }
};