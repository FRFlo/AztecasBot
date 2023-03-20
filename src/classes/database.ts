import { Role } from "discord.js";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "guilds" })
export class Guild {
    @PrimaryColumn()
    id: string;

    @Column()
    adminRoles: Role[];

    @Column()
    memberRoles: Role[];
}