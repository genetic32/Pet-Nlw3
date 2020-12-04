import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import Image from './Image';

@Entity('pets')
export default class Pet {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @OneToMany(() => Image, image => image.pet, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'pet_id' })
  images: Image[];
}