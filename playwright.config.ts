import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Carpeta donde se encuentran los tests
  testDir: './tests',
  // Ejecutar los tests dentro de cada archivo en paralelo
  fullyParallel: true,
  // En CI, falla si se dejó accidentalmente un test.only en el código
  forbidOnly: !!process.env.CI,
  // Reintentar tests fallidos solo en CI
  retries: process.env.CI ? 2 : 0,
  // En CI usar un solo worker para evitar problemas de concurrencia
  workers: process.env.CI ? 1 : undefined,
  // Formato del reporte de resultados (html genera un reporte visual)
  reporter: 'html',
  // Configuración compartida para todos los proyectos definidos abajo
  use: {
    // URL base para usar en acciones como `await page.goto('')`
    // baseURL: 'http://localhost:3000',

    // Grabar trazas al reintentar un test fallido, útil para depuración
    trace: 'on-first-retry',
    // Mostrar el navegador visualmente durante la ejecución (false = modo headless)
    headless: false,
  },

  // Proyectos: define en qué navegadores se ejecutan los tests
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
