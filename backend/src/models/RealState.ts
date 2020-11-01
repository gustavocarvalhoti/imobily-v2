import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import Image from "./Image";
import Properties from "./Property";

@Entity('real_states')
export default class RealState {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    cnpj: string;

    @Column()
    creci: string;

    @Column()
    email: string;

    @Column()
    url: string;

    @Column()
    cep: string;

    @Column()
    address: string;

    @Column()
    number: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @OneToMany(() => Image, image => image.real_state, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'real_state_id'})
    images: Image[];

    @ManyToOne(() => Properties, Properties => Properties.images)
    @JoinColumn({name: 'property_id'})
    properties: Properties;
}