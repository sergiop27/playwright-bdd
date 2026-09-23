# 🎭 Playwright BDD — De cero a un Framework de Automatización

> Proyecto educativo para aprender automatización construyendo un framework real paso a paso con **Playwright + TypeScript**, evolucionando posteriormente hacia **BDD, Page Object Model, buenas prácticas y CI/CD**.

---

## 🎯 Objetivo

Este repositorio nace con una idea simple:

> **No aprender solamente a escribir tests. Aprender a construir un framework de automatización.**

Vamos a comenzar desde una instalación limpia de Playwright y evolucionar progresivamente hacia una arquitectura utilizada en proyectos reales de QA Automation.

La idea es entender siempre:

```text
¿Qué agregamos?
      ↓
¿Por qué lo agregamos?
      ↓
¿Qué problema resuelve?
```

No construiremos todas las capas desde el principio.

Primero haremos funcionar los tests.

Después comenzaremos a detectar problemas de:

```text
Duplicación
Mantenimiento
Organización
Escalabilidad
Reutilización
```

Y a partir de esas necesidades iremos incorporando nuevas soluciones.

---

# 🚀 Evolución del proyecto

Nuestro camino será:

```text
Playwright
    ↓
Tests reales
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

> La arquitectura crecerá junto con las necesidades del proyecto.

---

# 📍 Estado actual

Actualmente ya tenemos:

```text
✅ Proyecto Playwright creado
✅ TypeScript configurado
✅ Browsers instalados
✅ Scripts básicos de ejecución
✅ Primeros tests reales con SauceDemo
✅ Login exitoso
✅ Validaciones de login fallido
✅ Validaciones de Products
✅ Navegación al detalle de productos

⏳ BDD
⏳ playwright-bdd
⏳ Page Object Model
⏳ BasePage
⏳ Fixtures
⏳ Reporting
⏳ CI/CD
```

En esta etapa trabajamos deliberadamente con:

```text
Playwright Test + TypeScript
```

sin agregar todavía ninguna capa adicional.

---

# 🧰 Stack tecnológico

| Tecnología | Uso |
|---|---|
| 🎭 Playwright | Automatización Web E2E |
| 🔷 TypeScript | Lenguaje principal |
| 🟢 Node.js | Runtime |
| 🥒 Gherkin | Definición futura de escenarios BDD |
| 🎭 playwright-bdd | Integración futura de BDD |
| 🧱 Page Object Model | Arquitectura futura |
| 🔀 Git | Versionado |
| ⚙️ CI/CD | Ejecución automatizada futura |

---

# 🏁 Crear un proyecto Playwright desde cero

Antes de pensar en arquitectura necesitamos una base funcional.

## 1️⃣ Verificar Node.js

```bash
node --version
```

También podemos verificar npm:

```bash
npm --version
```

---

## 2️⃣ Crear la carpeta del proyecto

```bash
mkdir playwright-bdd
```

Entramos:

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

Con esto Playwright genera automáticamente la estructura inicial.

---

# 📁 Estructura actual

Nuestro proyecto ya evolucionó desde el ejemplo inicial de Playwright.

Actualmente tenemos:

```text
playwright-bdd/
│
├── tests/
│   ├── login.spec.ts
│   └── products.spec.ts
│
├── playwright.config.ts
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

Todavía no tenemos:

```text
features/
steps/
pages/
fixtures/
core/
```

Estas carpetas aparecerán cuando exista una necesidad real para crearlas.

---

# 🧪 Aplicación utilizada

Durante el proyecto utilizaremos:

## SauceDemo

```text
https://www.saucedemo.com/
```

SauceDemo nos permite practicar progresivamente:

```text
Login
Validaciones
Productos
Navegación
Filtros
Carrito
Checkout
Escenarios positivos
Escenarios negativos
Flujos End-to-End
```

---

# 🔐 Tests de Login

Archivo:

```text
tests/login.spec.ts
```

Actualmente validamos diferentes comportamientos del login.

### Login exitoso

Utilizamos:

```text
standard_user
```

con la contraseña:

```text
secret_sauce
```

Validamos que después de autenticarnos correctamente:

```text
Login
  ↓
Inventory
  ↓
Products
```

---

### Login con contraseña incorrecta

También verificamos que la aplicación muestre correctamente el mensaje de error cuando las credenciales no son válidas.

---

### Usuario bloqueado

Utilizamos:

```text
locked_out_user
```

para validar el comportamiento de SauceDemo ante un usuario bloqueado.

---

# 🛒 Tests de Products

Archivo:

```text
tests/products.spec.ts
```

Para probar la sección de productos primero realizamos el login.

```text
Login
  ↓
Products
```

Actualmente validamos:

```text
Visualización del inventario
        ↓
Cantidad de productos
        ↓
Selección de producto
        ↓
Detalle del producto
```

Por ejemplo:

```text
Sauce Labs Backpack
```

y verificamos información como:

```text
Nombre
Precio
Página de detalle
```

---

# 🧠 Algo importante: estamos repitiendo código

En `products.spec.ts` necesitamos realizar nuevamente el login:

```typescript
await page.locator('#user-name').fill('standard_user');
await page.locator('#password').fill('secret_sauce');
await page.locator('#login-button').click();
```

Ese mismo comportamiento también existe dentro de nuestros tests de login.

Por ahora:

> **Eso es intencional.**

Todavía no queremos solucionar la duplicación.

Primero queremos verla.

A medida que nuestros tests crezcan comenzaremos a preguntarnos:

```text
¿Qué pasa si cambia #user-name?

¿Qué pasa si tenemos 30 tests que hacen login?

¿Tenemos que modificar 30 archivos?

¿Dónde deberían vivir los locators?

¿Dónde debería vivir la lógica de Login?
```

Estas preguntas nos llevarán posteriormente a introducir:

```text
Page Object Model
      ↓
LoginPage
      ↓
BasePage
      ↓
Reutilización
```

---

# ▶️ Ejecutar los tests

## Ejecutar todos los tests

```bash
npm test
```

Equivale a:

```bash
npx playwright test
```

---

## Mostrar el navegador

```bash
npm run test:headed
```

Equivale a:

```bash
npx playwright test --headed
```

---

## Playwright UI Mode

```bash
npm run test:ui
```

Esta opción permite ejecutar y depurar tests utilizando la interfaz gráfica de Playwright.

---

## Ejecutar solamente Login

```bash
npx playwright test login.spec.ts
```

---

## Ejecutar solamente Products

```bash
npx playwright test products.spec.ts
```

---

# 📦 Scripts actuales

Nuestro `package.json` contiene actualmente:

```json
{
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:ui": "playwright test --ui"
  }
}
```

Más adelante estos scripts crecerán junto con el framework.

Por ejemplo:

```text
test:bdd
test:smoke
test:regression
test:chrome
test:firefox
test:report
```

Pero los agregaremos solamente cuando realmente existan esas capacidades.

---

# 🎭 Playwright puro

Actualmente nuestra arquitectura es extremadamente sencilla:

```text
SPEC
 ↓
PLAYWRIGHT
 ↓
BROWSER
 ↓
SAUCEDEMO
```

Ejemplo:

```text
login.spec.ts
      ↓
Playwright
      ↓
SauceDemo
```

Esto nos permite aprender primero las capacidades fundamentales de Playwright:

```text
page.goto()
locator()
fill()
click()
expect()
beforeEach()
```

antes de agregar nuevas abstracciones.

---

# 🥒 Próxima evolución: BDD

Nuestro próximo gran cambio será incorporar:

```text
playwright-bdd
```

Actualmente tenemos:

```text
login.spec.ts
```

Más adelante podremos expresar el mismo comportamiento como:

```gherkin
Feature: Login

  Scenario: Login exitoso

    Given el usuario se encuentra en la página de login
    When ingresa credenciales válidas
    Then debería visualizar los productos
```

La arquitectura pasará inicialmente a:

```text
FEATURE
   ↓
STEP DEFINITIONS
   ↓
PLAYWRIGHT
   ↓
BROWSER
```

Sin Page Object Model todavía.

Primero queremos entender BDD.

---

# 🧱 Evolución posterior hacia POM

Una vez que tengamos BDD funcionando comenzaremos a separar responsabilidades.

Nuestra arquitectura evolucionará hacia:

```text
FEATURE
   ↓
STEPS
   ↓
PAGE OBJECT
   ↓
PLAYWRIGHT
   ↓
BROWSER
```

Y posteriormente:

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

# 🏗️ Arquitectura objetivo

No existe todavía.

Es el lugar al que queremos llegar progresivamente.

```text
playwright-bdd/
│
├── features/
│   ├── login.feature
│   ├── products.feature
│   └── checkout.feature
│
├── src/
│   │
│   ├── pages/
│   │   ├── LoginPage.ts
│   │   ├── ProductsPage.ts
│   │   ├── CartPage.ts
│   │   └── CheckoutPage.ts
│   │
│   ├── steps/
│   │   ├── login.steps.ts
│   │   └── products.steps.ts
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

Cada componente será agregado cuando entendamos qué responsabilidad tiene.

---

# 🧠 Conceptos que iremos incorporando

A medida que avance el proyecto podremos trabajar conceptos como:

```text
Page Object Model
Separación de responsabilidades
Encapsulamiento
Herencia
Abstracción
Polimorfismo
Fixtures
Reutilización
Test Data
Configuración por ambientes
Tags
Reporting
Multi-browser
CI/CD
```

No como conceptos aislados.

Los aplicaremos para solucionar problemas reales que aparezcan mientras el framework crece.

---

# 🗺️ Roadmap

| Etapa | Tema | Estado |
|---|---|---|
| 01 | Instalación de Playwright | ✅ |
| 02 | Primer test de ejemplo | ✅ |
| 03 | Scripts de ejecución | ✅ |
| 04 | Tests reales con SauceDemo | ✅ |
| 05 | Login positivo y negativo | ✅ |
| 06 | Tests de Products | ✅ |
| 07 | Documentación del proyecto | ✅ |
| 08 | playwright-bdd | ⏳ |
| 09 | Primer Feature | ⏳ |
| 10 | Step Definitions | ⏳ |
| 11 | Page Object Model | ⏳ |
| 12 | BasePage | ⏳ |
| 13 | Fixtures | ⏳ |
| 14 | Herencia y polimorfismo | ⏳ |
| 15 | Test Data | ⏳ |
| 16 | Tags | ⏳ |
| 17 | Screenshots / Trace / Video | ⏳ |
| 18 | Reporting | ⏳ |
| 19 | Variables de entorno | ⏳ |
| 20 | Multi-browser | ⏳ |
| 21 | CI/CD | ⏳ |

---

# 💡 Filosofía del proyecto

No queremos comenzar directamente con:

```text
BDD
+
POM
+
BasePage
+
Fixtures
+
Hooks
+
Reports
+
CI/CD
```

sin entender qué necesidad resuelve cada pieza.

Seguiremos esta evolución:

```text
Primero funciona.

Después observamos.

Después organizamos.

Después reutilizamos.

Después abstraemos.

Después escalamos.
```

---

# 🎯 Objetivo final

El objetivo es terminar con un framework capaz de trabajar con:

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
Reporting
   ↓
CI/CD
```

Pero el verdadero objetivo es otro:

> **Entender cómo llegamos hasta ahí y por qué tomamos cada decisión.**

---

## 👨‍💻 QA Automation Learning Project

Proyecto educativo orientado a aprender automatización desde los fundamentos hasta una arquitectura profesional.

### 🎭 Playwright + 🔷 TypeScript + 🥒 BDD

---

> ⭐ **Automatizar no es solamente hacer que un test corra.**
>
> **Es construir una solución que podamos entender, mantener y evolucionar.**