
export interface IStakeProperty {
    propertyName: string;
    propertyValue: string;
}

export interface ISTakeCode {
    stakeCode: string;
    stakeProperties: Array<IStakeProperty>;
}

export interface IRelatedPartySet{
    relationCode:string;
    partyCode:string;
}

export interface IAgentTCS {
    
    userCode: string;
    errorCode: string;
    roleCode: string;
    errorMessage: string;
    sessionId: string;
    actionEvent: string;
    partycode: string;
    partytype: string;
    firstname: string;
    middlename: string;
    lastname: string;
    othername: string;
    businessname: string;
    registrationno: string;
    registrationdate: string;
    typeoforganization: string;
    title: string;
    nicno: string;
    sicno: string;
    sex: string;
    nationality: string;
    occupation: string;
    parentpartycode: string;
    startdate: string;

    stakeCodeSet: Array<ISTakeCode>;

    relatedPartySet :Array<IRelatedPartySet>;

    mailingaddressline1: string;
    mailingaddressline2: string;
    mailingaddressline3: string;
    mailingcitylocation: string;
    mailingprovince: string;
    countrycode: string;
    mailingzipcode: string;
    mailingfax: string;
    mailingphonework: string;
    mailingphonecell: string;
    mailingphonehome: string;
    mailingemail1: string;
    mailingemail2: string;
    mailingemail3: string;
    permanentaddresssame: string;
    permanentaddress1: string;
    permanentaddress2: string;
    permanentaddress3: string;
    permanentcitylocation: string;
    permanentprovince: string;
    permanentcountrycode: string;
    permanentzipcode: string;
    permanentfaxno: string;
    permanentphonework: string;
    permanentphonecell: string;
    permanentphonehome: string;
    permanentemail1: string;
    permanentemail2: string;
    permanentemail3: string;
    partyStatus: string;
    searchResMaxRange: string;
    searchResMinRange: string;
    permanentadddeleteind: string;
    mailingadddeleteind: string;


}

