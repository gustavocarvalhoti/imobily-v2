import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import Orphanage from './Orphanage';
import RealState from './RealState';
import Property from './Property';

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Orphanage, orphanage => orphanage.images)
    @JoinColumn({name: 'orphanage_id'})
    orphanage: Orphanage;

    @ManyToOne(() => RealState, realState => realState.images)
    @JoinColumn({name: 'real_state_id'})
    real_state: RealState;

    @ManyToOne(() => Property, property => property.images)
    @JoinColumn({name: 'property_id'})
    property: Property;
}