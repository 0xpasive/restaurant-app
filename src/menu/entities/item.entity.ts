
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()

export class Item {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({length: 100})
    name: string;

    @Column("decimal")
    price: number;

}