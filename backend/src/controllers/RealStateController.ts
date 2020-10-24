import {getRepository} from "typeorm";
import Orphanage from "../models/Orphanage";
import RealState from "../models/RealState";
import {Request, Response} from "express";
import orphanageView from '../views/orphanages_view';
import realStatesView from '../views/real_states_view';
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
        const realStateRepository = getRepository(RealState);
        const realStates = await realStateRepository.find({
            relations: ['images']
        });
        return response.json(realStatesView.renderMany(realStates));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            cnpj,
            creci,
            email,
            url,
            cep,
            address,
            number,
            city,
            state,
            latitude,
            longitude,
        } = request.body;

        const realStateRepository = getRepository(RealState);

        // Upload multiple files
        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return {path: image.filename}
        });

        const data = {
            name,
            cnpj,
            creci,
            email,
            url,
            cep,
            address,
            number,
            city,
            state,
            latitude,
            longitude,
            images,
        };

        // Validation with Yup
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            cnpj: Yup.string().required(),
            creci: Yup.string().required(),
            email: Yup.string().required(),
            url: Yup.string().required(),
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

        const realState = realStateRepository.create(data);
        await realStateRepository.save(realState);

        return response.status(201).json(realState);
    }
}