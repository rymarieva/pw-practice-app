import { Page } from "@playwright/test"

export class FormLayoutPage {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }
    
    /**
     * This method fill out the Using the Grid form
     * @param email - valid email for test user
     * @param password - valid password for test user
     * @param optionText - name of radio button
     */
    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string) {
        const usingTheGridForm = this.page.locator('nb-card', { hasText: 'Using the Grid' })
        await usingTheGridForm.getByRole('textbox', { name: 'Email' }).fill(email)
        await usingTheGridForm.getByRole('textbox', { name: 'Password' }).fill(password)
        await usingTheGridForm.getByRole('radio', { name: optionText }).check({ force: true })
        await usingTheGridForm.getByRole('button').click()
    }
}