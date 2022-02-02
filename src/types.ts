import {ChangeEvent} from 'react';

export type UserProp  ={
    loadId:string,
    trailerNumber:string,
    driverName:string,
    key?:string|undefined|null
}
export interface TruckRowProp {
    key:string,
    idx:number,
    name:string,
    data:TruckDataType[]

  
}


export interface Row {
    id:number;
    hourMinute:string;
    asn:string;
    carrier:string;
    scac:string;
    routeID:string;
    disposition:string;
    name:string;
    timeIN:string;
    timeOUT:string;
    trailer:string;
    shipper:string;
    fille:string;
    dockID:string;
    comment:string;
    cutoff:string;
}



export interface SignInProps {
    isLoggedIn?:boolean;
    onClick?:(value:LoginType)=>void
}

export interface LoginType{
    loadId:string;
    trailerId:string;
    driverName:string;
}
export interface TruckDataGridProps {
    data:any;
}

export interface SignInComponentProps {
    notValid:boolean;
    user:UserProp;
    loggedIn:any;
    handleChangeLoad:ChangeEvent<HTMLInputElement|HTMLTextAreaElement|undefined>;
    handleChangeTrailer:ChangeEvent<HTMLInputElement|HTMLTextAreaElement|undefined>;
    handleChangeDriverName:ChangeEvent<HTMLInputElement|HTMLTextAreaElement|undefined>;
    handleLogin:ChangeEvent<HTMLInputElement|HTMLTextAreaElement|undefined>;
  
  }



export type TruckDataType = {
    id:number,
    comment:string,
    dockID:string,
    routeID:string,
    scac:string,
    carrier:string,
    name:string,
    order_sendto_id:number,
    fordate:string,
    hour:number,
    minute:number,
    disposition:number,
    fill:number,
    timeIN:string,
    timeOUT:string,
    trailer:string,
    shipper:string,
    cutoff:string,
    asn:string
}



export type DispositionType = {
    disposition:number,
    description:string
}
export type SendToType = {
    order_sendto_id:number,
    name:string
}
  
 
export type TruckData = {
    TruckDatas:TruckDataType[],
    SendTos:SendToType[],
    Dispositions:DispositionType[]

}