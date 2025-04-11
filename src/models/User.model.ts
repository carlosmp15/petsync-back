import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Unique } from 'sequelize-typescript'

@Table({
    tableName: 'users'
})

class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER()
    })
    declare id: number

    @Column({
        type: DataType.STRING(),
         allowNull: false
    })
    declare name: string

    @Column({
        type: DataType.STRING(),
         allowNull: false
    })
    declare surname: string
    
    @Unique
    @Column({
        type: DataType.STRING(),
         allowNull: false
    })
    declare email: string

    @Unique
    @Column({
        type: DataType.STRING(),
         allowNull: false
    })
    declare phone: string

    @Column({
        type: DataType.TEXT(),
         allowNull: false
    })
    declare password: string

    @Column({
        type: DataType.DATEONLY(),
         allowNull: false
    })
    declare birthday: Date   
}

export default User