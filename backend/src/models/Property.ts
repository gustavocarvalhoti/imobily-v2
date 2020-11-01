import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import Image from "./Image";
import PropertyPrice from "./PropertyPrice";

@Entity('properties')
export default class Property {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    type: string;

    @Column()
    category: string;

    @Column()
    description: string;

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

    @OneToMany(() => Image, image => image.property, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'property_id'})
    images: Image[];

    @OneToMany(() => PropertyPrice, propertyPrice => propertyPrice.property, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'property_price_id'})
    property_prices: PropertyPrice[];
}