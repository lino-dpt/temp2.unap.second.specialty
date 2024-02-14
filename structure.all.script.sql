-- Date: 2021-10-14
-- Time: 12:00:00
-- Created with: VSCode
-- By: @linox

-- crear base de datos para el sistema de segunda especialidad
CREATE DATABASE IF NOT EXISTS `secondSpecialtySystem` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `secondSpecialtySystem`;
-- crear tabla de paises
DROP TABLE IF EXISTS `countries`;
CREATE TABLE `countries`(
    -- id del pais
    `Id` INT NOT NULL AUTO_INCREMENT,
    -- codigo del pais
    `Code` VARCHAR(100) NOT NULL,
    -- nombre del pais
    `Name` VARCHAR(100) NOT NULL,
    -- estado del pais
    `Status` TINYINT NOT NULL,
    -- fecha de creacion del pais
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- fecha de actualizacion del pais
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- fecha de eliminacion del pais
    `DeletedAt` TIMESTAMP NULL,
    PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- crear tabla de ubigeos
DROP TABLE IF EXISTS `ubigeos`;
CREATE TABLE `ubigeos`(
    -- id del ubigeo
    `Id` INT NOT NULL AUTO_INCREMENT,
    -- codigo del ubigeo
    `Code` VARCHAR(100) NOT NULL,
    -- nombre del ubigeo
    `Name` VARCHAR(100) NOT NULL,
    -- departamento del ubigeo
    `Department` VARCHAR(100) NOT NULL,
    -- provincia del ubigeo
    `Province` VARCHAR(100) NOT NULL,
    -- distrito del ubigeo
    `District` VARCHAR(100) NOT NULL,
    -- estado del ubigeo
    `Status` TINYINT NOT NULL,
    -- fecha de creacion del ubigeo
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- fecha de actualizacion del ubigeo
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- fecha de eliminacion del ubigeo
    `DeletedAt` TIMESTAMP NULL,
    PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- crear tabla de sedes (EN INGLES)
DROP TABLE IF EXISTS `campus`;
CREATE TABLE `campus`(
    -- id de la sede
    `Id` INT NOT NULL AUTO_INCREMENT,
    -- codigo de la sede
    `Code` VARCHAR(100) NOT NULL,
    -- nombre de la sede
    `Name` VARCHAR(100) NOT NULL,
    -- direccion de la sede
    `Address` VARCHAR(100) NOT NULL,
    -- telefono de la sede
    `Phone` VARCHAR(100) NOT NULL,
    -- estado de la sede
    `Status` TINYINT NOT NULL,
    -- fecha de creacion de la sede
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- fecha de actualizacion de la sede
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- fecha de eliminacion de la sede
    `DeletedAt` TIMESTAMP NULL,
    PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--crear tabla de periodos 
DROP TABLE IF EXISTS `periods`;
CREATE TABLE `periods`(
    -- id del periodo
    `Id` INT NOT NULL AUTO_INCREMENT,
    -- nombre del periodo
    `Name` VARCHAR(100) NOT NULL,
    -- fecha de inicio del periodo
    `StartDate` DATE NOT NULL,
    -- fecha de fin del periodo
    `EndDate` DATE NOT NULL,
    -- estado del periodo
    `Status` TINYINT NOT NULL,
    -- fecha de creacion del periodo
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- fecha de actualizacion del periodo
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- fecha de eliminacion del periodo
    `DeletedAt` TIMESTAMP NULL,
    PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- crear tabla de convoctorias de postulantes (EN INGLES)
DROP TABLE IF EXISTS `calls`;
CREATE TABLE `calls`(
    -- id de la convocatoria
    `Id` INT NOT NULL AUTO_INCREMENT,
    -- nombre de la convocatoria
    `Name` VARCHAR(100) NOT NULL,
    -- fecha de inicio de la convocatoria
    `StartDate` DATE NOT NULL,
    -- fecha de fin de la convocatoria
    `EndDate` DATE NOT NULL,
    -- estado de la convocatoria
    `Status` TINYINT NOT NULL,
    -- observaciones de la convocatoria
    `Observations` VARCHAR(100) NOT NULL,
    -- modalidad des estudio
    `Modality` VARCHAR(100) NOT NULL,
    -- id del periodo -FK-
    `PeriodId` INT NOT NULL,
    -- id de la sede -FK-
    `CampusId` INT NOT NULL,
    -- fecha de creacion de la convocatoria
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- fecha de actualizacion de la convocatoria
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- fecha de eliminacion de la convocatoria
    `DeletedAt` TIMESTAMP NULL,
    PRIMARY KEY (`Id`),

    FOREIGN KEY (`PeriodId`) REFERENCES `periods`(`Id`),
    FOREIGN KEY (`CampusId`) REFERENCES `campus`(`Id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- crear tabla de tipo de documentos
DROP TABLE IF EXISTS `documentTypes`;
CREATE TABLE `documentTypes`(
    -- id del tipo de documento
    `Id` INT NOT NULL AUTO_INCREMENT,
    -- codigo del tipo de documento
    `Code` VARCHAR(100) NOT NULL,
    -- nombre del tipo de documento
    `Name` VARCHAR(100) NOT NULL,
    -- estado del tipo de documento
    `Status` TINYINT NOT NULL,
    -- fecha de creacion del tipo de documento
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- fecha de actualizacion del tipo de documento
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- fecha de eliminacion del tipo de documento
    `DeletedAt` TIMESTAMP NULL,
    PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;   



-- crear tabla de postulantes 
DROP TABLE IF EXISTS `postulants`;
CREATE TABLE `postulants`(
    -- id del postulante
    `Id` INT NOT NULL AUTO_INCREMENT,
    -- nombre del postulante
    `Name` VARCHAR(100) NOT NULL,
    -- apellido paterno del postulante
    `FatherSurname` VARCHAR(100) NOT NULL,
    -- apellido materno del postulante
    `MotherSurname` VARCHAR(100) NOT NULL,
    -- apellido de casada del postulante
    `MarriedSurname` VARCHAR(100) NOT NULL,
    -- genero del postulante
    `Gender` VARCHAR(100) NOT NULL,
    -- fecha de nacimiento del postulante
    `BirthDate` DATE NOT NULL,
    -- (UBIGEO) lugar de nacimiento del postulante
    `BirthPlace` VARCHAR(100) NOT NULL,
    -- (UBIGEO) lugar de residencia del postulante
    `ResidencePlace` VARCHAR(100) NOT NULL,
    -- anio de graduacion del postulante
    `GraduationYear` INT NOT NULL,
    -- estado civil del postulante
    `MaritalStatus` VARCHAR(100) NOT NULL,
    -- observaciones del postulante
    `Observations` VARCHAR(100) NOT NULL,
    -- tipo de documento del postulante
    `DocumentType` INT NOT NULL,
    -- numero de documento del postulante
    `DocumentNumber` VARCHAR(100) NOT NULL,
    -- tipo de discapacidad del postulante
    `DisabilityType` VARCHAR(100) NOT NULL,
    -- el estudinate tiene una discapacidad?
    `IsDisability` TINYINT NOT NULL,
    -- estado del postulante
    `Status` TINYINT NOT NULL,
    -- fecha de creacion del postulante
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- fecha de actualizacion del postulante
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- fecha de eliminacion del postulante
    `DeletedAt` TIMESTAMP NULL,
    PRIMARY KEY (`Id`),
    FOREIGN KEY (`DocumentType`) REFERENCES `documentTypes`(`Id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- crear tabla de medios de contacto
DROP TABLE IF EXISTS `contacts`;
CREATE TABLE `contacts`(
    -- id del medio de contacto
    `Id` INT NOT NULL AUTO_INCREMENT,
    --  tipo del emdio de contacto
    `ContactType` VARCHAR(100) NOT NULL,
    --  valor del medio de contacto
    `ContactValue` VARCHAR(100) NOT NULL,
    --  id del postulante -fk-
    `PostulantId` INT NOT NULL,
    --  estado del medio de contacto
    `Status` TINYINT NOT NULL,
    -- fecha de creacion del medio de contacto
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- fecha de actualizacion del medio de contacto
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- fecha de eliminacion del medio de contacto
    `DeletedAt` TIMESTAMP NULL,
    PRIMARY KEY (`Id`),
    FOREIGN KEY (`PostulantId`) REFERENCES `postulants`(`Id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- crear tabla de familiares
DROP TABLE IF EXISTS `kinships`;
CREATE TABLE `kinships`(
    --  id del familiar
    `Id` INT NOT NULL AUTO_INCREMENT,
    -- parentesco del familiar
    `Kinship` VARCHAR(100) NOT NULL,
    -- nombre del familiar
    `Name` VARCHAR(100) NOT NULL,
    -- apellido paterno del familiar
    `FatherSurname` VARCHAR(100) NOT NULL,
    -- apellido materno del familiar
    `MotherSurname` VARCHAR(100) NOT NULL,
    -- genero del familiar
    `Gender` VARCHAR(100) NOT NULL,
    -- numero de celular del familiar
    `PhoneNumer` VARCHAR(100) NOT NULL,
    -- type de documento del familiar
    `DocumentType` INT NOT NULL,
    -- numero de documento del familiar
    `DocumentNumber` VARCHAR(100) NOT NULL,
    --  id del postulante -fk-
    `PostulantId` INT NOT NULL,
    --  estado del familiar
    `Status` TINYINT NOT NULL,
    -- fecha de creacion del familiar
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- fecha de actualizacion del familiar
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- fecha de eliminacion del familiar
    `DeletedAt` TIMESTAMP NULL,
    PRIMARY KEY (`Id`),
    FOREIGN KEY (`PostulantId`) REFERENCES `postulants`(`Id`)
    FOREIGN KEY (`DocumentType`) REFERENCES `documentTypes`(`Id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- crear tabla de unidades academicas
DROP TABLE IF EXISTS `academicUnits`;
CREATE TABLE `academicUnits`(
    -- id de la unidad
    `Id` INT NOT NULL AUTO_INCREMENT,
    -- nombre de la unidad
    `Name` VARCHAR(100) NOT NULL,
    --codigo de la unidad
    `Code` VARCHAR(100) NOT NULL,
    -- estado de la unidad
    `Status` TINYINT NOT NULL,
    -- fecha de creacion de la unidad
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- fecha de actualizacion de la unidad
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- fecha de eliminacion de la unidad
    `DeletedAt` TIMESTAMP NULL,
    PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- crear tabla de programas academicos
DROP TABLE IF EXISTS `academicPrograms`;
CREATE TABLE `academicPrograms`(
    -- id del programa
    `Id` INT NOT NULL AUTO_INCREMENT,
    -- nombre del programa
    `Name` VARCHAR(100) NOT NULL,
    -- codigo del programa
    `Code` VARCHAR(100) NOT NULL,
    -- codigo siu
    `SiuCode` VARCHAR(100) NOT NULL,
    -- estado del programa
    `Status` TINYINT NOT NULL,
    -- fecha de creacion del programa
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- fecha de actualizacion del programa
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- fecha de eliminacion del programa
    `DeletedAt` TIMESTAMP NULL,
    PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- crear tabla de instituciones educativas superiores
DROP TABLE IF EXISTS `higherEducationalInstitutions`;
CREATE TABLE `higherEducationalInstitutions`(
    -- id de la institucion
    `Id` INT NOT NULL AUTO_INCREMENT,
    -- codigo de la institucion
    `Code` VARCHAR(100) NOT NULL,
    -- nombre de la institucion
    `Name` VARCHAR(100) NOT NULL,
    -- lugar de la institucion (UBIGEO)
    `Place` VARCHAR(100) NOT NULL,
    -- pais de la institucion
    `Country` VARCHAR(100) NOT NULL,
    -- estado de la institucion
    `Status` TINYINT NOT NULL,
    -- fecha de creacion de la institucion
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- fecha de actualizacion de la institucion
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- fecha de eliminacion de la institucion
    `DeletedAt` TIMESTAMP NULL,
    PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- tabla para la gestion de tipos de archivos
DROP TABLE IF EXISTS `fileTypes`;

CREATE TABLE `fileTypes`(
    -- id del tipo de archivo
    `Id` INT NOT NULL AUTO_INCREMENT,
    -- nombre del tipo de archivo
    `Name` VARCHAR(100) NOT NULL,
    -- estado del tipo de archivo
    `Status` TINYINT NOT NULL,
    -- fecha de creacion del tipo de archivo
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- fecha de actualizacion del tipo de archivo
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- fecha de eliminacion del tipo de archivo
    `DeletedAt` TIMESTAMP NULL,
    PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- tabla para la gestion de archivos
DROP TABLE IF EXISTS `files`;
CREATE TABLE `files`(
    -- id del archivo
    `Id` INT NOT NULL AUTO_INCREMENT,
    -- nombre del archivo
    `Name` VARCHAR(100) NOT NULL,
    -- ruta del archivo
    `Path` VARCHAR(100) NOT NULL,
    -- id del tipo de archivo -FK-
    `FileTypeId` INT NOT NULL,
    -- tipo del documento del archivo
    `DocumentType` VARCHAR(100) NOT NULL,
    -- mime type del archivo
    `MimeType` VARCHAR(100) NOT NULL,
    -- id del postulante -FK-
    `PostulantId` INT NOT NULL,
    -- estado del archivo
    `Status` TINYINT NOT NULL,
    -- fecha de creacion del archivo
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- fecha de actualizacion del archivo
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- fecha de eliminacion del archivo
    `DeletedAt` TIMESTAMP NULL,
    PRIMARY KEY (`Id`),
    FOREIGN KEY (`FileTypeId`) REFERENCES `fileTypes`(`Id`),
    FOREIGN KEY (`PostulantId`) REFERENCES `postulants`(`Id`)


) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- tabla para la gestion de experiencias laborales
DROP TABLE IF EXISTS `workExperiences`;
CREATE TABLE `workExperiences`(
    -- id de la experiencia laboral
    `Id` INT NOT NULL AUTO_INCREMENT,
    -- nombre de la empresa
    `CompanyName` VARCHAR(100) NOT NULL,
    -- cargo en la empresa
    `Position` VARCHAR(100) NOT NULL,
    -- fecha de inicio de la experiencia laboral
    `StartDate` DATE NOT NULL,
    -- fecha de fin de la experiencia laboral
    `EndDate` DATE NOT NULL,
    -- lugar de la experiencia laboral
    `Place` VARCHAR(100) NOT NULL,
    -- tipo de contrato de la experiencia laboral
    `ContractType` VARCHAR(100) NOT NULL,
    -- tipo de jornada de la experiencia laboral
    `WorkdayType` VARCHAR(100) NOT NULL,
    -- ¿aun labora en la empresa?
    `IsCurrent` TINYINT NOT NULL,
    -- descripcion de la experiencia laboral
    `Description` VARCHAR(100) NOT NULL,
    -- id del postulante -FK-
    `PostulantId` INT NOT NULL,
    -- estado de la experiencia laboral
    `Status` TINYINT NOT NULL,
    -- fecha de creacion de la experiencia laboral
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- fecha de actualizacion de la experiencia laboral
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- fecha de eliminacion de la experiencia laboral
    `DeletedAt` TIMESTAMP NULL,
    PRIMARY KEY (`Id`),
    FOREIGN KEY (`PostulantId`) REFERENCES `postulants`(`Id`)



) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- tabla para los grados de estudio academicos
DROP TABLE IF EXISTS `academicDegrees`;
CREATE TABLE `academicDegrees`(
    -- id del grado academico
    `Id` INT NOT NULL AUTO_INCREMENT,
    -- nombre del grado academico
    `Name` VARCHAR(100) NOT NULL,
    -- nivel del grado academico
    `Level` VARCHAR(100) NOT NULL,
    -- estado del grado academico
    `Status` TINYINT NOT NULL,
    -- fecha de creacion del grado academico
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- fecha de actualizacion del grado academico
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- fecha de eliminacion del grado academico
    `DeletedAt` TIMESTAMP NULL,
    PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- tabla para la gestion de educacion academica del postulante
DROP TABLE IF EXISTS `educations`;
CREATE TABLE `educations`(
    -- id de la educacion
    `Id` INT NOT NULL AUTO_INCREMENT,
    -- nombre de la institucion
    `InstitutionName` VARCHAR(100) NOT NULL,
    -- grado academico
    `AcademicDegree` INT NOT NULL,
    -- fecha de inicio de la educacion
    `StartDate` DATE NOT NULL,
    -- fecha de fin de la educacion
    `EndDate` DATE NOT NULL,
    -- observaciones de la educacion
    `Observations` VARCHAR(100) NOT NULL,
    -- id del postulante -FK-
    `PostulantId` INT NOT NULL,
    -- estado de la educacion
    `Status` TINYINT NOT NULL,
    -- fecha de creacion de la educacion
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- fecha de actualizacion de la educacion
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- fecha de eliminacion de la educacion
    `DeletedAt` TIMESTAMP NULL,
    PRIMARY KEY (`Id`),
    FOREIGN KEY (`AcademicDegree`) REFERENCES `academicDegrees`(`Id`),
    FOREIGN KEY (`PostulantId`) REFERENCES `postulants`(`Id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- tabla para la gestion de certificaciones del postulante
DROP TABLE IF EXISTS `certifications`;
CREATE TABLE `certifications`(
    -- id de la certificacion
    `Id` INT NOT NULL AUTO_INCREMENT,
    -- nombre de la certificacion
    `Name` VARCHAR(100) NOT NULL,
    -- fecha de obtencion de la certificacion
    `ObtentionDate` DATE NOT NULL,
    -- institucion que otorga la certificacion
    `Institution` VARCHAR(100) NOT NULL,
    -- id del postulante -FK-
    `PostulantId` INT NOT NULL,
    -- estado de la certificacion
    `Status` TINYINT NOT NULL,
    -- fecha de creacion de la certificacion
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- fecha de actualizacion de la certificacion
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- fecha de eliminacion de la certificacion
    `DeletedAt` TIMESTAMP NULL,
    PRIMARY KEY (`Id`),
    FOREIGN KEY (`PostulantId`) REFERENCES `postulants`(`Id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 
-- tabla para la gestion de criterios de evaluacion para el cv del postulante
DROP TABLE IF EXISTS `evaluationCriterias`;
CREATE TABLE `evaluationCriterias`(
    -- id del criterio de evaluacion
    `Id` INT NOT NULL AUTO_INCREMENT,
    -- nombre del criterio de evaluacion
    `Name` VARCHAR(100) NOT NULL,
    -- estado del criterio de evaluacion
    `Status` TINYINT NOT NULL,
    -- fecha de creacion del criterio de evaluacion
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- fecha de actualizacion del criterio de evaluacion
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- fecha de eliminacion del criterio de evaluacion
    `DeletedAt` TIMESTAMP NULL,
    PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- tabla para la gestion de evaluaciones de cv
DROP TABLE IF EXISTS `cvEvaluations`;
CREATE TABLE `cvEvaluations`(
    -- id de la evaluacion
    `Id` INT NOT NULL AUTO_INCREMENT,
    -- nombre de la evaluacion
    `Name` VARCHAR(100) NOT NULL,
    -- convocatoria de la evaluacion
    `CallId` INT NOT NULL,
    -- programa academico de la evaluacion
    `AcademicProgramId` INT NOT NULL,
    -- fecha de la evaluacion
    `Date` DATE NOT NULL,
    -- estado de la evaluacion
    `Status` TINYINT NOT NULL,
    -- fecha de creacion de la evaluacion
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- fecha de actualizacion de la evaluacion
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- fecha de eliminacion de la evaluacion
    `DeletedAt` TIMESTAMP NULL,
    PRIMARY KEY (`Id`),
    FOREIGN KEY (`CallId`) REFERENCES `calls`(`Id`),
    FOREIGN KEY (`AcademicProgramId`) REFERENCES `academicPrograms`(`Id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- tabla indicadores de evaluacion
DROP TABLE IF EXISTS `evaluationIndicators`;
CREATE TABLE `evaluationIndicators`(
    -- id del indicador de evaluacion
    `Id` INT NOT NULL AUTO_INCREMENT,
    -- nombre del indicador de evaluacion
    `Name` VARCHAR(100) NOT NULL,
    -- peso del indicador de evaluacion
    `Weight` INT NOT NULL,
    -- puntaje del indicador de evaluacion
    `Score` INT NOT NULL,
    -- id del criterio de evaluacion -FK-
    `CriteriaId` INT NOT NULL,
    -- estado del indicador de evaluacion
    `Status` TINYINT NOT NULL,
    -- fecha de creacion del indicador de evaluacion
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- fecha de actualizacion del indicador de evaluacion
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- fecha de eliminacion del indicador de evaluacion
    `DeletedAt` TIMESTAMP NULL,
    PRIMARY KEY (`Id`),
    FOREIGN KEY (`CriteriaId`) REFERENCES `evaluationCriterias`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- tabla para el detalle de la evaluacion de cv
DROP TABLE IF EXISTS `cvEvaluationDetails`;
CREATE TABLE `cvEvaluationDetails`(
    -- id del detalle de la evaluacion
    `Id` INT NOT NULL AUTO_INCREMENT,
    -- puntaje del detalle de la evaluacion
    `Score` INT NOT NULL,
    -- observaciones del detalle de la evaluacion
    `Observations` VARCHAR(100) NOT NULL,
    -- fecha de la evaluacion
    `Date` DATE NOT NULL,
    -- id de la evaluacion -FK-
    `EvaluationId` INT NOT NULL,
    -- id del usuario que evalua
    `UserId` INT NOT NULL,
    -- id del postulante -FK-
    `PostulantId` INT NOT NULL,
    -- id del indicador de evaluacion -FK-
    `IndicatorId` INT NOT NULL,
    -- estado del detalle de la evaluacion
    `Status` TINYINT NOT NULL,
    -- fecha de creacion del detalle de la evaluacion
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- fecha de actualizacion del detalle de la evaluacion
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- fecha de eliminacion del detalle de la evaluacion
    `DeletedAt` TIMESTAMP NULL,
    PRIMARY KEY (`Id`),
    FOREIGN KEY (`IndicatorId`) REFERENCES `evaluationIndicators`(`Id`),
    -- FOREIGN KEY (`UserId`) REFERENCES `users`(`Id`),
    FOREIGN KEY (`PostulantId`) REFERENCES `postulants`(`Id`),
    FOREIGN KEY (`EvaluationId`) REFERENCES `cvEvaluations`(`Id`)


) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

