import { DefaultEntity } from "src/common/default.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { OrderLineItem } from "src/orders/entities/order-lineitem.entity"

@Entity()
export class TestCertificate extends DefaultEntity {
   @OneToOne(() => OrderLineItem)
   @JoinColumn()
   orderLineItem: OrderLineItem;

   @Column({ nullable: true })
   tcUrl: string;

   @Column({ nullable: true })
   testCertificateNo: string;

   @Column({ nullable: true })
   doNo: string;

   @Column({ nullable: true })
   invoiceNo: string;

   @Column({ nullable: true })
   materialNo: string;

   @Column({ nullable: true })
   despatchDate: Date;

   @Column({ nullable: true })
   customerCode: string;

   @Column({ nullable: true })
   vehicleNo: string;

   @Column({ nullable: true })
   product: string;

   @Column({ nullable: true })
   grade: string;

   @Column({ nullable: true })
   section: string;

   // Chemical Analysis
   @Column({ type: 'decimal', nullable: true, precision: 10, scale: 4 })
   cPercentage: number;

   @Column({ type: 'decimal', nullable: true, precision: 10, scale: 4 })
   mnPercentage: number;

   @Column({ type: 'decimal', nullable: true, precision: 10, scale: 4 })
   siPercentage: number;

   @Column({ type: 'decimal', nullable: true, precision: 10, scale: 4 })
   sPercentage: number;

   @Column({ type: 'decimal', nullable: true, precision: 10, scale: 4 })
   pPercentage: number;

   @Column({ type: 'decimal', nullable: true, precision: 10, scale: 4 })
   alPercentage: number;

   @Column({ type: 'decimal', nullable: true, precision: 10, scale: 4 })
   nPercentage: number;

   @Column({ type: 'decimal', nullable: true, precision: 10, scale: 4 })
   tiPercentage: number;

   @Column({ type: 'decimal', nullable: true, precision: 10, scale: 4 })
   nbPercentage: number;

   @Column({ type: 'decimal', nullable: true, precision: 10, scale: 4 })
   crPercentage: number;

   @Column({ type: 'decimal', nullable: true, precision: 10, scale: 4 })
   cuPercentage: number;

   @Column({ type: 'decimal', nullable: true, precision: 10, scale: 4 })
   moPercentage: number;

   @Column({ type: 'decimal', nullable: true, precision: 10, scale: 4 })
   niPercentage: number;

   @Column({ type: 'decimal', nullable: true, precision: 10, scale: 4 })
   vPercentage: number;

   // Mechanical Analysis
   @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
   yieldStrengthMpa: number;

   @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
   ultimateTensileStrengthMpa: number;

   @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
   elongationPercentage: number;

   @Column({ nullable: true })
   bend: string;

   // Other Details
   @Column({ nullable: true })
   batchNo: string;

   @Column({ nullable: true })
   motherCoilNo: string;

   @Column({ nullable: true })
   castNo: string;

   @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
   tonnage: number;

   @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
   length: number;

   @Column({ nullable: true, type: 'int' })
   nos: number;

   @Column({ nullable: true })
   tdcNo: string;

   // Additional fields from the original entity
   @Column({ nullable: true, type: 'boolean' })
   isHydrotestingDone: boolean;

   @Column({ nullable: true, type: 'boolean' })
   isDriftingDone: boolean;

   @Column({ nullable: true, type: 'boolean' })
   isFlatteningDone: boolean;

   @Column({ nullable: true, type: 'boolean' })
   isEctDone: boolean;

   @Column({ nullable: true, type: 'boolean' })
   isCrushingDone: boolean;

   @Column({ nullable: true, type: 'boolean' })
   isWeldMacroExamDone: boolean;

   @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
   outerDiameterMm: number;

   @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
   innerDiameterMm: number;

   @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
   lengthM: number;
}