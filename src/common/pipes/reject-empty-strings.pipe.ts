import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class RejectEmptyStringsPipe implements PipeTransform{
    private checkEmptyStrings(value:any, path:string[]=[]):void{
        if(typeof value==='string' && value.trim()===''){
            throw new BadRequestException(`Empty string not allowed for field: ${path.join('.')}`);

        }

        // recursively check for empty strings in nested objects
        if(Array.isArray(value)){
            value.forEach((item,index)=>this.checkEmptyStrings(item, [
                ...path, index.toString()
            ]));
        }else if(typeof value==='object' && value!==null){
            Object.entries(value).forEach(([key, val])=>{
                this.checkEmptyStrings(val, [...path, key]);
            })
        }
    }

    transform(value: any, metadata: ArgumentMetadata) {
        this.checkEmptyStrings(value);
        return value
    }
}