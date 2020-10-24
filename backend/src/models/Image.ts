import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import Orphanage from './Orphanage';
import RealState from './RealState';

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
}