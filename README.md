# 🎭 Playwright BDD — Desde Cero hasta un Framework Profesional

> Proyecto educativo para aprender automatización de pruebas construyendo un framework real paso a paso con **Playwright + TypeScript**, evolucionando posteriormente hacia **BDD, Page Object Model y buenas prácticas de arquitectura**.

---

## 🎯 Objetivo del proyecto

Este repositorio nace con una idea simple:

> **No aprender solamente a escribir tests. Aprender a construir un framework de automatización.**

La propuesta es comenzar desde una instalación limpia de Playwright e ir incorporando progresivamente conceptos y herramientas utilizadas en proyectos reales de QA Automation.

Cada evolución del proyecto tendrá un propósito técnico claro.

```text
Playwright
    ↓
TypeScript
    ↓
BDD
    ↓
Page Object Model
    ↓
BasePage
    ↓
Fixtures
    ↓
Tags
    ↓
Reporting
    ↓
CI/CD
```

La intención es poder entender **qué agregamos, por qué lo agregamos y qué problema resuelve**.

---

# 🚀 Estado actual

Actualmente el proyecto se encuentra en su primera etapa:

```text
✅ Proyecto Playwright creado
✅ TypeScript configurado
✅ Browsers instalados
✅ Test inicial funcionando
✅ Scripts básicos de ejecución
✅ Repositorio versionado

⏳ BDD
⏳ Page Object Model
⏳ BasePage
⏳ Fixtures
⏳ Reporting
⏳ CI/CD
```

En este punto estamos trabajando con **Playwright Test puro**.

BDD será incorporado posteriormente utilizando `playwright-bdd`.

---

# 🧰 Stack tecnológico

| Tecnología | Uso |
|---|---|
| 🎭 Playwright | Automatización Web E2E |
| 🔷 TypeScript | Lenguaje principal |
| 🟢 Node.js | Runtime |
| 🥒 BDD | Definición de escenarios |
| 🎭 playwright-bdd | Integración BDD con Playwright Test |
| 📄 Gherkin | Escritura de Features |
| 🧱 Page Object Model | Organización de páginas |
| 🔀 Git | Versionado del proyecto |
| ⚙️ CI/CD | Ejecución automatizada |

---

# 🏁 Crear un proyecto Playwright desde cero

Antes de construir un framework necesitamos crear una base funcional.

## 1️⃣ Verificar Node.js

```bash
node --version
```

También podemos verificar npm:

```bash
npm --version
```

---

## 2️⃣ Crear una carpeta para el proyecto

```bash
mkdir playwright-bdd
```

Ingresamos:

```bash
cd playwright-bdd
```

---

## 3️⃣ Crear el proyecto Playwright

Ejecutamos el asistente oficial:

```bash
npm init playwright@latest
```

Durante la instalación seleccionamos:

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

Playwright creará automáticamente la estructura inicial del proyecto.

---

# 📁 Estructura inicial

Actualmente nuestro proyecto se parece a esto:

```text
playwright-bdd/
│
├── tests/
│   └── example.spec.ts
│
├── tests-examples/
│
├── playwright.config.ts
├── package.json
├── package-lock.json
└── .gitignore
```

### `playwright.config.ts`

Es el archivo principal de configuración de Playwright.

Más adelante configuraremos aquí elementos como:

```text
Browsers
Base URL
Timeouts
Retries
Screenshots
Videos
Traces
Reporters
Projects
BDD
```

---

# ▶️ Ejecutar los tests

El proyecto cuenta actualmente con tres formas básicas de ejecución.

### Ejecución normal

```bash
npm test
```

Equivale a:

```bash
npx playwright test
```

---

### Ejecución mostrando el navegador

```bash
npm run test:headed
```

Equivale a:

```bash
npx playwright test --headed
```

---

### Playwright UI Mode

```bash
npm run test:ui
```

Permite ejecutar, inspeccionar y depurar los tests utilizando la interfaz gráfica de Playwright.

---

# 📦 Scripts actuales

Actualmente nuestro `package.json` contiene:

```json
{
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:ui": "playwright test --ui"
  }
}
```

Estos scripts irán creciendo junto con el framework.

Más adelante podremos tener ejecuciones como:

```bash
npm run test:smoke

npm run test:regression

npm run test:headed

npm run test:bdd

npm run test:chrome

npm run test:firefox
```

---

# 🧪 Nuestra primera aplicación de pruebas

Durante el curso utilizaremos principalmente:

### SauceDemo

```text
https://www.saucedemo.com/
```

Esta aplicación nos permitirá trabajar progresivamente con:

- Login
- Validaciones
- Productos
- Filtros
- Carrito
- Checkout
- Escenarios positivos
- Escenarios negativos
- Flujos End-to-End

La aplicación irá creciendo con nosotros en complejidad.

---

# 🥒 Próximo paso: BDD

Nuestro proyecto actualmente utiliza tests tradicionales de Playwright:

```typescript
import { test, expect } from '@playwright/test';

test('ejemplo', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

});
```

Más adelante evolucionaremos hacia escenarios BDD:

```gherkin
Feature: Login

  Scenario: Login exitoso

    Given el usuario se encuentra en la página de login
    When ingresa credenciales válidas
    Then debería visualizar el inventario
```

La integración será realizada con:

```text
playwright-bdd
```

La idea es mantener **Playwright Test como runner** y agregar la capa BDD sobre él.

Conceptualmente tendremos:

```text
Feature
   ↓
Step Definition
   ↓
Page Object
   ↓
Playwright
   ↓
Browser
```

---

# 🧱 Arquitectura objetivo

No construiremos toda esta estructura de una vez.

Llegaremos a ella progresivamente.

```text
playwright-bdd/
│
├── features/
│   ├── login.feature
│   ├── inventory.feature
│   └── checkout.feature
│
├── src/
│   │
│   ├── pages/
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   ├── CartPage.ts
│   │   └── CheckoutPage.ts
│   │
│   ├── steps/
│   │   ├── login.steps.ts
│   │   └── checkout.steps.ts
│   │
│   ├── fixtures/
│   │
│   └── core/
│       └── BasePage.ts
│
├── playwright.config.ts
├── package.json
└── README.md
```

Cada carpeta aparecerá cuando exista una necesidad real para crearla.

---

# 🧠 Evolución de la arquitectura

Uno de los objetivos principales será pasar de esto:

```text
TEST
 ↓
PLAYWRIGHT
 ↓
BROWSER
```

a esto:

```text
FEATURE
   ↓
STEPS
   ↓
PAGE OBJECTS
   ↓
BASE PAGE
   ↓
PLAYWRIGHT
   ↓
BROWSER
```

Esto nos permitirá introducir conceptos como:

```text
Encapsulamiento
Herencia
Abstracción
Polimorfismo
Reutilización
Separación de responsabilidades
Mantenibilidad
```

Pero los iremos incorporando cuando realmente tengan sentido.

---

# 🗺️ Roadmap del proyecto

| Etapa | Tema | Estado |
|---|---|---|
| 01 | Instalación de Playwright | ✅ |
| 02 | Primer test | ✅ |
| 03 | Scripts de ejecución | ✅ |
| 04 | README y documentación | 🚧 |
| 05 | playwright-bdd | ⏳ |
| 06 | Primer Feature | ⏳ |
| 07 | Step Definitions | ⏳ |
| 08 | Page Object Model | ⏳ |
| 09 | BasePage | ⏳ |
| 10 | Herencia | ⏳ |
| 11 | Fixtures | ⏳ |
| 12 | Polimorfismo | ⏳ |
| 13 | Test Data | ⏳ |
| 14 | Tags | ⏳ |
| 15 | Screenshots / Trace / Video | ⏳ |
| 16 | Reporting | ⏳ |
| 17 | Variables de entorno | ⏳ |
| 18 | Multi-browser | ⏳ |
| 19 | CI/CD | ⏳ |

---

# 🌳 Estrategia de branches

El repositorio también será utilizado para aprender una forma ordenada de evolucionar un proyecto.

```text
main
 │
 ├── feature/01-readme
 │
 ├── feature/02-playwright-bdd
 │
 ├── feature/03-first-feature
 │
 ├── feature/04-page-object-model
 │
 ├── feature/05-base-page
 │
 ├── feature/06-fixtures
 │
 ├── feature/07-tags
 │
 ├── feature/08-reporting
 │
 └── feature/09-ci
```

La rama:

```text
main
```

representará siempre una versión estable del proyecto.

Cada concepto nuevo será desarrollado de forma aislada y luego incorporado mediante un Merge Request / Pull Request.

---

# 💡 Filosofía del repositorio

Este repositorio no pretende mostrar solamente el resultado final.

Pretende mostrar **el camino para llegar hasta él**.

Por eso evitaremos comenzar directamente con:

```text
BDD
+ POM
+ BasePage
+ Fixtures
+ Hooks
+ Reports
+ CI/CD
```

sin entender qué necesidad resuelve cada pieza.

La evolución será:

```text
Primero funciona.

Después organizamos.

Después reutilizamos.

Después abstraemos.

Después escalamos.
```

---

# 🎯 Objetivo final

Al finalizar, tendremos un framework capaz de ejecutar escenarios:

```text
BDD
   ↓
Playwright
   ↓
Page Object Model
   ↓
Fixtures
   ↓
Multi Browser
   ↓
Reports
   ↓
CI/CD
```

pero, más importante todavía:

> **Vamos a entender cómo y por qué fue construido.**

---

## 👨‍💻 QA Automation Learning Project

Proyecto creado con fines educativos para aprender automatización de pruebas desde sus fundamentos hasta una arquitectura profesional.

### 🎭 Playwright + 🔷 TypeScript + 🥒 BDD

---

> ⭐ **Automatizar no es solamente hacer que un test corra.  
> Es diseñar una solución que podamos mantener mañana.**