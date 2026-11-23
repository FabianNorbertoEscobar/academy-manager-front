# Academy Manager

Aplicación web para administrar alumnos y cursos de una academia. Este proyecto se desarrolló como práctica de los conceptos de frontend y gestión de datos incluidos en el curso.

## Aplicación

- **Demo:** https://academy-manager-front.vercel.app
- **API de producción:** https://academy-manager-back.vercel.app

## Funcionalidades

- Inicio y cierre de sesión, con rutas protegidas para el área de administración.
- Panel principal con accesos a la gestión de alumnos y cursos.
- Listado, detalle, creación, edición y eliminación de alumnos y cursos.
- Formularios reactivos con validaciones de campos obligatorios, longitud y formato de correo.
- Tablas, paginación, ordenamiento, cuadros de diálogo de confirmación y componentes de interfaz de Angular Material.
- Gestión de estados de los cursos (programado, iniciado, finalizado y cancelado) y datos de alumnos.

## Stack y tecnologías

- **Angular 20** y **TypeScript** para la aplicación y su arquitectura basada en módulos y componentes.
- **Angular Router** para navegación, carga diferida de módulos y guards de acceso.
- **Angular Reactive Forms** para formularios y validación.
- **NgRx Store y Effects** para el estado de autenticación, alumnos y cursos.
- **RxJS** y **HttpClient** para flujos reactivos y comunicación HTTP con la API REST.
- **Angular Material/CDK** para los elementos visuales y controles de tablas.
- **SCSS** para estilos.
- **Jasmine y Karma** para pruebas unitarias.
- **JSON Server** y `data/db.json` como alternativa de API local para desarrollo.
- **Vercel** para publicar la aplicación y la API.

## Conceptos y prácticas del curso

El proyecto reúne prácticas de desarrollo de aplicaciones SPA, componentes y módulos de Angular, enrutamiento, guards, formularios reactivos, validación, servicios e inyección de dependencias, consumo de APIs REST, programación reactiva con RxJS, gestión de estado con NgRx, interfaces con Angular Material y pruebas unitarias.

## Requisitos

- Node.js y npm.
- Un backend disponible: la API desplegada o una instancia local de JSON Server.

## Desarrollo local

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Inicia el backend local en una terminal, si no vas a utilizar la API de producción:

   ```bash
   npx json-server data/db.json --port 3000
   ```

   La configuración de desarrollo apunta a `http://localhost:3000`. El archivo `data/db.json` contiene los recursos `users`, `courses` y `students`.

3. En otra terminal, inicia Angular:

   ```bash
   npm start
   ```

   Abre http://localhost:4200. La aplicación recarga los cambios automáticamente.

La configuración de producción utiliza la API desplegada en `https://academy-manager-back.vercel.app/api`.

## Comandos

| Comando | Descripción |
| --- | --- |
| `npm start` | Inicia el servidor de desarrollo de Angular. |
| `npm run build` | Genera la compilación de producción en `dist/`. |
| `npm test` | Ejecuta las pruebas unitarias con Karma. |
| `npm run watch` | Compila en modo desarrollo y vuelve a compilar al detectar cambios. |

## Estructura principal

```text
src/app/
├── core/       # Servicios, modelos, guards y estado global
├── featured/   # Autenticación, dashboard, alumnos y cursos
└── shared/     # Módulo y utilidades compartidas
data/
└── db.json     # Datos para la API local con JSON Server
```

## Pruebas

Ejecuta `npm test` para abrir el runner de Karma y ejecutar las pruebas unitarias de componentes, servicios y guards.
