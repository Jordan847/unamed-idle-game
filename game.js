money = 4
income = 0

income_per_sec = 0
upgrades_owned = 0
upgrade1_stats = {"base_price":4.00, "growth_rate":1.12,"current_price":4,"times_owned":0,"base_production":0.0225,"element_id":"upgrade"}
upgrade2_stats = {"base_price":255, "growth_rate":1.28,"current_price":255,"times_owned":0,"base_production":0.225,"element_id":"upgrade2"}
upgrade3_stats = {"base_price":5000, "growth_rate":1.25,"current_price":5000,"times_owned":0,"base_production":1.125,"element_id":"upgrade3"}
upgrade4_stats = {"base_price":25000, "growth_rate":1.6,"current_price":18000,"times_owned":0,"base_production":1.125,"element_id":"upgrade4"}
lst_of_upgrade_stats = [upgrade1_stats,upgrade2_stats,upgrade3_stats,upgrade4_stats]
upgrade_elements = ["upgrade","upgrade2","upgrade3","upgrade4"]
upgrade_stats = [upgrade1_stats,upgrade2_stats,upgrade3_stats,upgrade4_stats]
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
//start of dev functions
function free_upgrades(){
    for(i=0;i!=4;i++){
    lst_of_upgrade_stats[i]['growth_rate'] = 0
    lst_of_upgrade_stats[i]['current_price'] = 0
    lst_of_upgrade_stats[i]['base_price'] = 0
    
    formatted_stats = lst_of_upgrade_stats[i]["current_price"].toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2})
    document.getElementById(lst_of_upgrade_stats[i]["element_id"]).innerHTML = formatted_stats
    
  } 
}


// end of dev funtions
function init(){
    document.getElementById("money").innerHTML = `$ ${money}`
    document.getElementById("upgrade").innerHTML = upgrade1_stats["current_price"].toLocaleString()
    document.getElementById("upgrade1_count").innerHTML = upgrade1_stats["times_owned"]
    document.getElementById("upgrade2").innerHTML = upgrade2_stats["current_price"].toLocaleString()
    document.getElementById("upgrade2_count").innerHTML = upgrade2_stats["times_owned"]
    document.getElementById("upgrade3").innerHTML = upgrade3_stats["current_price"].toLocaleString()
    document.getElementById("upgrade3_count").innerHTML = upgrade3_stats["times_owned"]
    document.getElementById("upgrade4").innerHTML = upgrade4_stats["current_price"].toLocaleString()
    document.getElementById("upgrade4_count").innerHTML = upgrade4_stats["times_owned"]
    
    update_income_per_sec(income)

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
        
        income += upgrade_stats["base_production"]
        money -= upgrade_stats["current_price"]
        
        upgrade_stats["current_price"] = Math.pow(upgrade_stats["growth_rate"], upgrade_stats["times_owned"]) * upgrade_stats["base_price"]
        upgrade_stats["times_owned"]++
        
        
        formatted_stats = upgrade_stats["current_price"].toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2})
        document.getElementById(upgrade_stats["element_id"]).innerHTML = formatted_stats
        update_income_per_sec(income)
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