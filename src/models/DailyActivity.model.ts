import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Pet from './Pet.model'


@Table({
    tableName: 'daily_activities'
})

class DailyAcitivity extends Model {
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

        @BelongsTo(() => Pet)
        declare pet: Pet; // relacción acceder a Pet
    
        @Column({
            type: DataType.STRING(),
                allowNull: false
        })
        declare type: string

        @Column({
            type: DataType.INTEGER(),
                allowNull: false
        })
        declare duration: number
        
        @Column({
            type: DataType.STRING(),
                allowNull: true
        })
        declare notes: string
    
        @Column({
            type: DataType.DATEONLY(),
                allowNull: false
        })
        declare date: Date 
}

export default DailyAcitivity