    import { RmSku } from "src/orders/entities/rmsku.entity";
import { Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Supplier } from "./supplier.entity";

@Entity()
export class RmSkuSupplier{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(()=>RmSku, (rmsku)=>rmsku.rmskuSuppliers, {nullable:true})
    rmsku:RmSku;

    @ManyToOne(()=>Supplier, (supplier)=>supplier.supplierRmSkus, {nullable:true})
    supplier:Supplier;
}