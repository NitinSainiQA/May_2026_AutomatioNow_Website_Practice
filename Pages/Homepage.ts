import {expect, Locator, Page} from "@playwright/test"

export class HomePage
{
    page : Page
    // locators
    MenuItems : Locator

    // constructor
    constructor(page : Page)
    {
        this.page = page

        this.MenuItems = page.locator('//div[@class="wp-block-group is-layout-flow wp-block-group-is-layout-flow"]//a')

    }

    // actions methods
    async CountMenuItems()
    {
        let count = await this.MenuItems.count()
        return count
    }

    async clickOnEachMenuItem()
    {
        for(let i=0; i<await this.MenuItems.count(); i++)
        {
            console.log((i+1) + ' menu item is : ' + await this.MenuItems.nth(i).innerText());
            await this.MenuItems.nth(i).click()
            await this.page.waitForLoadState('domcontentloaded')
            const url = this.page.url()
            console.log((i+1) + ' menu items url is : ' + url);
            
            
            await this.page.goBack({ waitUntil: 'domcontentloaded'})
            //await this.page.waitForLoadState('domcontentloaded')
            await expect(this.page).toHaveURL('https://practice-automation.com/')
        }
    }

    async ClickOnMenuItemByName(name : string)
    {
         for(let i=0; i<await this.MenuItems.count(); i++)
        {
            let menuitem : string = await this.MenuItems.nth(i).innerText()
            if(menuitem === name)
            {
            await this.MenuItems.nth(i).click()
            await this.page.waitForLoadState('domcontentloaded')
            const url = this.page.url()
            console.log((i+1) + ' menu items url is : ' + url);
            break            
            }
        }   

    }
}



