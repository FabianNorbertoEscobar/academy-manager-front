import { Course, CourseStatus } from '../model/Course';

export const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Técnica Vocal',
    description:
      'Este curso se centra en el desarrollo del control respiratorio, la colocación de la voz y la proyección escénica. Los alumnos aprenden ejercicios de calentamiento vocal, afinación y técnicas para ampliar su rango y resistencia durante las interpretaciones en vivo.',
    beginDate: new Date('2025-03-01'),
    endDate: new Date('2025-06-30'),
    status: CourseStatus.SCHEDULED,
  },
  {
    id: 2,
    title: 'Interpretación Escénica',
    description:
      'En este curso se trabaja la conexión emocional con las canciones, la comunicación con el público y la expresión corporal. Los estudiantes aprenden a transmitir sentimientos auténticos en el escenario, combinando actuación y canto.',
    beginDate: new Date('2025-01-15'),
    endDate: new Date('2025-04-15'),
    status: CourseStatus.STARTED,
  },
  {
    id: 3,
    title: 'Piano para Cantantes',
    description:
      'Un curso diseñado para vocalistas que buscan acompañarse al piano. Se enseña armonía básica, lectura de acordes, acompañamiento de voz y cómo interpretar canciones populares con estilo y musicalidad.',
    beginDate: new Date('2024-09-01'),
    endDate: new Date('2024-12-20'),
    status: CourseStatus.FINISHED,
  },
  {
    id: 4,
    title: 'Bailes Urbanos',
    description:
      'Curso intensivo de danza urbana que combina estilos como hip-hop, street dance y funk. Ideal para artistas que desean complementar su formación vocal con presencia escénica y dominio del cuerpo en movimiento.',
    beginDate: new Date('2025-05-10'),
    endDate: new Date('2025-08-20'),
    status: CourseStatus.SCHEDULED,
  },
  {
    id: 5,
    title: 'Producción Musical',
    description:
      'Los alumnos aprenden a grabar, mezclar y producir sus propias canciones utilizando herramientas digitales. Se cubren conceptos de teoría del sonido, estructuras de canciones y edición profesional de voz.',
    beginDate: new Date('2025-02-01'),
    endDate: new Date('2025-06-01'),
    status: CourseStatus.STARTED,
  },
  {
    id: 6,
    title: 'Repertorio Pop y Rock',
    description:
      'Curso orientado a la exploración y dominio de los géneros pop y rock. Incluye análisis de estilos, interpretación vocal y performance de clásicos y temas actuales del repertorio internacional.',
    beginDate: new Date('2024-10-01'),
    endDate: new Date('2025-01-15'),
    status: CourseStatus.FINISHED,
  },
  {
    id: 7,
    title: 'Armonía y Teoría Musical',
    description:
      'Fundamentos de la música moderna: intervalos, escalas, acordes y progresiones armónicas. Este curso proporciona la base teórica necesaria para entender y construir canciones propias.',
    beginDate: new Date('2025-04-01'),
    endDate: new Date('2025-07-30'),
    status: CourseStatus.SCHEDULED,
  },
  {
    id: 8,
    title: 'Expresión Corporal y Movimiento Escénico',
    description:
      'Entrenamiento físico y de conciencia corporal para mejorar la expresividad en el escenario. Incluye técnicas de postura, ritmo corporal y desplazamiento escénico.',
    beginDate: new Date('2025-03-20'),
    endDate: new Date('2025-06-30'),
    status: CourseStatus.SCHEDULED,
  },
  {
    id: 9,
    title: 'Coro y Armonías Vocales',
    description:
      'Curso grupal donde los estudiantes trabajan la afinación colectiva, las armonías vocales y la escucha activa. Se preparan piezas corales modernas para presentaciones en vivo.',
    beginDate: new Date('2025-01-10'),
    endDate: new Date('2025-04-10'),
    status: CourseStatus.STARTED,
  },
  {
    id: 10,
    title: 'Inglés para Cantantes',
    description:
      'Curso especializado en pronunciación, fonética y comprensión del inglés aplicado al canto. Ideal para quienes desean interpretar repertorio internacional con naturalidad y precisión.',
    beginDate: new Date('2024-11-01'),
    endDate: new Date('2025-02-28'),
    status: CourseStatus.FINISHED,
  },
];
