import { join } from "path";
import { Menu } from "src/menu/entities/menu.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    tableNumber: number;

    @ManyToMany(()=> Menu)
    @JoinTable()
    items: Menu[];
}