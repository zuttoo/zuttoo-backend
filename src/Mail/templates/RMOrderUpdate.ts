import mjml2html from 'mjml'

export type RmOrderArg = {
    name: string,
    billingId: string,
    purchaseDate: string,
    expectedDeliveryDate: string,
    orderStatus: string,
    orderRemark: string,
    rawMaterialSKU: string,
    batchNo: number,
    quantity: number,
}

export const RMOrderUpdateTemplate = (arg: RmOrderArg) => {
    const template = mjml2html(`
    <mjml>
    <mj-head>
      <mj-title>RM Order Status Update</mj-title>
      <mj-preview>RM Order Status: ${arg.orderStatus}</mj-preview>
      <mj-attributes>
        <mj-all font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"></mj-all>
        <mj-text font-weight="400" font-size="16px" color="#000000" line-height="24px" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"></mj-text>
      </mj-attributes>
  
      <mj-style inline="inline">
        .hh-grayBox {
        background-color: #F8F8F8;
        margin-bottom: 20px;
        padding: 35px;
        margin-top: 20px;
        }
        .pt45{padding-top:45px;}
        .order-tracking{
        text-align: center;
        width: 33.33%;
        position: relative;
        display: block;
        }
        .order-tracking .is-complete{
        display: block;
        position: relative;
        border-radius: 50%;
        height: 30px;
        width: 30px;
        border: 0px solid #AFAFAF;
        background-color: #f7be16;
        margin: 0 auto;
        transition: background 0.25s linear;
        -webkit-transition: background 0.25s linear;
        z-index: 2;
        }
        .order-tracking .is-complete:after {
        display: block;
        position: absolute;
        content: '';
        height: 14px;
        width: 7px;
        top: -2px;
        bottom: 0;
        left: 5px;
        margin: auto 0;
        border: 0px solid #AFAFAF;
        border-width: 0px 2px 2px 0;
        transform: rotate(45deg);
        opacity: 0;
        }
        .order-tracking.completed .is-complete{
        border-color: #27aa80;
        border-width: 0px;
        background-color: #27aa80;
        }
        .order-tracking.completed .is-complete:after {
        border-color: #fff;
        border-width: 0px 3px 3px 0;
        width: 7px;
        left: 11px;
        opacity: 1;
        }
        .order-tracking p {
        color: #A4A4A4;
        font-size: 16px;
        margin-top: 8px;
        margin-bottom: 0;
        line-height: 20px;
        }
        .order-tracking p span{font-size: 14px;}
        .order-tracking.completed p{color: #000;}
        .order-tracking::before {
        content: '';
        display: block;
        height: 3px;
        width: calc(100% - 40px);
        background-color: #f7be16;
        top: 13px;
        position: absolute;
        left: calc(-50% + 20px);
        z-index: 0;
        }
        .order-tracking:first-child:before{display: none;}
        .order-tracking.completed:before{background-color: #27aa80;}
  
      </mj-style>
    </mj-head>
    <mj-body background-color="#E7E7E7" width="600px">
      <mj-section background-color="#ffffff" padding="20px">
        <mj-column>
          <mj-text font-size="16px" color="#333333">
            Dear ${arg.name},
          </mj-text>
          <mj-text font-size="16px" color="#333333">
            We hope this email finds you well. We wanted to provide you with an update on the status of your raw material order. Please find the details below:
          </mj-text>
        </mj-column>
      </mj-section>
  
      <mj-section background-color="#ffffff" padding="20px">
        <mj-column>
          <mj-text font-size="18px" font-weight="bold" color="#333333">
            Order Details:
          </mj-text>
          <mj-table>
            <tr>
              <td>Billing ID:</td>
              <td>${arg.billingId}</td>
            </tr>
            <tr>
              <td>Purchase Date:</td>
              <td>${arg.purchaseDate}</td>
            </tr>
            <tr>
              <td>Expected Delivery Date:</td>
              <td>${arg.expectedDeliveryDate}</td>
            </tr>
          </mj-table>
        </mj-column>
      </mj-section>
  
      <mj-section background-color="#ffffff" padding="20px">
        <mj-column>
          <mj-text font-size="18px" font-weight="bold" color="#333333">
            Order Status: [Choose one: Delayed / On Time / In Transit / Delivered]
          </mj-text>
        </mj-column>
      </mj-section>
  
      <mj-section background-color="#ffffff" padding="20px">
        <mj-column>
          <mj-text font-size="18px" font-weight="bold" color="#333333">
            Stage Data:
          </mj-text>
          <mj-table>
            <tr>
              <td>Order Placed:</td>
              <td>${arg.purchaseDate}</td>
            </tr>
            <tr>
              <td>Processing:</td>
              <td>[Date]</td>
            </tr>
            <tr>
              <td>Packaging:</td>
              <td>[Date]</td>
            </tr>
            <tr>
              <td>Shipping:</td>
              <td>[Date]</td>
            </tr>
          </mj-table>
        </mj-column>
      </mj-section>
  
      <mj-section background-color="#ffffff" padding="20px">
        <mj-column>
          <mj-text font-size="18px" font-weight="bold" color="#333333">
            Item Details:
          </mj-text>
          <mj-table>
            <tr>
              <td>Raw Material:</td>
              <td>${arg.rawMaterialSKU}</td>
            </tr>
            <tr>
              <td>Batch No:</td>
              <td>${arg.batchNo}</td>
            </tr>
            <tr>
              <td>Quantity:</td>
              <td>${arg.quantity}</td>
            </tr>

          </mj-table>
      </mj-column>
  </mj-section>
  
//   <mj-section background-color="#ffffff" padding="20px">
//     <mj-column>
//       <mj-text font-size="18px" font-weight="bold" color="#333333">
//         Total Order Price: [Total Price]
//       </mj-text>
//     </mj-column>
//   </mj-section>
  
  <mj-section background-color="#ffffff" padding="20px">
    <mj-column>
      <mj-text font-size="16px" color="#333333">
        Best regards,<br>
        [Your Name]<br>
        [Company Name]<br>
        [Contact Information]
      </mj-text>
    </mj-column>
  </mj-section>
  <mj-section background-color="#ffffff" padding="20px">
    <mj-column>
      <mj-divider border-color="#ccc"></mj-divider>
      <mj-text font-size="18px" font-weight="bold" color="#333333" align="center">
        Order Status Timeline
      </mj-text>
    </mj-column>
  </mj-section>
  <mj-wrapper>
  </mj-wrapper>
  
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-10 hh-grayBox pt45 pb20">
        <div class="row justify-content-between">
          <div class="order-tracking completed">
            <span class="is-complete"></span>
            <p>Ordered<br><span>Mon, June 24</span></p>
          </div>
          <div class="order-tracking completed">
            <span class="is-complete"></span>
            <p>Shipped<br><span>Tue, June 25</span></p>
          </div>
          <div class="order-tracking">
            <span class="is-complete"></span>
            <p>Delivered<br><span>Fri, June 28</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </mj-body>
  </mjml>
    
    `);


    return {html: template.html}
}