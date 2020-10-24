import RealState from '../models/RealState'
import ImagesView from './images_view'

export default {
    render(orphanage: RealState) {
        return {
            id: orphanage.id,
            name: orphanage.name,
            cnpj: orphanage.cnpj,
            creci: orphanage.creci,
            email: orphanage.email,
            url: orphanage.url,
            cep: orphanage.cep,
            address: orphanage.address,
            number: orphanage.number,
            city: orphanage.city,
            state: orphanage.state,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            images: ImagesView.renderMany(orphanage.images)
        };
    },

    renderMany(orphanages: RealState[]) {
        return orphanages.map(orphanage => this.render(orphanage));
    }
};