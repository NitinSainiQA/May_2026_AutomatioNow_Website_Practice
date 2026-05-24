import {test} from "@playwright/test"
import {BASE_URL} from "../BaseData"
import { Tables } from "../Pages/Tables"
import { HomePage } from "../Pages/Homepage"

test('Tables' , async({page})=>{
    test.setTimeout(600000)

    await page.goto(BASE_URL)

    let menuItem = new HomePage(page)
    await menuItem.ClickOnMenuItemByName('Tables')

    let table = new Tables(page)
    //await table.ReadDataFromSimpleTable()  
    await table.readDataFromSortableTable() 
    await table.getPopulationFromCountry('India') 
})