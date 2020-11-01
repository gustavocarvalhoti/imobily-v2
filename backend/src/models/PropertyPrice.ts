import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import Property from "./Property";

@Entity('property_prices')
export default class PropertyPrices {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    real_state: number;

    @Column()
    link: string;

    @Column()
    price: number;

    @ManyToOne(() => Property, property => property.property_prices)
    @JoinColumn({name: 'property_price_id'})
    property: Property;
}