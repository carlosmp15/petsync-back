import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey } from 'sequelize-typescript'
import Pet from './Pet.model';

@Table({
    tableName: 'feedings'
})

class Feeding extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER()
    })
    declare id: number

    @ForeignKey(() => Pet)
        @Column({
            type: DataType.INTEGER(),
                allowNull: false
        })
        declare pet_id: number

        @BelongsTo(() => Pet, {
            onDelete: 'CASCADE'
        })
    declare pet: Pet; // relacción acceder a Pet

    @Column({
        type: DataType.STRING(),
            allowNull: false
    })
    declare type: string

    @Column({
        type: DataType.STRING(),
            allowNull: false
    })
    declare description: string
    
    @Column({
        type: DataType.DECIMAL(),
            allowNull: false
    })
    declare quantity: number

    @Column({
        type: DataType.DATEONLY(),
            allowNull: false
    })
    declare date: Date   
}

export default Feeding