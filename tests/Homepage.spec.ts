import {test} from "@playwright/test"
import {HomePage} from "../Pages/Homepage"
import {BASE_URL} from "../BaseData"

test('HomePage' , async({page})=>{

    test.setTimeout(600000)

        await page.goto(BASE_URL)

    let homepage = new HomePage(page)
    
    // Get number of menuitems
    const menuItems = await homepage.CountMenuItems() 
    console.log('Total number of menuitems are : ' , menuItems);  

    // Click on each menuItem
    //await homepage.clickOnEachMenuItem()

    // click menuitemByName
    await homepage.ClickOnMenuItemByName('File Upload')


})