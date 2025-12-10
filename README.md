# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

==========
DYLAN SALINAS
PROYECTO: Página de Compra de Tanques
-------------------------------------

Este proyecto es una aplicación web desarrollada con React que permite
visualizar, seleccionar y comprar distintos modelos de tanques.
El sistema maneja cada tanque de forma independiente, permitiendo
agregar múltiples modelos y gestionar sus cantidades correctamente.


DESCRIPCIÓN GENERAL
-------------------
La página de Tanques muestra un catálogo de vehículos militares,
obtenidos desde una API externa.

El usuario puede:
- Ver información de cada tanque (nombre, tipo, nación, precio, etc.)
- Agregar tanques al carrito
- Aumentar o disminuir la cantidad de cada tanque
- Eliminar tanques del carrito
- Manejar varios tanques distintos sin que se mezclen entre sí


TECNOLOGÍAS UTILIZADAS
----------------------
- React
- JavaScript (ES6+)
- React Router
- Context API
- Fetch API
- CSS / Flexbox / Grid


BACKEND / API
-------------
Los tanques se obtienen desde una API externa.
Cada tanque tiene un identificador único que permite distinguirlo dentro
del catálogo y del carrito.

Campos principales:
- id: identificador único del tanque
- name: nombre del tanque
- nation: nación
- type: tipo (heavy, medium, light, etc.)
- price: precio


FUNCIONAMIENTO DEL CARRITO
--------------------------
El carrito se gestiona mediante Context API.

Cada tanque se guarda como un elemento independiente utilizando su ID
real, lo que permite:
- No sobrescribir tanques distintos
- Incrementar cantidad solo del tanque seleccionado
- Manipular correctamente cada ítem del carrito

Ejemplo de estructura interna del carrito:

[
  { id: 101, name: "Tiger I", price: 500000, cantidad: 1 },
  { id: 205, name: "T-34", price: 320000, cantidad: 2 }
]


LÓGICA DE AGREGADO
------------------
- Si el tanque NO existe en el carrito:
  → se agrega como nuevo elemento con cantidad = 1
- Si el tanque YA existe:
  → se incrementa su cantidad automáticamente

Cada acción afecta únicamente al tanque seleccionado.


CARACTERÍSTICAS PRINCIPALES
---------------------------
- Distinción correcta de tanques por ID
- Manipulación individual de cantidades
- Eliminación segura de tanques
- Estado global reutilizable
- Evita duplicados incorrectos
- Código organizado y escalable


ESTADO DEL PROYECTO
-------------------
✔ Totalmente funcional
✔ Sin errores de acumulación
✔ Listo para GitHub Pages



-----
Proyecto desarrollado como práctica de React, enfocada en el uso de
componentes, manejo de estado global y lógica de carrito de compras.
