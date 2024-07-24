import { expect, test } from '@playwright/test'
import * as assert from 'assert'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    
})

test.describe('Form Layouts page', () => {
    
    test.beforeEach(async ({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layout').click()
    })

    test('input fields', async({page}) => {
        const emailField = page.locator('nb-card',{hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'})
        await emailField.fill('test@test.com')
        await emailField.clear()
        await emailField.pressSequentially('test2@test.com', {delay:200})

        //generic assertion
        const emailFieldValue = await emailField.inputValue()
        expect(emailFieldValue).toEqual('test2@test.com')
        
        //locator assertion 
        expect(emailField).toHaveValue('test2@test.com')
    })

    test('radio buttons', async({page})=> {
        const usingTheGridForm = page.locator('nb-card',{hasText: 'Using the Grid'})

        await usingTheGridForm.getByLabel('Option 1').check({force:true})
        await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).check({force:true})
        
        //generic assertion
        const radioButtonStatus = await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).isChecked()
        expect(radioButtonStatus).toBeTruthy()

        //locator assertion 
        expect(usingTheGridForm.getByRole('radio', {name: 'Option 2'})).toBeChecked()

    })
})

test('Check boxes', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()
    await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force:true})
    await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force:true})

    const allCheckboxes = page.getByRole('checkbox')
    for (const box of await allCheckboxes.all()) {
        await box.check({force:true})
        expect(box.isChecked()).toBeTruthy()
    }
})

test('Drop down menu', async({page})=> {
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()
    //list for ul, listitem for il
    //page.getByRole('list')

    //const optionList = page.getByRole('list').locator('nb-option')
    const optionList = page.locator('nb-option-list nb-option')
    expect(optionList).toHaveText(["Light","Dark","Cosmic","Corporate"])
    await optionList.filter({hasText: 'Dark'}).click()
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(34, 43, 69)')

    const colors ={
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }
   
    for(const color in colors){
        await dropDownMenu.click()
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
    }

})

test('dialog box', async({page}) =>{
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    page.on('dialog',dialog => {
        expect(dialog.message()).toEqual("Are you sure you want to delete?")
        dialog.accept()
    })

    await page.getByRole('table').locator('tr', {hasText: 'mdo@gmail.com'}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
})