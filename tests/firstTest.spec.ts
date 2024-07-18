import {test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})


test.describe('suite1', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
    })
    
    test('the first test', async({page}) => {
     await page.getByText('Form Layout').click()
    })
    
    test('navigete to datepicker page', async({page}) => {
        await page.getByText('Datepicker').click()
    })
})

test.describe('suite1', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Charts').first().click()
    })
    
    test('navigete to Echarts page', async({page}) => {
        await page.getByText('Echarts').click()
    })
})