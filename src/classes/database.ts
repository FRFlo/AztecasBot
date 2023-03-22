import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "members" })
export class Member {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column({ nullable: true })
    idCard: string;
}