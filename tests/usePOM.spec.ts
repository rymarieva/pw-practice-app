import { test, expect } from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutPage } from '../page-objects/formLayoutPage'
import { DatepickerPage } from '../page-objects/datePickerPage'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test('navigate to form page', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutPage()
    //await navigateTo.datepickerPage()
})

test('parametrized methods', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormLayoutPage(page)
    const onDatepickerPage = new DatepickerPage(page)
    await navigateTo.formLayoutPage()
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 2')
    await navigateTo.datepickerPage()
    await onDatepickerPage.selectCommonDatePickerDateFromToday(5)
    await onDatepickerPage.selectDatepickerWithRangefromToday(6,15)
})