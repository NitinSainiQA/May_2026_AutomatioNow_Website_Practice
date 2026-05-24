import {expect, Locator, Page} from "@playwright/test"

export class Tables
{
    page : Page

    //locator
    simpleTable : Locator
    sortableTable : Locator
    
    //constructor
    constructor(page : Page)
    {
        this.page = page
        this.simpleTable = page.locator('//figure[@class="wp-block-table"]//tbody//tr')
        this.sortableTable = page.locator('//div[@id="tablepress-1_wrapper"]//tbody//tr')
    }

    //actions methods
    async ReadDataFromSimpleTable()
    {
        let count = await this.simpleTable.count()
        console.log('count of rows are : ' , count);
        expect(count).toBeGreaterThan(0)
        for(let i=1; i<count; i++)
            {
               const col =  this.simpleTable.nth(i).locator('td')
               const colcount = await col.count()

               let rowData : string[] =  []
               for(let j=0; j<colcount; j++) 
                {
                    const celltext = await col.nth(j).innerText()
                    rowData.push(celltext.trim())
                }  
                
                console.log('rowdata is : ' , rowData);               
            }        
    }

    async readDataFromSortableTable()
    {
        let count = await this.sortableTable.count()
        console.log('rows in tabel are : ',count) 
        console.log('row wise data is : ');

        console.log('total number of columns are : ' , await this.sortableTable.first().locator('td').count());

        for(let i=0; i<count; i++)
        {
            let rowdata : string[] = []

            const col = this.sortableTable.nth(i).locator('td')
            const colcount = await col.count()
            
            for(let j=0; j<colcount; j++)
            {
                const coldata = await col.nth(j).innerText()
                rowdata.push(coldata.trim())
            }
            console.log('row data for row ' + (i+1) + ' is : '+rowdata);
        }

    }

    async getPopulationFromCountry(countryName : string)
    {
        let population : string = await this.page.locator(
            `//div[@class="dt-layout-row dt-layout-table"]//tbody//td[text()="${countryName}"]/following-sibling::td`
             ).innerText()

        console.log(`Population of ${countryName} is : ` , population );  
    }
}