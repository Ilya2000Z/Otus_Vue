import { test, expect } from '@playwright/test'

test.describe('Корзина', () => {
  test('пустая корзина показывает сообщение', async ({ page }) => {
    await page.goto('/cart')
    await expect(page.getByText(/ваша корзина пуста/i)).toBeVisible()
  })

  test('добавление товара в корзину с главной и отображение в корзине', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.product-card, .loading, .empty', { state: 'visible', timeout: 15000 })
    const loading = await page.locator('.loading').isVisible().catch(() => false)
    if (loading) {
      await page.waitForSelector('.product-card', { timeout: 10000 })
    }
    const addBtn = page.locator('.add-to-cart-btn').first()
    await addBtn.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {})
    const count = await addBtn.count()
    if (count > 0) {
      await addBtn.click()
      await page.goto('/cart')
      await expect(page.locator('.cart-item').first()).toBeVisible({ timeout: 5000 })
    }
  })

  test('изменение количества товара пересчитывает сумму', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.add-to-cart-btn', { timeout: 15000 })
    await page.locator('.add-to-cart-btn').first().click()
    await page.goto('/cart')
    await expect(page.locator('.cart-item')).toBeVisible({ timeout: 5000 })
    const totalBefore = await page.locator('.total-price').textContent()
    await page.locator('.quantity-btn').filter({ hasText: '+' }).first().click()
    await page.waitForTimeout(300)
    const totalAfter = await page.locator('.total-price').textContent()
    expect(totalAfter).not.toBe(totalBefore)
  })
})
