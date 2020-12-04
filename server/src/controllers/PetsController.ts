import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from 'yup';

import petsView from '../views/pets_view';
import Pet from "../models/Pet";

export default {
  async index(request: Request, response: Response) {
    const petsRepository = getRepository(Pet);
  
    const pets = await petsRepository.find({
      relations: ['images']
    });
  
    return response.json(petsView.renderMany(pets));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const petsRepository = getRepository(Pet);

    const pet = await petsRepository.findOneOrFail(id, {
      relations: ['images']
    });
  
    return response.json(petsView.render(pet));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
    } = request.body;

    const petsRepository = getRepository(Pet);
    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return {
        path: image.filename,
      }
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ).required().min(1),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const pet = petsRepository.create(data);
  
    await petsRepository.save(pet);
  
    return response.status(201)
      .json(petsView.render(pet));
  }
}