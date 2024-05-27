# Order Tracking

1. The user should be able to see all their orders in one view

End Points:

   GET /api/v1/orders?clientId={clientId}&materialType={materialType}&page={pageNumber}&limit={pageSize}


# TASK
    1. Update Client Names-- Done
    2. Update OEM Names--Done
    3. Uupdate Supplier Names --Done
    4. Insert 5 RM Orders into order table
    5. Inseret 5 Fg Orders into order table


# Supplier Selection
   1. The product (FG) that the client makes is known to Zuttoo. It's the FG SKU table
   2. For next step, mapping between FGSKU , SFG and FG SKU is required
   3. Along with mapping, real time inventory data for ALL SKU is required