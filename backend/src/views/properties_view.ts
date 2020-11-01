import Property from '../models/Property';
import ImagesView from './images_view';
import PricesView from './prices_view';

export default {
    render(property: Property) {

        console.log(property);

        return {
            id: property.id,
            category: property.category,
            description: property.description,
            cep: property.cep,
            address: property.address,
            number: property.number,
            city: property.city,
            state: property.state,
            latitude: property.latitude,
            longitude: property.longitude,
            images: ImagesView.renderMany(property.images),
            property_prices: PricesView.renderMany(property.property_prices),
        };
    },

    renderMany(orphanages: Property[]) {
        return orphanages.map(orphanage => this.render(orphanage));
    }
};