import { test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layout').click()
})


test('Locator syntax rules', async ({ page }) => {

    //by Tag name and select the first element
    await page.locator('input').first().click()

    //by id
    await page.locator('#inputEmail1').click()

    //by Class value
    page.locator('.shape-rectangle')

    //by attribute
    page.locator('[placeholder="Email"]')

    //by Class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selectors
    page.locator('input[placeholder="Email"][nbinput]')

    //by Xpath (NOT RECOMENDED)
    page.locator('//*[@id="inputEmail1"]')

    //by partial text match
    page.locator(':text("Using")')

    //by partial text match 
    page.locator(':text-is("Using the Grid")')

})

test('User facing locator', async ({page}) => {
    await page.getByRole('textbox', {name:"Email"}).first().click()
    await page.getByRole('button', {name:"Sign in"}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    //data-testid attribute
    //await page.getByTestId('IoT Dashboard').click()

    await page.getByTitle('IoT Dashboard').click()

})

test('locating child elements', async ({page}) => {
    //:text-is("Option 1")' child of nb-radio,  nb-radio child of nb-card
    // different locators separete by space
    await  page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await  page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 1")').click()

    await  page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()
 
    //nth(3) - index of element 0..n
    await  page.locator('nb-card').nth(3).getByRole('button').click()
})

test('locating parent elements', async ({page}) => {
    //the second argument - уточнення що цей елемент має specific child
    await  page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await  page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()

    await  page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()
    await  page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Email"}).click()

    await  page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: "Email"}).click()
    
    //locator('..') - one level up
    await  page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()
})