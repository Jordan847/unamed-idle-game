money = 0
income = 0
click_amount = 1
income_per_sec = 0


upgrade1_stats = {"base_price":8, "growth_rate":1.25,"current_price":8,"times_owned":0,"base_production":0.00675,"multiplyer":1.0004,"element_id":"upgrade"}
upgrade2_stats = {"base_price":855, "growth_rate":1.28,"current_price":855,"times_owned":0,"base_production":0.225,"multiplyer":1.001,"element_id":"upgrade2"}
upgrade3_stats = {"base_price":5000, "growth_rate":1.25,"current_price":5000,"times_owned":0,"base_production":1.125,"multiplyer":1.0009,"element_id":"upgrade3"}
upgrade4_stats = {"base_price":25000, "growth_rate":1.6,"current_price":18000,"times_owned":0,"base_production":1.125,"multiplyer":1.0012,"element_id":"upgrade4"}

upgrade_stats = [upgrade1_stats,upgrade2_stats,upgrade3_stats,upgrade4_stats]

upgrade_elements = ["upgrade","upgrade2","upgrade3","upgrade4"]
upgrade_elements_count = ["upgrade1_count","upgrade2_count","upgrade3_count","upgrade4_count"]
things_to_save = [upgrade_stats,money,income,click_amount]
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
function init(upgrade_stats){
    for(i=0;i!=4;i++){
    document.getElementById("money").innerHTML = `$ ${money}`
    document.getElementById(upgrade_elements[i]).innerHTML = upgrade_stats[i]["current_price"].toLocaleString()
    document.getElementById(upgrade_elements_count[i]).innerHTML = upgrade_stats[i]["times_owned"]
    }

    
    update_income_per_sec(income)

}


//start of dev functions
function free_upgrades(){
    for(i=0;i!=4;i++){
    upgrade_stats[i]['growth_rate'] = 0
    upgrade_stats[i]['current_price'] = 0
    upgrade_stats[i]['base_price'] = 0
    
    formatted_stats = upgrade_stats[i]["current_price"].toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2})
    document.getElementById(upgrade_stats[i]["element_id"]).innerHTML = formatted_stats
    
  } 
}
function set_money(){
  money = Number(prompt("set money"))
}

// end of dev funtions


function earn_money(){
  money += click_amount
}

async function Update_money() {
  while (true) {
    money += income
    await sleep(45)  
  }
}

async function Display_update(upgrade_elements,upgrade_stats) {
    while (true) {
      	formatted_number = money.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2})
      	document.getElementById("money").innerHTML = `$ ${formatted_number}`
      	document.getElementById("upgrade1_count").innerHTML = upgrade1_stats["times_owned"]
      	document.getElementById("upgrade2_count").innerHTML = upgrade2_stats["times_owned"]
      	document.getElementById("upgrade3_count").innerHTML = upgrade3_stats["times_owned"]
      	document.getElementById("upgrade4_count").innerHTML = upgrade4_stats["times_owned"]
      	for (i=0;i!=4;i++){
        	element = document.getElementById(upgrade_elements[i])
      
      	if (money>=upgrade_stats[i]["current_price"]){
        	element.style.backgroundColor = "#464545"
      
      	}
		else{
			element.style.backgroundColor = "#303030"
		}
    	} 
    update_income_per_sec(income)


    await sleep(45)  

  }
}

function update_income_per_sec(income){
    income_per_sec = income * 22.22222
    income_per_sec = income_per_sec.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2})
    document.getElementById("income_per_sec").innerHTML =  `income per sec: ${income_per_sec}`
}

function Upgrade(upgrade_stats){
    if (money >= upgrade_stats["current_price"]){
        // updates income
        if (upgrade_stats["times_owned"]!=0){
          income += (upgrade_stats["base_production"] * upgrade_stats["times_owned"] * upgrade_stats["multiplyer"])
          
        }
        else{
          income += upgrade_stats["base_production"]
        }
        // removes money
        money -= upgrade_stats["current_price"]
        // price update
        upgrade_stats["current_price"] = Math.pow(upgrade_stats["growth_rate"], upgrade_stats["times_owned"]) * upgrade_stats["base_price"]
        upgrade_stats["times_owned"]++
        // updates income per second
        update_income_per_sec(income)
        // updates html
        formatted_stats = upgrade_stats["current_price"].toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2})
        document.getElementById(upgrade_stats["element_id"]).innerHTML = formatted_stats
        
    }
}

async function main() {
  const tasks = [
    Display_update(upgrade_elements,upgrade_stats),
    Update_money()
  ]
  await Promise.all(tasks)
}

main()

// fun stuff
    function rainbow(){
      hsl = [0,0,0]
      step = 0
      function changeBackgroundColor(){
        
        steps = 2500;
        if (step == steps){
          step = 0
        }
        
        
        hue = (step * 360) / steps;
        saturation = 100;
        lightness = 50;
        hsl = [hue, saturation, lightness]
        document.body.style.backgroundColor = 'hsl(' + hsl[0] + ',' + hsl[1] + '%' + ',' + hsl[2] +'%' + ')'
        step++
    
    }
    setInterval(changeBackgroundColor, 8)
  }
