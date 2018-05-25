export interface ICommissionRateChart { 
    Id:number  ;
    CategoryId:number  ;
    AgtTypeId:number  ;
    Code:string  ;
    Description:string  ;
    TermLowerLimit:number  ;
    TermUpperLimit:number  ;
    YearLowerLimit:number  ;
    YearUpperLimit:number  ;
    CreatedBy:string  ;
    // CreatedDate:string  ;
    // EffectiveEndDate:string  ;
    ActiveStatus:number  ;
    Rate:number  ;
    Sql:string  ;
    FromDate:string  ;
    ToDate:string  ;
    }