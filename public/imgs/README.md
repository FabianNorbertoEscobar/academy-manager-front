# Guía para Agregar Fotos de Alumnos

## Ubicación de las Fotos

Las fotos de los alumnos deben colocarse en la carpeta:
```
public/imgs/
```

## Formato del Nombre de Archivo

El nombre del archivo debe seguir el siguiente formato:
```
nombre-apellido.jpg
```

**Ejemplos:**
- `claudia-arenas.jpg`
- `cristina-sanchez.jpg`
- `javier-crespo.jpg`
- `salma-dediego.jpg` (para apellidos compuestos, sin espacios ni "de")
- `carlos-delosreyes.jpg` (para apellidos compuestos, sin espacios)

## Formato de Imagen Recomendado

- **Formato:** JPG, PNG o SVG
- **Tamaño recomendado:** 400x400 píxeles (cuadrado)
- **Peso máximo:** 500 KB por imagen
- **Aspecto:** Las imágenes se mostrarán en formato circular

## Lista de Archivos Necesarios

Según la base de datos actual, necesitas crear las siguientes imágenes:

1. `claudia-arenas.jpg`
2. `cristina-sanchez.jpg`
3. `javier-crespo.jpg`
4. `salma-dediego.jpg`
5. `laura-munoz.jpg`
6. `carlos-delosreyes.jpg`
7. `guillermo-toledano.jpg`
8. `guillo-rist.jpg`
9. `ivan-rojo.jpg`
10. `judit-garuz.jpg`
11. `quique-illan.jpg`
12. `lucia-casani.jpg`
13. `maria-cruz.jpg`
14. `tinho-vaamonde.jpg`
15. `max-navarro.jpg`
16. `sam-ortiz.jpg`
17. `olivia-fernandez.jpg`
18. `teyou-matateyougarcia.jpg`

## Avatar por Defecto

Si una imagen no se encuentra, el sistema mostrará automáticamente un avatar por defecto:
```
public/imgs/default-avatar.svg
```

Este avatar muestra una silueta de persona con un degradado morado/azul.

## Actualizar la Base de Datos

Las rutas de las fotos ya están configuradas en `data/db.json` con el formato:
```json
{
  "photoUrl": "/imgs/nombre-apellido.jpg"
}
```

Si cambias el nombre de un archivo de foto, asegúrate de actualizar también el campo `photoUrl` en `data/db.json`.

## Notas Adicionales

- Las imágenes se cargan desde la carpeta `public/`, que es accesible directamente en la aplicación
- Los nombres de archivo deben estar en minúsculas
- No uses espacios en los nombres de archivo
- Para apellidos con espacios o preposiciones ("de", "de los", etc.), elimina los espacios y la preposición
