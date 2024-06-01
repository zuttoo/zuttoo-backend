# Order Tracking

1. The user should be able to see all their orders in one view

End Points:

   GET /api/v1/orders?clientId={clientId}&materialType={materialType}&page={pageNumber}&limit={pageSize}


# TASK
    1. Update Client Names-- Done
    2. Update OEM Names--Done
    3. Uupdate Supplier Names --Done
    4. Insert 5 RM Orders into order table --Done
    5. Inseret 5 Fg Orders into order table --Done


# Supplier Selection
   1. The product (FG) that the client makes is known to Zuttoo. It's the FG SKU table
   2. For next step, mapping between FGSKU , SFG and FG SKU is required
   3. Along with mapping, real time inventory data for ALL SKU is required.

End Points:
   1. GET /products/:clientId
   2. GET /products/sku/:productId
   3. GET FG Chassis-->SFG --->RMTube
   4. GET inventory data from SAP for each sku.
   5. Calculate the required quantity for each SKU.
   6. Return the data to the user


Rank Suppliers: 1. Fetch Ranking 
                2. Inventory Data:

Inventory Data: From the product SKU as entered by the user, 
                  fetch the inventory data by the SKU
                  Required FG SKU qty: Order Number
                  SFG qty: SFG nos for one FG * Total SFG
                  SFG Inventory Qty: SFG in the inventory