Feature: Додавання товарів у кошик
    Як авторизований користувач
    Я хочу додавати товари у кошик
    Щоб згодом оформити замовлення

    Background:
        Given я на сторінці логіну SauceDemo
        And я авторизуюсь як стандартний користувач

    Scenario: Додавання декількох товарів у кошик поспіль
        When я додаю товар "Sauce Labs Fleece Jacket" у кошик
        And я додаю товар "Sauce Labs Backpack" у кошик
        And я додаю товар "Sauce Labs Bike Light" у кошик
        Then кількість товарів у кошику має дорівнювати 3
        And іконка кошика має бути видимою

    Scenario Outline: Додавання одного товару в порожній кошик
        When я додаю товар "<productName>" у кошик
        Then кількість товарів у кошику має дорівнювати 1

        Examples:
            | productName               |
            | Sauce Labs Fleece Jacket  |
            | Sauce Labs Backpack       |
            | Sauce Labs Bike Light     |
