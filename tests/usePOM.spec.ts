import { test, expect } from '@playwright/test'
import { Pageanager } from '../page-objects/pageManager'
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutPage } from '../page-objects/formLayoutPage'
import { DatepickerPage } from '../page-objects/datePickerPage'

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test('navigate to form page', async ({ page }) => {
    //  const navigateTo = new NavigationPage(page)
    //   await navigateTo.formLayoutPage()
    const pm = new Pageanager(page)
    await pm.navigateTo().formLayoutPage()
})

test('parametrized methods', async ({ page }) => {

    const pm = new Pageanager(page) 

    await pm.navigateTo().formLayoutPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 2')
    await pm.navigateTo().datepickerPage()
    await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(5)
    await pm.onDatepickerPage().selectDatepickerWithRangefromToday(6, 15)
})