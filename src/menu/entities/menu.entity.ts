
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()

export class Menu {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({length: 100})
    name: string;

    @Column("decimal")
    price: number;

}