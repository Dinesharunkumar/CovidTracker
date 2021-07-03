
var changeColor = 1;

fetch("https://disease.sh/v3/covid-19/countries")
    .then(res =>{  
        return res.json()
    }) 
    .then(data =>{
        
        var countrylist = []
              
        for (let i = 0 ; i <= data.length-1 ; i++)  {
            countrylist.push({'country_name': data[i]['country'], 'country_code': data[i]['countryInfo']['iso2']})

            document.getElementById("dropdownMenuButton").innerHTML += `<option onclick = "onCd(this)" name="countrys" value="`+data[i]['countryInfo']['iso2']+`">`+data[i]['country']+`</option>`;
            
        }

        $(document).ready(function()
        {
            $("#dropdownMenuButton").val($("#dropdownMenuButton option").eq(93).val())
        })
        
        
        }
     );


function onCd(a){

    var fetchCountries = "https://disease.sh/v3/covid-19/countries/";
    var codeCountries = a.value;
    var res = fetchCountries.concat(codeCountries);
    // console.log(res)
    diffCountries(res);
}

//fetching api for INDIA


fetch("https://disease.sh/v3/covid-19/countries/IN")
    .then(res =>{
        return res.json()
    }) 
    .then(data  =>{
        document.getElementById("countryname").innerHTML = data.country;
        document.getElementById("myImg").src = data.countryInfo.flag;
        document.getElementById("active").innerHTML = data.active;
        document.getElementById("recover").innerHTML = data.recovered;
        document.getElementById("cases").innerHTML = data.cases;
        document.getElementById("death").innerHTML = data.deaths;

        document.getElementById("countryname-v").innerHTML = data.country;
        document.getElementById("myImg-v").src = data.countryInfo.flag;
        document.getElementById("active-v").innerHTML = data.active;
        document.getElementById("recover-v").innerHTML = data.recovered;
        document.getElementById("cases-v").innerHTML = data.cases;
        document.getElementById("death-v").innerHTML = data.deaths;
        
        var countryChart = [];

        countryChart.push({
            'district_name': data['country'],
            'confirmed': data['cases'],
            'active': data['active'],
            'recovered': data['recovered'],
            'deceased': data['deaths'],
        })

    })




fetch("https://api.covid19india.org/state_district_wise.json")
    .then(res =>{
        return res.json()
    })
    .then(data =>{
        var states = Object.keys(data);
        var select = document.getElementById("state")

        for (let i = 0 ; i <= states.length-1 ; i++){
            var option = document.createElement("OPTION");
            txt = document.createTextNode(states[i]);
            option.appendChild(txt);
            option.setAttribute("value", states[i]);
            select.insertBefore(option,select.lastChild);
        }
        $(document).ready(function()
        {
            $("#state").val($("#state option").eq(32).val())
        })
        
    })


var key = "Tamil Nadu"

var tn_list = [];

fetch("https://api.covid19india.org/state_district_wise.json")
    .then(res =>{
        return res.json()
    })
    .then(data =>{
        var district = (data[key].districtData);
        var obj = Object.keys(district);
        
        for (let i=0; i<=obj.length - 1 ; i++) {
            tn_list.push({
                'district_name': obj[i],
                'confirmed': district[obj[i]]['confirmed'],
                'active': district[obj[i]]['active'],
                'recovered': district[obj[i]]['recovered'],
                'deceased': district[obj[i]]['deceased'],
            })
        }
                  
    clearTable();
   
    for(i = 0; i < tn_list.length; i++) {
        var b = tn_list[i];
        document.getElementById("statename").innerHTML = key;
        document.getElementById("statename-chart").innerHTML = key;  
    }
    
    jqtable(tn_list);

    if(changeColor == 1){
        let col1 = "light"
        chartData(tn_list,col1);
    }
    else if(changeColor == 0){
        let col2 = "dark"
        chartData(tn_list,col2);
    }

    
})


function jqtable(a){ 
    if (jQuery.fn.dataTable.isDataTable('#table_id')) {
        jQuery('#table_id').DataTable().clear().destroy();
      }
    $(document).ready(function() {
    $('#table_id').DataTable( {
        paging: false,
        data: a,
        columns: [
            { data:"district_name", title: "District" },
            { data:"confirmed",title: "Confirmed" },
            { data:"active",title: "Active" },
            { data:"recovered",title: "Recovered" },
            { data:"deceased",title: "Deaths" },
            ]
         } );
    } );
}


function chartData(a,col){

AmCharts.makeChart("chartdiv",
				{
                    "type": "serial",
                    "theme": col,
					"categoryField": "district_name",
					"startDuration": 1,
					"categoryAxis": {
						"gridPosition": "start"
					},
                    "trendLines": [],
					"graphs": [
						{
							"balloonText": "[[title]] of [[category]]:[[value]]",
							"fillAlphas": 1,
							"fillColors": "#FF8686",
							"id": "AmGraph-1",
							"lineThickness": 0,
							"title": "confirmed",
							"type": "column",
                            "valueField": "confirmed",
                            
						},
						{
							"balloonText": "[[title]] of [[category]]:[[value]]",
							"fillAlphas": 1,
							"fillColors": "#93BEFB",
							"id": "AmGraph-2",
							"lineThickness": 0,
							"title": "active",
							"type": "column",
							"valueField": "active"
						},
						{
                            "balloonText": "[[title]] of [[category]]:[[value]]",
							"fillAlphas": 1,
                            "fillColors": "#94F964",
							"id": "AmGraph-3",
							"lineThickness": 0,
							"title": "recovered",
                            "type": "column",
                            "valueField": "recovered"
						},
						{
                            "balloonText": "[[title]] of [[category]]:[[value]]",
							"fillAlphas": 1,
                            "fillColors": "#B1B1B1",
							"id": "AmGraph-4",
							"lineThickness": 0,
							"title": "deaths",
                            "type": "column",
                            "valueField": "deceased"
						}
                    ],
                    
					"guides": [],
					"valueAxes": [
						{
							"id": "ValueAxis-1",
                            "title": "",
                            
						}
					],
					"allLabels": [],
					"balloon": {},
					"legend": {
						"enabled": true,
						"useGraphSettings": true
					},
					"titles": [
						{
							"id": "Title-1",
							"size": 15,
                            "text": "",
                            
						}
                    ],
                    
                    'listeners': [{
                        'event': 'rendered',
                        'method': function(e) {
                            e.chart.zoomToIndexes(0, 3);
                        }
                    }],
                    "dataProvider": a,

                    "pathToImages": "http://cdn.amcharts.com/lib/3/images/", // required for grips
                    "chartScrollbar": {
                    "updateOnReleaseOnly": true,
                    }
                }
			);
}


function chartDatav(a,col){
    AmCharts.makeChart("chartdiv-v",
        {
            "type": "serial",
            "theme": col,
            "categoryField": "district_name",
            "angle": 30,
            "depth3D": 30,
            "startDuration": 1,
            "categoryAxis": {
                "gridPosition": "start"
            },
            "trendLines": [],
            "graphs": [
                {
                    "balloonText": "[[title]] of [[category]]:[[value]]",
                    "fillAlphas": 1,
                    "fillColors": "#F95959",
                    "id": "AmGraph-1",
                    "lineThickness": 0,
                    "title": "confirmed",
                    "type": "column",
                    "valueField": "confirmed"
                },
                {   
                    "balloonText": "[[title]] of [[category]]:[[value]]",
                    "fillAlphas": 1,
                    "fillColors": "#73B3FD",
                    "id": "AmGraph-3",
                    "lineThickness": 0,
                    "title": "active",
                    "type": "column",
                    "valueField": "active"
                },
                {
                    "balloonText": "[[title]] of [[category]]:[[value]]",
                    "fillAlphas": 1,
                    "fillColors": "#8EFD71",
                    "id": "AmGraph-4",
                    "lineThickness": 0,
                    "title": "recovered",
                    "type": "column",
                    "valueField": "recovered"
                },
                {
                    "balloonText": "[[title]] of [[category]]:[[value]]",
                    "fillAlphas": 1,
                    "fillColors": "#858585",
                    "id": "AmGraph-5",
                    "lineThickness": 0,
                    "title": "deaths",
                    "type": "column",
                    "valueField": "deceased"
                }
            ],
            "guides": [],
            "valueAxes": [
                {
                    "id": "ValueAxis-1",
                    
                }
            ],
            "allLabels": [],
            "balloon": {},
            "legend": {
                "enabled": true,
                "useGraphSettings": true
            },
            "titles": [
                {
                    "id": "Title-1",
                    "size": 15,
                    "text": ""
                }
            ],
            "dataProvider": a
        }
    );
}

var countryChart =[];

function diffCountries(url){
    fetch(url)
    .then(res =>{
        return res.json()
    }) 
    .then(data  =>
        {
        document.getElementById("countryname-v").innerHTML = data.country;
        document.getElementById("myImg-v").src = data.countryInfo.flag;
        document.getElementById("active-v").innerHTML = data.active;
        document.getElementById("recover-v").innerHTML = data.recovered;
        document.getElementById("cases-v").innerHTML = data.cases;
        document.getElementById("death-v").innerHTML = data.deaths;
        
        countryChart.length = 0;

        countryChart.push({
            'district_name': data['country'],
            'confirmed': data['cases'],
            'active': data['active'],
            'recovered': data['recovered'],
            'deceased': data['deaths'],
        })

        
        if(changeColor == 1){
            let col1 = "light"
            chartDatav(countryChart,col1);
        }

        else if(changeColor == 0){
            let col2 = "dark"
            chartDatav(countryChart,col2);
        }
        
    })
    
}

console.log(countryChart)

var fetchCountry = "https://disease.sh/v3/covid-19/countries/IN";
diffCountries(fetchCountry);


var district_list = []; 
var themeIntergration = 1;
function onState(a){
    var key = a.value;
    console.log(key);       
    fetch("https://api.covid19india.org/state_district_wise.json")
    .then(res =>{
        return res.json()
    })
    .then(data =>{
        var district = (data[key].districtData);
        var obj = Object.keys(district);
        clearTable();
        district_list.length = 0;
        for (let i=0; i<=obj.length - 1 ; i++) {
            district_list.push({
                'district_name': obj[i],
                'confirmed': district[obj[i]]['confirmed'],
                'active': district[obj[i]]['active'],
                'recovered': district[obj[i]]['recovered'],
                'deceased': district[obj[i]]['deceased'],
            })
        }
        
        for(i = 0; i < district_list.length; i++) {
            var b = district_list[i]
            // console.log(b);
            document.getElementById("statename").innerHTML = key;  
            document.getElementById("statename-chart").innerHTML = key;
        }
      
    jqtable(district_list);

    if(changeColor == 1){
        let col1 = "light"
        chartData(district_list,col1);
    }

    else if(changeColor == 0){
        let col2 = "dark"
        chartData(district_list,col2);
    }

    themeIntergration = 0;
  
    })
    
}

															
function clearTable(){
    var table = document.getElementById("table_id");
    for(var i = table.rows.length - 1; i > 0; i--)
    {
        table.deleteRow(i);
    }
}




function changeTheme(){
    if (changeColor == 1){
        document.getElementById("theme").className = "fa fa-moon-o";
        document.getElementById("head").className = "darkmode-header";
        document.getElementById("select").className = "card select-btn-dark";
        document.getElementById("select-v").className = "card select-btn-dark";
        document.getElementById("sec").className = "darkmode-section";
        document.getElementById("countryname").className = "country-name-dark";
        document.getElementById("countryname-v").className = "country-name-dark";
        document.getElementById("dropdownMenuButton").className = "btn btn-secondary dropdown-toggle drop-button-dark";
        document.getElementById("state").className = "btn btn-secondary dropdown-toggle drop-button-dark";
        document.getElementById("red-card").className = "card card-darkmode-red";
        document.getElementById("red-card-v").className = "card card-darkmode-red";
        document.getElementById("hrr").className = "hr-darkmode-red";
        document.getElementById("hrr-v").className = "hr-darkmode-red";
        document.getElementById("blue-card").className = "card card-darkmode-blue";
        document.getElementById("blue-card-v").className = "card card-darkmode-blue";
        document.getElementById("hrb").className = "hr-darkmode-blue";
        document.getElementById("hrb-v").className = "hr-darkmode-blue";
        document.getElementById("green-card").className = "card card-darkmode-green";
        document.getElementById("green-card-v").className = "card card-darkmode-green";
        document.getElementById("hrg").className = "hr-darkmode-green";
        document.getElementById("hrg-v").className = "hr-darkmode-green";
        document.getElementById("black-card").className = "card card-darkmode-black";
        document.getElementById("black-card-v").className = "card card-darkmode-black";
        document.getElementById("hrbk").className = "hr-darkmode-black";
        document.getElementById("hrbk-v").className = "hr-darkmode-black";
        document.getElementById("state-card").className = "card-body states-darkmode-card card-table-align";
        document.getElementById("states-name").className = "select-state-dark";
        document.getElementById("states-name-chart").className = "select-state-dark";
        document.getElementById("state-chart").className = "card-body text-primary chart-darkmode-card card-chart-align";
        document.getElementById("state-chart-v").className = "card-body text-primary chart-darkmode-card card-chart-align";
        document.getElementById("table_id").className = "table custom-dark";
        var col1 = "dark";
        if(themeIntergration==1){
            chartData(tn_list,col1);
        }
        else{
            chartData(district_list,col1);
        }   
        chartDatav(countryChart,col1)  
        document.getElementById("foot").className = "darkmode-footer";
        changeColor = 0;
}
    else if (changeColor == 0){
        document.getElementById("theme").className = "fa fa-sun-o";
        document.getElementById("head").className = "lightmode-header";
        document.getElementById("select").className = "card select-btn-light";
        document.getElementById("select-v").className = "card select-btn-light";
        document.getElementById("sec").className = "lightmode-section";
        document.getElementById("countryname").className = "country-name-light";
        document.getElementById("countryname-v").className = "country-name-light";
        document.getElementById("dropdownMenuButton").className = "btn btn-secondary dropdown-toggle drop-button-light";
        document.getElementById("state").className = "btn btn-secondary dropdown-toggle drop-button-light";
        document.getElementById("red-card").className = "card card-lightmode-red";
        document.getElementById("red-card-v").className = "card card-lightmode-red";
        document.getElementById("hrr").className = "hr-lightmode-red";
        document.getElementById("hrr-v").className = "hr-lightmode-red";
        document.getElementById("blue-card").className = "card card-lightmode-blue";
        document.getElementById("blue-card-v").className = "card card-lightmode-blue";
        document.getElementById("hrb").className = "hr-lightmode-blue";
        document.getElementById("hrb-v").className = "hr-lightmode-blue";
        document.getElementById("green-card").className = "card card-lightmode-green";
        document.getElementById("green-card-v").className = "card card-lightmode-green";
        document.getElementById("hrg").className = "hr-lightmode-green";
        document.getElementById("hrg-v").className = "hr-lightmode-green";
        document.getElementById("black-card").className = "card card-lightmode-black";
        document.getElementById("black-card-v").className = "card card-lightmode-black";
        document.getElementById("hrbk").className = "hr-lightmode-black";
        document.getElementById("hrbk-v").className = "hr-lightmode-black";
        document.getElementById("state-card").className = "card-body states-lightmode-card card-table-align";
        document.getElementById("states-name").className = "select-state-light";
        document.getElementById("states-name-chart").className = "select-state-light";
        document.getElementById("state-chart").className = "card-body text-primary chart-lightmode-card card-chart-align";
        document.getElementById("state-chart-v").className = "card-body text-primary chart-lightmode-card card-chart-align";
        document.getElementById("table_id").className = "table custom-light";
        var col2 = "light";
        if(themeIntergration==1){
            chartData(tn_list,col2);
        }
        else{
            chartData(district_list,col2);
        }
        chartDatav(countryChart,col2)
        document.getElementById("foot").className = "lightmode-footer";
        changeColor = 1;

    }
}
