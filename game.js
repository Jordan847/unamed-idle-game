function create_default_player() {
  player = {
    money: 0,
    income: 0,
    click_amount: 1,
    income_per_sec: 0,
    upgrade1_stats: {
      base_price: 8,
      growth_rate: 1.25,
      current_price: 8,
      times_owned: 0,
      base_production: 0.00675,
      multiplyer: 1.0004,
      element_id: "upgrade"
    },
    upgrade2_stats: {
      base_price: 855,
      growth_rate: 1.28,
      current_price: 855,
      times_owned: 0,
      base_production: 0.225,
      multiplyer: 1.001,
      element_id: "upgrade2"
    },
    upgrade3_stats: {
      base_price: 5000,
      growth_rate: 1.25,
      current_price: 5000,
      times_owned: 0,
      base_production: 1.125,
      multiplyer: 1.0009,
      element_id: "upgrade3"
    },
    upgrade4_stats: {
      base_price: 18000,
      growth_rate: 1.6,
      current_price: 18000, // Note: I corrected this value, as there was a mismatch in the given data.
      times_owned: 0,
      base_production: 1.125,
      multiplyer: 1.0012,
      element_id: "upgrade4"
    }
  }
  return player;
}

// SAVE CODE
function save(player,auto_save){

  save_data = JSON.stringify(player)
  expiration_date = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  document.cookie = `savedata=${save_data}; expires=${expiration_date.toUTCString()}; path=/`
  if (auto_save){
    console.log("auto saved")
  }
  else{
    alert("game saved")
  }
}


function load(){
  if (document.cookie == ""){
    save(create_default_player(),true)
  }
  cookie = document.cookie
  cookie = cookie.replace('savedata=', '');
  player = JSON.parse(cookie)
  

}
// auto save is no longer very broken // it was broken due to my extreme blindness 
async function auto_save(){
  while (true){
    save(player,true)
    await sleep(25 * 1000)
  }
}

function reset_save(upgrade_stats){
  if (confirm("ARE YOU SURE YOU WANT TO RESET ALL YOUR PROGRESS")){
    save(create_default_player(),true)
    upgrade_stats = [player.upgrade1_stats, player.upgrade2_stats, player.upgrade3_stats, player.upgrade4_stats]
    for(i=0;i!=4;i++){
      formatted_stats = upgrade_stats[i]["current_price"].toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2})
      document.getElementById(upgrade_stats[i]["element_id"]).innerHTML = formatted_stats 
    }  
  }
}

// END OF SAVE CODE

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// init  
load()
upgrade_stats = [player.upgrade1_stats, player.upgrade2_stats, player.upgrade3_stats, player.upgrade4_stats]
upgrade_elements = ["upgrade","upgrade2","upgrade3","upgrade4"]
upgrade_elements_count = ["upgrade1_count","upgrade2_count","upgrade3_count","upgrade4_count"]

function init(upgrade_stats){
  for(i=0;i!=4;i++){
    document.getElementById("money").innerHTML = `$ ${player.money}`
    document.getElementById(upgrade_elements[i]).innerHTML = upgrade_stats[i]["current_price"].toLocaleString()
    document.getElementById(upgrade_elements_count[i]).innerHTML = upgrade_stats[i]["times_owned"]
    }

    
    update_income_per_sec(player.income)
    
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
  money_temp = Number(prompt("set money"))
    if (money_temp == 0){
      if (confirm("are you sure you want to reset your money")){
        player.money = money_temp
      }
    }
  
    else{
    player.money = money_temp
    }
}


// end of dev funtions


function earn_money(){
  player.money += player.click_amount
  
}


async function Update_money() {
  while (true) {
    player.money += player.income
    await sleep(45)  
  }
}

async function Display_update(upgrade_elements,upgrade_stats) {
    while (true) {
      formatted_number = player.money.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2})
      document.getElementById("money").innerHTML = `$ ${formatted_number}`
      document.getElementById("upgrade1_count").innerHTML = player.upgrade1_stats["times_owned"]
      document.getElementById("upgrade2_count").innerHTML = player.upgrade2_stats["times_owned"]
      document.getElementById("upgrade3_count").innerHTML = player.upgrade3_stats["times_owned"]
      document.getElementById("upgrade4_count").innerHTML = player.upgrade4_stats["times_owned"]
      for (i=0;i!=4;i++){
        element = document.getElementById(upgrade_elements[i])
      
      	if (player.money>=upgrade_stats[i]["current_price"]){
        	element.style.backgroundColor = "#464545"
      
      	}
		    else{
			    element.style.backgroundColor = "#303030"
		    }
    	} 
    update_income_per_sec(player.income)


    await sleep(45)  

  }
}

function update_income_per_sec(income){
    income_per_sec = income * 22.22222
    income_per_sec = income_per_sec.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2})
    document.getElementById("income_per_sec").innerHTML =  `income per sec: ${income_per_sec}`
}

function Upgrade(upgrade_stats){
    if (player.money >= upgrade_stats["current_price"]){
        // updates income
        if (upgrade_stats["times_owned"]!=0){
          player.income += (upgrade_stats["base_production"] * upgrade_stats["times_owned"] * upgrade_stats["multiplyer"])
          
        }
        else{
          player.income += upgrade_stats["base_production"]
        }
        // removes money
        player.money -= upgrade_stats["current_price"]
        // price update
        upgrade_stats["current_price"] = Math.pow(upgrade_stats["growth_rate"], upgrade_stats["times_owned"]) * upgrade_stats["base_price"]
        upgrade_stats["times_owned"]++
        // updates income per second
        update_income_per_sec(player.income)
        // updates html
        formatted_stats = upgrade_stats["current_price"].toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2})
        document.getElementById(upgrade_stats["element_id"]).innerHTML = formatted_stats
        
    }
}

async function main() {
  const tasks = [
    Display_update(upgrade_elements,upgrade_stats),
    Update_money(),
    auto_save()
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
