import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey } from 'sequelize-typescript'
import User from './User.model';

@Table({
    tableName: 'pets'
})

class Pet extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER()
    })
    declare id: number

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER(),
         allowNull: false
    })
    declare user_id: number

    @BelongsTo(() => User, {
        onDelete: 'CASCADE'
    })
    declare user: User; // relacción acceder a User

    @Column({
        type: DataType.STRING(),
         allowNull: false
    })
    declare name: string

    @Column({
        type: DataType.STRING(),
         allowNull: false
    })
    declare breed: string

    @Column({
        type: DataType.STRING(),
         allowNull: false
    })
    declare gender: string

    @Column({
        type: DataType.DECIMAL(),
         allowNull: false
    })
    declare weight: number

    @Column({
        type: DataType.DATEONLY(),
         allowNull: false
    })
    declare birthday: Date   

    @Column({
        type: DataType.TEXT()
    })
    declare photo: string
}

export default Pet