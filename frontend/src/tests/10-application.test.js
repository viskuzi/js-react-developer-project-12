// @ts-check
/* eslint-disable no-useless-escape */

import { test, expect } from '@playwright/test';

const user = {
  login: 'user',
  password: 'password',
};

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(300);

  await page.locator('text=Hexlet Chat').first().click();
});

test.describe('registration', () => {
  test('handle new user creation', async ({ page }) => {
    await page.locator('text=Регистрация').first().click();
    await page.waitForURL('**/signup');
    await page.locator('text=Имя пользователя').first().type(user.login);
    await page.locator('text=/^Пароль$/').first().type(user.password);
    await page.locator('text=Подтвердите пароль').first().type(user.password);
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL('**/');
  });

  test('handle validation', async ({ page }) => {
    await page.locator('text=Регистрация').first().click();
    await page.waitForURL('**/signup');

    await page.locator('text=Имя пользователя').first().type('u');
    await page.locator('text=/^Пароль$/').first().type('pass');
    await page.locator('text=Подтвердите пароль').first().type('passw');
    await page.locator('button[type="submit"]').first().click();
    expect(await page.$('text=От 3 до 20 символов')).not.toBeNull();
    expect(await page.$('text=Не менее 6 символов')).not.toBeNull();
    expect(await page.$('text=Пароли должны совпадать')).not.toBeNull();
  });
});

test.describe('auth', () => {
  test('login page on enter as guest', async ({ page }) => {
    expect(await page.$('text=Ваш ник')).not.toBeNull();
    expect(await page.$('text=/^Пароль$/')).not.toBeNull();
  });

  test('successful login', async ({ page }) => {
    await page.locator('text=Ваш ник').first().type('admin');
    await page.locator('text=/^Пароль$/').first().type('admin');
    await page.locator('button[type="submit"]').first().click();

    expect(await page.$('text=Неверные имя пользователя или пароль')).toBeNull();
  });

  test('handle login error', async ({ page }) => {
    await page.locator('text=Ваш ник').first().type('guest');
    await page.locator('text=/^Пароль$/').first().type('pass');
    await page.locator('button[type="submit"]').first().click();

    expect(await page.$('text=Неверные имя пользователя или пароль')).not.toBeNull();
  });
});

test.describe('chat', () => {
  test.beforeEach(async ({ page }) => {
    await page.locator('text=Ваш ник').first().type('admin');
    await page.locator('text=/^Пароль$/').first().type('admin');
    await page.locator('button[type="submit"]').first().click();
    await page.locator('[aria-label="Новое сообщение"]');
  });

  test('messaging', async ({ page }) => {
    await page.locator('[aria-label="Новое сообщение"]').first().type('hello');
    await page.keyboard.press('Enter');
    expect(await page.$('text=hello')).not.toBeNull();
  });

  test('profanity filter', async ({ page }) => {
    const profanityText = 'you have nice boobs';
    await page.locator('[aria-label="Новое сообщение"]').first().type(profanityText);
    await page.keyboard.press('Enter');
    expect(await page.locator(`text=${profanityText}`, { timeout: 0 })).not.toBe();
    expect(await page.locator('text="you have nice *****"', { timeout: 30000 })).not.toBeNull();
  });

  test('different channels', async ({ page }) => {
    await page.locator('[aria-label="Новое сообщение"]').first().type('message for general');
    await page.keyboard.press('Enter');
    expect(await page.$('text=message for general')).not.toBeNull();
    await page.locator('text=random').first().click();
    expect(await page.$("text='message for general'")).toBeNull();
    await page.locator('[aria-label="Новое сообщение"]').first().type('message for random');
    await page.keyboard.press('Enter');
    expect(await page.$('text=message for random')).not.toBeNull();
  });

  test('adding channel', async ({ page }) => {
    await page.locator('text=+').first().click();
    await page.locator('text=Имя канала').first().type('test channel');
    await page.keyboard.press('Enter');

    expect(await page.locator('text=Канал создан')).toBeVisible();
    expect(await page.$('text=test channel')).not.toBeNull();
  });

  test('rename channel', async ({ page }) => {
    await page.locator('text="Управление каналом"').first().click();
    await page.locator('text=Переименовать').first().click();
    const input = await page.locator('text=Имя канала');
    await input.fill('');
    await input.first().type('new test channel');
    await page.keyboard.press('Enter');

    await expect(await page.locator('text=Канал переименован')).toBeVisible();
    expect(await page.locator('text="# new test channel"')).not.toBeNull();
    // await expect(await page.$('text="# new test channel"')).not.toBeNull();
  });

  test('remove channel', async ({ page }) => {
    await page.locator('text=Управление каналом').first().click();
    await page.locator('text=Удалить').first().click();

    await page.locator('button.btn-danger').first().click();

    await expect(await page.locator('text=Канал удалён')).toBeVisible();

    await page.waitForSelector('.modal', { state: 'hidden' });

    await expect(await page.$('text=# new test channel')).toBeNull();
  });
});
