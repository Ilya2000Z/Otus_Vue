import { test, expect } from '@playwright/test'

test.describe('Эмуляция авторизации через localStorage', () => {
  test('при наличии customer в localStorage пользователь считается авторизованным', async ({
    page,
    context,
  }) => {
    await context.addInitScript(() => {
      const customer = {
        name: 'Авторизованный',
        email: 'auth@test.ru',
        address: { country: 'РФ', city: 'Москва', street: 'Тверская', house: '1' },
      }
      localStorage.setItem('customer', JSON.stringify(customer))
    })
    await page.goto('/')
    await expect(page.getByText('Авторизованный')).toBeVisible()
    await expect(page.getByRole('button', { name: /выйти/i })).toBeVisible()
  })

  test('без customer в localStorage показывается ссылка Войти', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.removeItem('customer'))
    await page.reload()
    await expect(page.getByRole('link', { name: /войти/i })).toBeVisible()
  })
})
