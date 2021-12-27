
export type UserProp  ={
    loadId:string,
    trailerNumber:string,
    driverName:string,
    key?:string|undefined|null
}


export type TruckDataType = {
    comment:string,
    dockID:string,
    routeID:string,
    scac:string,
    carrier:string,
    id:number,
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
    cutoff:string
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