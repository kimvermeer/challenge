import { Selector } from 'testcafe';

fixture('Form').page(`localhost:3000`);

const inputValidation = Selector('p').withText('Value should start with `@`');

test('Validate input with wrong value', async t => {
  await t
    .click('#a1-checkbox')
    .click('input[name="B1"] + label')
    .typeText('#text-input', 'test')
    .click('#text-input + button')
    .expect(inputValidation.count)
    .eql(1);
});


test('Validate input with correct value', async t => {
  await t
    .click('#a1-checkbox')
    .click('input[name="B1"] + label')
    .typeText('#text-input', '@test')
    .click('#text-input + button')
    .expect(inputValidation.count)
    .eql(0);
});
