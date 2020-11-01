import {getRepository} from "typeorm";
import Orphanage from "../models/Orphanage";
import Property from "../models/Property";
import {Request, Response} from "express";
import orphanageView from '../views/orphanages_view';
import propertiesView from '../views/properties_view';
import * as Yup from 'yup';

export default {

    async getById(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);
        const orphanage = await orphanagesRepository.findOneOrFail(request.params.id, {
            relations: ['images']
        });
        return response.json(orphanageView.render(orphanage));
    },

    async index(request: Request, response: Response) {
        const propertyRepository = getRepository(Property);
        const properties = await propertyRepository.find({
            relations: ['images', 'property_prices'],
        });
        return response.json(propertiesView.renderMany(properties));
    },

    async create(request: Request, response: Response) {
        const {
            type,
            category,
            description,
            cep,
            address,
            number,
            city,
            state,
            latitude,
            longitude,
        } = request.body;

        const propertyRepository = getRepository(Property);

        // Upload multiple files
        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return {path: image.filename}
        });

        const property_prices = [
            {
                real_state: 1,
                link: 'www.google.com',
                price: 150.00
            }, {
                real_state: 2,
                link: 'www.gmail.com',
                price: 500.00
            }
        ];

        const data = {
            type,
            category,
            description,
            cep,
            address,
            number,
            city,
            state,
            latitude,
            longitude,
            images,
            property_prices
        };

        console.log(data);

        // Validation with Yup
        const schema = Yup.object().shape({
            type: Yup.string().required(),
            category: Yup.string().required(),
            description: Yup.string().required(),
            cep: Yup.string().required(),
            address: Yup.string().required(),
            number: Yup.string().required(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required(),
                })),
        });
        await schema.validate(data, {abortEarly: false})

        const property = propertyRepository.create(data);
        await propertyRepository.save(property);

        return response.status(201).json(property);
    }
}