# Sistema de Gestión de Pagos Estudiantiles

Aplicación web moderna para la administración eficiente de pagos estudiantiles. Gestiona registros de estudiantes, controla pagos y cuotas, genera reportes detallados y mantiene un seguimiento completo del estado financiero de cada estudiante.

## 🚀 Tecnologías

### Frontend
- Angular 20
- TypeScript
- Bootstrap 5
- Angular Material

### Backend
- Spring Boot 3.4.5
- Java 21
- Spring Security
- Spring Data JPA

### Base de Datos
- MySQL 8.0
- phpMyAdmin

### Contenedores
- Docker
- Docker Compose

## 📁 Estructura del Proyecto

```
Angular-Spring-Project/
├── sistema-pagos-frontend/    # Frontend en Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── admin-template/   # Template administrativo
│   │   │   ├── dashboard/        # Panel principal
│   │   │   ├── estudiantes/      # Gestión de estudiantes
│   │   │   ├── pagos/           # Gestión de pagos
│   │   │   ├── guards/          # Guardias de autenticación
│   │   │   ├── services/        # Servicios
│   │   │   └── models/          # Modelos de datos
│   │   └── environments/        # Configuraciones por ambiente
│   └── package.json
│
├── sistema-pagos-backend/     # Backend en Spring Boot
│   └── src/
│       └── main/
│           ├── java/
│           │   └── com/
│           │       └── sistemapagos/
│           └── resources/
│               └── application.properties
│
└── docker-compose.yml        # Configuración de Docker
```

## 🛠️ Configuración del Entorno

### Requisitos Previos
- Docker y Docker Compose
- Node.js 20+
- Java 21 JDK
- Maven 3.9+

### Base de Datos
```bash
# Iniciar los servicios con Docker
docker-compose up -d
```

### Frontend
```bash
cd sistema-pagos-frontend
npm install
ng serve
```

### Backend
```bash
cd sistema-pagos-backend
./mvnw spring-boot:run
```

## 🌐 Puertos por Defecto
- Frontend Angular: http://localhost:4200
- Backend Spring Boot: http://localhost:8080
- Base de Datos MySQL: localhost:3306

## 🔐 Seguridad
- Autenticación basada en JWT
- Roles de usuario: ADMIN, USER
- Guards para protección de rutas
- Spring Security para el backend

## 🎨 Características
- Dashboard interactivo
- Gestión de estudiantes
- Registro y seguimiento de pagos
- Reportes y estadísticas
- Interfaz responsive
- Tema oscuro/claro
- Exportación de datos

## 📜 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.