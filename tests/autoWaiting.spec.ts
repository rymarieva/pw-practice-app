import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}, testInfo) => {
    await page.goto(process.env.URL)
    await page.getByText('Button Triggering AJAX Request').click()
    //збільшуємо таймаут для сьюта на 2 сек
    testInfo.setTimeout(testInfo.timeout + 2000) 
})

test('auto waiting', async ({page}) => {
    const successButton = page.locator('.bg-success')
    //await successButton.click()
    //const text = await successButton.textContent()
    await successButton.waitFor({state: 'attached'})
    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

test('auto waiting with locator asserts', async ({page}) => {
    const successButton = page.locator('.bg-success')
        await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test('alternative waits', async ({page}) => {
    //test.setTimeout(10000) 
    //test.slow() - *3 for basic timeout
    const successButton = page.locator('.bg-success')
    // wait for selector
    await page.waitForSelector('.bg-success')

    //wait for particular response
    await page.waitForResponse('http://www.uitestingplayground.com/ajaxdata')

    //waite for network calls to be complited (not recomended)
    //await page.waitForLoadState('networkidle')
    
    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})