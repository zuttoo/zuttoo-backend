import { Injectable, NotFoundException } from '@nestjs/common';
// import {
//     BusinessPartner
//   } from '../../services/business-partner-service';
    
// import {businessPartnerService as businessPartnerService} from '../../services/business-partner-service/index';
// const {businessPartnerService}=require('../../services/business-partner-service')


const SAP_DESTNATION_URL='https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata/sap/API_BUSINESS_PARTNER'
const SAP_API_KEY='7m5BdgpjdXHK5BGBG0kld3TnjMxqCm6g'
@Injectable()
export class SapService {

    constructor(){}

    async getAllBusinessPartners():Promise<BusinessPartner[]>{
        const {businessPartnerApi}=businessPartnerService();

        try{
            return await businessPartnerApi
            .requestBuilder()
            .getAll()
            .addCustomHeaders({ APIKey: SAP_API_KEY})
            .execute({
              url: SAP_DESTNATION_URL
            });

        }catch(error){
            throw new NotFoundException(`Failed to get business partners- ${error.message}`)
        }
      
    }
}
