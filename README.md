# 🎭 Playwright BDD — De cero a un Framework de Automatización

> Proyecto educativo para aprender automatización construyendo un framework real paso a paso con **Playwright + TypeScript**, evolucionando progresivamente hacia **Page Object Model, BDD, reutilización, reporting y CI/CD**.

---

## 🎯 Objetivo del proyecto

Este repositorio parte de una idea:

> **No aprender solamente a escribir tests. Aprender a construir y evolucionar un framework de automatización.**

Comenzamos con Playwright puro y vamos incorporando nuevas capas únicamente cuando aparece una necesidad real.

```text
Primero funciona
      ↓
Después observamos
      ↓
Después organizamos
      ↓
Después reutilizamos
      ↓
Después abstraemos
      ↓
Después escalamos
```

La intención es entender siempre:

```text
¿Qué problema tenemos?
        ↓
¿Qué solución incorporamos?
        ↓
¿Qué mejora obtenemos?
```

---

# 🚀 Evolución del proyecto

Actualmente recorrimos estas primeras etapas:

```text
Playwright
    ↓
Tests reales con SauceDemo
    ↓
Page Object Model
    ↓
BasePage
    ↓
Herencia básica
    ↓
BDD                  ← Próximo paso
    ↓
Fixtures
    ↓
Reporting
    ↓
CI/CD
```

---

# 📍 Estado actual

Actualmente el proyecto cuenta con:

```text
✅ Playwright + TypeScript
✅ Scripts básicos de ejecución
✅ Tests reales con SauceDemo
✅ Login positivo y negativo
✅ Validaciones de Products
✅ Page Object Model
✅ BasePage
✅ Herencia básica
✅ Separación entre tests y páginas

⏳ playwright-bdd
⏳ Features
⏳ Step Definitions
⏳ Fixtures
⏳ Test Data
⏳ Tags
⏳ Reporting
⏳ CI/CD
```

---

# 🧰 Stack tecnológico

| Tecnología | Uso |
|---|---|
| 🎭 Playwright | Automatización Web E2E |
| 🔷 TypeScript | Lenguaje principal |
| 🟢 Node.js | Runtime |
| 🧱 Page Object Model | Separación entre tests y páginas |
| 🧬 Herencia | Reutilización mediante BasePage |
| 🥒 Gherkin | Escenarios BDD futuros |
| 🎭 playwright-bdd | Integración futura con BDD |
| 🔀 Git | Versionado |
| ⚙️ CI/CD | Automatización futura |

---

# 🏁 Crear un proyecto Playwright desde cero

## 1️⃣ Verificar Node.js

```bash
node --version
npm --version
```

---

## 2️⃣ Crear la carpeta

```bash
mkdir playwright-bdd
cd playwright-bdd
```

---

## 3️⃣ Inicializar Playwright

```bash
npm init playwright@latest
```

Durante la instalación utilizamos:

```text
Language
→ TypeScript

Tests folder
→ tests

GitHub Actions
→ No (por ahora)

Install Playwright browsers
→ Yes
```

---

# 🧪 Aplicación de pruebas

Utilizamos:

```text
https://www.saucedemo.com/
```

SauceDemo nos permite trabajar progresivamente con:

```text
Login
Products
Filtros
Carrito
Checkout
Validaciones
Escenarios negativos
Flujos End-to-End
```

---

# 🧪 Primera etapa — Tests directos

Inicialmente nuestros tests utilizaban Playwright directamente.

Ejemplo:

```typescript
await page.locator('#user-name').fill('standard_user');
await page.locator('#password').fill('secret_sauce');
await page.locator('#login-button').click();
```

Nuestra arquitectura era:

```text
TEST
 ↓
PLAYWRIGHT
 ↓
BROWSER
 ↓
SAUCEDEMO
```

Esto nos permitió aprender primero conceptos fundamentales como:

```text
page.goto()
locator()
fill()
click()
expect()
beforeEach()
```

---

# 🤔 El problema

Cuando comenzamos a agregar más pruebas aparecieron comportamientos repetidos.

Por ejemplo, el login era utilizado tanto por:

```text
login.spec.ts
```

como por:

```text
products.spec.ts
```

También los locators comenzaron a estar distribuidos directamente dentro de los tests.

Esto genera preguntas importantes:

```text
¿Qué pasa si cambia un locator?

¿Dónde debería vivir la lógica del login?

¿Debe un test conocer el HTML de la página?

¿Qué pasa cuando tengamos 50 tests?
```

Para comenzar a resolver esos problemas incorporamos:

# 🧱 Page Object Model

---

# 🧱 Arquitectura actual

Nuestra estructura actual es:

```text
playwright-bdd/
│
├── src/
│   │
│   ├── pages/
│   │   ├── basePage.ts
│   │   ├── loginPage.ts
│   │   └── productsPage.ts
│   │
│   └── tests/
│       ├── login.spec.ts
│       └── products.spec.ts
│
├── playwright.config.ts
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

Ahora las responsabilidades están separadas.

---

# 🧠 Nueva arquitectura

Antes:

```text
TEST
 ↓
PLAYWRIGHT
 ↓
BROWSER
```

Ahora:

```text
TEST
 ↓
PAGE OBJECT
 ↓
BASE PAGE
 ↓
PLAYWRIGHT
 ↓
BROWSER
```

---

# 🧱 BasePage

Archivo:

```text
src/pages/basePage.ts
```

`BasePage` contiene comportamientos comunes que pueden reutilizar las diferentes páginas.

Actualmente contiene operaciones básicas como:

```text
navigate()
click()
fill()
```

Conceptualmente:

```text
          BasePage
             ↑
       ┌─────┴─────┐
       │           │
  LoginPage   ProductsPage
```

Esto nos permite comenzar a trabajar con **herencia**.

---

# 🔐 LoginPage

Archivo:

```text
src/pages/loginPage.ts
```

Esta página conoce:

```text
usernameInput
passwordInput
loginButton
errorMessage
```

y ofrece comportamientos como:

```typescript
loginPage.goToLogin();

loginPage.login(
  'standard_user',
  'secret_sauce'
);
```

El test ya no necesita conocer:

```text
#user-name
#password
#login-button
```

La responsabilidad de conocer esos elementos pertenece ahora a `LoginPage`.

---

# 🛒 ProductsPage

Archivo:

```text
src/pages/productsPage.ts
```

Esta página concentra elementos y acciones relacionadas con Products.

Por ejemplo:

```typescript
await productsPage.openProduct(
  'Sauce Labs Backpack'
);
```

También permite acceder a elementos como:

```text
Título de Products
Listado de productos
Nombre del producto
Precio del producto
```

---

# 🧪 ¿Cómo cambió nuestro test?

Antes:

```typescript
await page.locator('#user-name').fill('standard_user');
await page.locator('#password').fill('secret_sauce');
await page.locator('#login-button').click();

await page.getByText('Sauce Labs Backpack').click();
```

Ahora:

```typescript
await loginPage.login(
  'standard_user',
  'secret_sauce'
);

await productsPage.openProduct(
  'Sauce Labs Backpack'
);
```

Esto hace que el test sea más fácil de leer.

Pasamos de describir:

```text
CÓMO interactuamos con el HTML
```

a describir:

```text
QUÉ acción realiza el usuario
```

---

# 🎯 Responsabilidades

Actualmente buscamos mantener esta separación:

```text
TEST
│
├── Define el escenario
├── Ejecuta las acciones
└── Realiza las validaciones

PAGE OBJECT
│
├── Conoce los locators
└── Conoce las acciones de la página

BASE PAGE
│
└── Contiene comportamientos reutilizables

PLAYWRIGHT
│
└── Interactúa con el navegador
```

Por ahora mantenemos los:

```typescript
expect(...)
```

dentro de los tests.

Los Page Objects contienen principalmente:

```text
Locators
+
Acciones
```

---

# ▶️ Ejecutar los tests

Todos los tests:

```bash
npm test
```

Modo headed:

```bash
npm run test:headed
```

UI Mode:

```bash
npm run test:ui
```

Solo Login:

```bash
npx playwright test login.spec.ts
```

Solo Products:

```bash
npx playwright test products.spec.ts
```

---

# ⚙️ Configuración de Playwright

Como nuestros tests ahora se encuentran dentro de:

```text
src/tests/
```

nuestro `playwright.config.ts` utiliza:

```typescript
testDir: './src/tests',
```

Playwright buscará allí nuestros archivos:

```text
*.spec.ts
```

---

# 📦 Scripts actuales

Actualmente tenemos:

```json
{
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:ui": "playwright test --ui"
  }
}
```

Todavía mantenemos los scripts simples.

Los iremos ampliando cuando agreguemos nuevas capacidades.

---

# 🧠 ¿Por qué BasePage todavía es pequeño?

Podríamos agregar inmediatamente decenas de métodos:

```text
waitForElement()
scroll()
doubleClick()
hover()
selectOption()
getText()
takeScreenshot()
```

Pero no lo haremos todavía.

> **BasePage crecerá solamente cuando aparezca una necesidad real de reutilización.**

La arquitectura debe resolver problemas.

No crearlos.

---

# 🥒 Próxima evolución — BDD

Nuestra siguiente etapa será incorporar:

```text
playwright-bdd
```

Actualmente tenemos:

```text
login.spec.ts
products.spec.ts
```

La siguiente evolución introducirá:

```text
.feature
+
Step Definitions
```

Por ejemplo:

```gherkin
Feature: Login

  Scenario: Login exitoso

    Given el usuario se encuentra en la página de login
    When ingresa credenciales válidas
    Then debería visualizar los productos
```

Nuestra arquitectura comenzará a evolucionar hacia:

```text
FEATURE
   ↓
STEPS
   ↓
PAGE OBJECT
   ↓
BASE PAGE
   ↓
PLAYWRIGHT
   ↓
BROWSER
```

---

# 🏗️ Arquitectura futura

El proyecto seguirá creciendo progresivamente.

```text
playwright-bdd/
│
├── features/
│
├── src/
│   │
│   ├── pages/
│   │
│   ├── steps/
│   │
│   ├── fixtures/
│   │
│   ├── core/
│   │
│   └── test-data/
│
├── playwright.config.ts
├── package.json
└── README.md
```

No crearemos estas carpetas hasta necesitarlas.

---

# 🗺️ Roadmap

| Etapa | Tema | Estado |
|---|---|---|
| 01 | Instalación de Playwright | ✅ |
| 02 | Primer test | ✅ |
| 03 | Tests SauceDemo | ✅ |
| 04 | Login positivo y negativo | ✅ |
| 05 | Tests Products | ✅ |
| 06 | Page Object Model básico | ✅ |
| 07 | BasePage | ✅ |
| 08 | Herencia básica | ✅ |
| 09 | playwright-bdd | ⏳ |
| 10 | Features | ⏳ |
| 11 | Step Definitions | ⏳ |
| 12 | Fixtures | ⏳ |
| 13 | Test Data | ⏳ |
| 14 | Tags | ⏳ |
| 15 | Reporting | ⏳ |
| 16 | Variables de entorno | ⏳ |
| 17 | Multi-browser | ⏳ |
| 18 | CI/CD | ⏳ |

---

# 💡 Filosofía del proyecto

La evolución del framework seguirá siempre esta lógica:

```text
Primero funciona.

Después detectamos el problema.

Después buscamos una solución.

Después refactorizamos.

Después reutilizamos.

Después escalamos.
```

No queremos crear arquitectura solamente porque existe un patrón.

Queremos entender:

> **qué problema resuelve ese patrón.**

---

# 🎯 Objetivo final

El objetivo es evolucionar progresivamente hacia un framework con:

```text
BDD
   ↓
Step Definitions
   ↓
Page Object Model
   ↓
BasePage
   ↓
Fixtures
   ↓
Test Data
   ↓
Tags
   ↓
Reporting
   ↓
Multi Browser
   ↓
CI/CD
```

Pero el verdadero objetivo del repositorio es:

> **Entender cómo se construye un framework desde cero y por qué tomamos cada decisión técnica.**

---

## 👨‍💻 QA Automation Learning Project

### 🎭 Playwright + 🔷 TypeScript + 🧱 POM + 🥒 BDD

> ⭐ **Primero hacemos que funcione. Después hacemos que sea mantenible.**