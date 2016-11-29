//main file

//ran on every page load
$(document).ready(function() {
    //global data model
    var stockUpdateDataModel = {
        clinicName: null,
        stockName: null,
        stockCount: null
    }

    //initialize home page module - stores returned clinic name in localstorage
    signinPage.init();
    stockUpdateDataModel.clinicName = localStorage.getItem("clinicName");

    //initialize home page module
    homePage.init(stockUpdateDataModel.stockName, stockUpdateDataModel.clinicName);

    loadAllClinics();
    //initialize levels page module
    levelsPage.init(stockUpdateDataModel.clinicName)

    //initialize admin home page module
    adhomePage.init();
    
    loadShortageClinics();
    updateCheckedIn();
});