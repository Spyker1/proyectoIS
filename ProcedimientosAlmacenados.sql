/*_____________________________PROCEDIMIENTOS ALMACENADOS USUARIOS_____________________________*/
GO
CREATE OR ALTER PROCEDURE CONTRASE�A (@FECHA_ALTA_US DATETIME,@CORREO_US VARCHAR(100), @CONTRASE�A_US VARCHAR(100), @ACTIVO_US BIT, @PUESTO VARCHAR(100),@DIRECCION VARCHAR(600),@TELEFONO VARCHAR(600),@RFC VARCHAR(600), @NOMBRE_US VARCHAR(600))
AS
    DECLARE @CONTRASE�A_REPETIDA INT
    SET @CONTRASE�A_REPETIDA = (SELECT COUNT (CONTRASE�A_US) FROM USUARIO WHERE CONTRASE�A_US = @CONTRASE�A_US)

    DECLARE @CORREO_REPETIDO INT
    SET @CORREO_REPETIDO = (SELECT COUNT (CORREO_US) FROM USUARIO WHERE CORREO_US = @CONTRASE�A_US)

    IF @CONTRASE�A_REPETIDA > 0 OR @CORREO_REPETIDO > 0 
        BEGIN
            SELECT 'REPETIDO' AS RESULTADO
            RETURN
        END
    ELSE
        BEGIN
            INSERT INTO USUARIO(FECHA_ALTA_US,CORREO_US, CONTRASE�A_US, ACTIVO_US, PUESTO,DIRECCION_US,TELEFONO,RFC, NOMBRE_US) VALUES (@FECHA_ALTA_US,@CORREO_US ,@CONTRASE�A_US, @ACTIVO_US, @PUESTO,@DIRECCION,@TELEFONO,@RFC, @NOMBRE_US)
            SELECT 'BIEN' AS RESULTADO
            RETURN
        END
GO

/*_______________________________________PROCEDIMIENTO ALMACENADO PARA AGREGAR AL CARRITO DESDE EL INICIO____________________*/
GO
CREATE OR ALTER PROCEDURE BUSCAR_PRODUCTO (@ID_CLI INT, @ID_PRO INT) 
AS
/*VARIABLES*/
DECLARE @PRODUCTO_CARRITO INT
SET @PRODUCTO_CARRITO= (SELECT CANT_PRO FROM CARRITO WHERE  ID_CLI= @ID_CLI AND  ID_PRO=@ID_PRO)
    IF @PRODUCTO_CARRITO > 0 AND @PRODUCTO_CARRITO<(SELECT CANT_PRO FROM PRODUCTOS WHERE ID_PRO=@ID_PRO)
    BEGIN
        UPDATE CARRITO SET CANT_PRO=CANT_PRO+1,PAGO_TOT_PRODUCTOS=PAGO_TOT_PRODUCTOS+(SELECT PRECIO_PRO FROM PRODUCTOS WHERE ID_PRO=@ID_PRO) WHERE ID_CLI=@ID_CLI AND ID_PRO=@ID_PRO
        SELECT 'OK' AS MENSAJE
	END
	ELSE IF(@PRODUCTO_CARRITO>=(SELECT CANT_PRO FROM PRODUCTOS WHERE ID_PRO=@ID_PRO))
	BEGIN	
		SELECT 'INS' AS MENSAJE
	END	
    ELSE 
    BEGIN
    INSERT INTO CARRITO (ID_CLI,ID_PRO ,PAGO_TOT ,CANT_PRO,PAGO_TOT_PRODUCTOS) VALUES (@ID_CLI, @ID_PRO, (SELECT PRECIO_PRO FROM PRODUCTOS WHERE ID_PRO=@ID_PRO), 1,(SELECT PRECIO_PRO FROM PRODUCTOS WHERE ID_PRO=@ID_PRO))
    SELECT 'OK' AS MENSAJE
	RETURN
END
GO
/*_____________________________PROCEDIMIENTO ALMACENADO PARA AGREGAR AL CARRITO DESDE LOS DETALLES______________________________*/
GO
CREATE OR ALTER PROCEDURE BUSCAR_PRODUCTO_PLANTILLA (@ID_CLI INT, @ID_PRO INT,@CANT_PRO INT) 
AS
/*VARIABLES*/
DECLARE @PRODUCTO_CARRITO INT
SET @PRODUCTO_CARRITO= (SELECT CANT_PRO FROM CARRITO WHERE  ID_CLI= @ID_CLI AND  ID_PRO=@ID_PRO )
    IF @PRODUCTO_CARRITO > 0  AND (@PRODUCTO_CARRITO+@CANT_PRO)<(SELECT CANT_PRO FROM PRODUCTOS WHERE ID_PRO=@ID_PRO)
    BEGIN
        UPDATE CARRITO SET CANT_PRO=CANT_PRO+@CANT_PRO,PAGO_TOT_PRODUCTOS=PAGO_TOT_PRODUCTOS+(@CANT_PRO*(SELECT PRECIO_PRO FROM PRODUCTOS WHERE ID_PRO=@ID_PRO)) WHERE ID_CLI=@ID_CLI AND ID_PRO=@ID_PRO
        SELECT 'OK' AS MENSAJE
        END
	ELSE IF(@PRODUCTO_CARRITO>=(SELECT CANT_PRO FROM PRODUCTOS WHERE ID_PRO=@ID_PRO)) OR ((@PRODUCTO_CARRITO+@CANT_PRO)>=(SELECT CANT_PRO FROM PRODUCTOS WHERE ID_PRO=@ID_PRO))
	BEGIN	
		SELECT 'INS' AS MENSAJE
	END	
    ELSE 
    BEGIN
    INSERT INTO CARRITO (ID_CLI,ID_PRO ,PAGO_TOT ,CANT_PRO,PAGO_TOT_PRODUCTOS) VALUES (@ID_CLI, @ID_PRO, (SELECT PRECIO_PRO FROM PRODUCTOS WHERE ID_PRO=@ID_PRO), @CANT_PRO,(SELECT (@CANT_PRO*(SELECT PRECIO_PRO FROM PRODUCTOS WHERE ID_PRO=@ID_PRO))))
	SELECT 'OK' AS MENSAJE
    RETURN
END
GO

/*_______________________________PROCEDIMIENTO ALMACENADO PARA VER EL CARRITO____________________________________________________*/
GO
CREATE OR ALTER PROCEDURE ACTUALIZAR_CARRITO(@ID_CLI INT)
AS
DECLARE @TODOS_CARRITO INT
SET @TODOS_CARRITO = (SELECT SUM(CANT_PRO) FROM CARRITO WHERE ID_CLI=@ID_CLI)
IF @TODOS_CARRITO > 0
BEGIN 
	SELECT PRODUCTOS.ID_PRO,PRODUCTOS.NOM_PRO,PRODUCTOS.PT_IMG,PRODUCTOS.PRECIO_PRO,PRODUCTOS.DESC_PRO,CARRITO.PAGO_TOT,CARRITO.CANT_PRO,(SELECT SUM(PAGO_TOT*CANT_PRO)   FROM CARRITO WHERE ID_CLI=@ID_CLI) AS PAGO_TOT_CARRITO,CARRITO.PAGO_TOT_PRODUCTOS FROM  PRODUCTOS INNER JOIN CARRITO ON PRODUCTOS.ID_PRO=CARRITO.ID_PRO WHERE ID_CLI=@ID_CLI
	RETURN
	END
GO

/*_______________________________PROCEDIMIENTO ALMACENADO PARA BUSCAR QUE EL CORREO EXISTA__________________________________________*/
GO
CREATE OR ALTER PROCEDURE BUSCAR_CORREO (@ACTIVO_CLI BIT, @NOMBRE_CLI VARCHAR(600),@CORREO_CLI VARCHAR(600), @CONTRASE�A_CLI VARCHAR(600), @CODIGO_VERIF_CLI INT,  @DOBLE_AUT_CLI BIT , @FECHA_ALTA_CLI VARCHAR(600)) 
AS
/*VARIABLES*/
DECLARE @FECHA DATETIME
SET @FECHA = (SELECT dbo.OBTENER_FECHA())
DECLARE @CORREO_EXISTENTE VARCHAR(600)
SET @CORREO_EXISTENTE= (SELECT COUNT(CORREO_CLI) FROM CLIENTE WHERE CORREO_CLI = @CORREO_CLI AND ACTIVO_CLI=1)

    IF @CORREO_EXISTENTE > 0  
    BEGIN
        SELECT 'EXISTE' AS RESULTADO
    RETURN 
    END
    ELSE
    BEGIN
    
        INSERT INTO CLIENTE (ACTIVO_CLI,NOMBRE_CLI,CORREO_CLI ,CONTRASE�A_CLI ,CODIGO_VERIF_CLI ,DOBLE_AUT_CLI, FECHA_ALTA_CLI) VALUES (@ACTIVO_CLI, @NOMBRE_CLI, @CORREO_CLI, @CONTRASE�A_CLI, @CODIGO_VERIF_CLI, @DOBLE_AUT_CLI, @FECHA_ALTA_CLI)
    
        SELECT 'OK' AS RESULTADO
    
    RETURN
    END
GO

/*_________________________________PROCEDIMIENTO ALMACENADO PARA AGREGAR UN CODIGO DE VERIFICACION_______________________________*/
GO
CREATE OR ALTER PROCEDURE INSERTAR_CODIGO_VERIF (@CORREO_CLI VARCHAR(600), @CONTRASE�A_CLI VARCHAR(600),  @CODIGO_VERIF_CLI INT)
AS
BEGIN
/*Varibles*/    
        UPDATE CLIENTE
        SET CODIGO_VERIF_CLI = @CODIGO_VERIF_CLI
        WHERE CORREO_CLI = @CORREO_CLI AND CONTRASE�A_CLI = @CONTRASE�A_CLI
END
GO

/*___________________________________PROCEDIMIENTO ALMACENADO PARA VERFICAR QUE EL CODIGO DE VERIFICACION SEA CORRECTO__________________*/
GO
CREATE OR ALTER PROCEDURE VERIFICAR_CODIGO_REC (@CORREO_CLI VARCHAR(600), @CODIGO_VERIF_CLI INT)
AS
		DECLARE @CLIENTE INT
		SET @CLIENTE = (SELECT COUNT (*) FROM CLIENTE WHERE CORREO_CLI = @CORREO_CLI AND CODIGO_VERIF_CLI = @CODIGO_VERIF_CLI)
		
		IF  @CLIENTE > 0
			BEGIN
				UPDATE CLIENTE SET CODIGO_VERIF_CLI = 0 WHERE CORREO_CLI = @CORREO_CLI
				SELECT 'CORRECTO' AS RESULTADO
			RETURN 
		END
		ELSE
			BEGIN
				SELECT 'INCORRECTO' AS RESULTADO	
			RETURN
		END
GO

/*_____________________________PROCEDIMIENTO ALMACENADO PARA ELIMINAR EL CODIGO DE VERIFICACION UNA VEZ QUE LO INGRESE_________________*/
GO
CREATE OR ALTER PROCEDURE ELIM_CODIGO_VERIF (@ID_CLI INT)
AS
BEGIN
/*Varibles*/    
        UPDATE CLIENTE
        SET CODIGO_VERIF_CLI = 0
        WHERE ID_CLI = @ID_CLI AND
        ACTIVO_CLI = 1
END
GO

/*_________________________________PROCEDIMIENTO ALMACENADO PARA AGREGAR EL CODIGO DE VERIFICACION AL USUARIO (CMS)________________________*/
GO
CREATE OR ALTER PROCEDURE INSERTAR_CODIGO (@CORREO_US VARCHAR(600), @CODIGO_US INT)
AS
BEGIN
		UPDATE USUARIO
        SET CODIGO_US = @CODIGO_US
        WHERE CORREO_US = @CORREO_US
END
GO

/*_________________________________PROCEDIMIENTO ALMACENADO PARA VERIFICAR QUE EL CODIGO DE VERIFICACION DEL USUARIO SEA CORRECTO (CMS)________*/
GO
CREATE OR ALTER PROCEDURE VERIFICAR_CODIGO_REC_US (@CORREO_US VARCHAR(600), @CODIGO_US INT)
AS
		DECLARE @USUARIO INT
		SET @USUARIO = (SELECT COUNT (*) FROM USUARIO WHERE CORREO_US = @CORREO_US AND CODIGO_US = @CODIGO_US)
		
		IF  @USUARIO > 0
			BEGIN
				UPDATE USUARIO SET CODIGO_US = 0 WHERE CORREO_US = @CORREO_US
				SELECT 'CORRECTO' AS RESULTADO
			RETURN 
		END
		ELSE
			BEGIN
				SELECT 'INCORRECTO' AS RESULTADO	
			RETURN
		END
GO

/*_______________________________PROCEDIMIENTO ALMACENADO PARA REALIZAR UN NUEVO PEDIDO_________________________________________________*/
GO
CREATE OR ALTER PROCEDURE AGREGAR_PEDIDOS(@PEDIDO_ID INT,@PAGO_TOT DECIMAL(10,2),@DIRECCION VARCHAR(30),@ESTADO VARCHAR(30),@CIUDAD VARCHAR(100),@COD_POSTAL VARCHAR(30),@TELEFONO VARCHAR(100),@ID_CLI INT,@FECHA_PED VARCHAR(600))
AS
BEGIN 

    INSERT INTO DETALLES_PEDIDOS (PEDIDO_ID,ID_PRO,CANTIDAD_PRO,PRECIO_UNITARIO,DIRECCION,ESTADO,CIUDAD,COD_POSTAL,TELEFONO) SELECT @PEDIDO_ID,ID_PRO,CANT_PRO,PAGO_TOT,@DIRECCION,@ESTADO,@CIUDAD,@COD_POSTAL,@TELEFONO FROM CARRITO WHERE ID_CLI=@ID_CLI;

    INSERT INTO PEDIDOS(CLIENTE_ID,FECHA_PED,ESTADO_PED,PAGO_TOT) VALUES (@ID_CLI,@FECHA_PED,'En proceso',@PAGO_TOT);

    UPDATE PRODUCTOS SET PRODUCTOS.CANT_PRO=PRODUCTOS.CANT_PRO-CARRITO.CANT_PRO FROM CARRITO,PRODUCTOS WHERE CARRITO.ID_PRO=PRODUCTOS.ID_PRO;

    UPDATE PRODUCTOS SET ACT_PRO=0 WHERE CANT_PRO=0;
    
    DELETE FROM CARRITO WHERE ID_CLI=@ID_CLI;

    RETURN
    END
GO

/*___________________________________PROCEDIMIENTO ALMACENADO PARA OBTENER LOS DATOS DEL PEDIDO PARA EL CORREO_______________________________________*/
GO
CREATE OR ALTER PROCEDURE PEDIDO_HECHO (@PEDIDO_ID INT)
AS
BEGIN
SELECT PRODUCTOS.ID_PRO,PRODUCTOS.PT_IMG,PEDIDOS.ID_PED,PRODUCTOS.NOM_PRO,CLIENTE.NOMBRE_CLI,CLIENTE.CORREO_CLI , DETALLES_PEDIDOS.PRECIO_UNITARIO,  DETALLES_PEDIDOS.CANTIDAD_PRO ,PEDIDOS.PAGO_TOT ,DETALLES_PEDIDOS.DIRECCION, DETALLES_PEDIDOS.ESTADO,DETALLES_PEDIDOS.CIUDAD, DETALLES_PEDIDOS.COD_POSTAL FROM PEDIDOS INNER JOIN DETALLES_PEDIDOS ON PEDIDOS.ID_PED=DETALLES_PEDIDOS.PEDIDO_ID INNER JOIN PRODUCTOS ON PRODUCTOS.ID_PRO=DETALLES_PEDIDOS.ID_PRO  INNER JOIN CLIENTE ON PEDIDOS.CLIENTE_ID=CLIENTE.ID_CLI WHERE PEDIDOS.ID_PED=@PEDIDO_ID AND DETALLES_PEDIDOS.PEDIDO_ID=@PEDIDO_ID
    RETURN 
    END
GO

/*___________________________________PROCEDIMIENTO ALMACENADO PARA OBTENER LOS PRODUCTOS QUE SE VENDIERON EN ESE PEDIDO________________________________*/
GO
	CREATE OR ALTER PROCEDURE PRODUCTOS_PEDIDO (@PEDIDO_ID INT)
AS 
	BEGIN 

		SELECT PEDIDOS.PEDIDO_ID, PEDIDOS.ID_PRO, PRODUCTOS.NOM_PRO FROM PEDIDOS INNER JOIN PRODUCTOS ON PEDIDOS.ID_PRO = PRODUCTOS.ID_PRO WHERE PEDIDOS.PEDIDO_ID = @PEDIDO_ID 

		RETURN
	END
GO

/*____________________________________PROCEDIMIENTO ALMACENADO PARA OBTENER LOS DETALLES DEL PEDIDO EN EL CMS_________________________________________________*/
GO
CREATE OR ALTER PROCEDURE DETALLES_PEDIDO(@ID_PED INT)
AS
BEGIN 
	SELECT  PRODUCTOS.ID_PRO, PRODUCTOS.PT_IMG,PEDIDOS.PAGO_TOT,DETALLES_PEDIDOS.COD_POSTAL,DETALLES_PEDIDOS.DIRECCION,DETALLES_PEDIDOS.ESTADO,DETALLES_PEDIDOS.CIUDAD,DETALLES_PEDIDOS.TELEFONO,DETALLES_PEDIDOS.CANTIDAD_PRO,DETALLES_PEDIDOS.PRECIO_UNITARIO,PRODUCTOS.NOM_PRO FROM DETALLES_PEDIDOS INNER JOIN PRODUCTOS ON DETALLES_PEDIDOS.ID_PRO=PRODUCTOS.ID_PRO INNER JOIN PEDIDOS ON DETALLES_PEDIDOS.PEDIDO_ID=PEDIDOS.ID_PED  WHERE DETALLES_PEDIDOS.PEDIDO_ID=@ID_PED
RETURN 
END
GO

/*_________________________PROCEDIMIENTO ALMACENADO PARA LAS GRAFICAS DE LOS DIAS DE LA SEMANA_______________________________________________________*/
GO
 CREATE OR ALTER PROCEDURE CICLO(@FECHA DATETIME )
AS 
BEGIN
CREATE TABLE FECHA_TEMP(
    FECHA DATE,
    CANTIDAD INT,
    VENTAS_TOTALES DECIMAL(10,2)
);
DECLARE @contador INT = 1;

DECLARE @FECHA_BUSQUEDA DATE=(SELECT CONVERT (DATE,@FECHA));
WHILE @contador < 8
BEGIN
    DECLARE @FECHA_CONVERTIDA DATE=(SELECT DATEADD(DAY, @contador - DATEPART(WEEKDAY, @FECHA_BUSQUEDA), CAST(@FECHA_BUSQUEDA AS DATE)))
    DECLARE @CANTIDAD INT=(SELECT COUNT(ID_PED) FROM PEDIDOS WHERE CONVERT(date, FECHA_PED)=@FECHA_CONVERTIDA);
    DECLARE @VENTAS_TOTALES DECIMAL(10,2)=(SELECT SUM(PAGO_TOT) FROM PEDIDOS WHERE CONVERT(date, FECHA_PED)=@FECHA_CONVERTIDA);
    INSERT INTO FECHA_TEMP(FECHA,CANTIDAD,VENTAS_TOTALES) VALUES(@FECHA_CONVERTIDA,@CANTIDAD,@VENTAS_TOTALES)
    SET @contador = @contador + 1;
END
    SELECT * FROM FECHA_TEMP;
    DROP TABLE FECHA_TEMP;  
END
GO

/*________________________PROCEDIMIENTO ALMACENADO PARA LAS GRAFICAS POR A�O_______________________________________________________________________________*/
GO
 CREATE OR ALTER PROCEDURE CICLO_A�O(@FECHA DATETIME )
AS 
BEGIN
CREATE TABLE FECHA_A�O_TEMP(
	MES VARCHAR(600),
	CANTIDAD INT,
	VENTAS_TOTALES DECIMAL(10,2)
)

DECLARE @contador INT = 0;
WHILE @contador < 12
BEGIN
	DECLARE @FECHA_MES VARCHAR(600)=(SELECT DATENAME (MONTH, DATEADD(MONTH, MONTH('2023/12/12') + @contador, '1900-01-01')));
	DECLARE @CANTIDAD INT=(SELECT COUNT(ID_PED) FROM PEDIDOS WHERE (DATENAME (MONTH, DATEADD(MONTH, MONTH(FECHA_PED)-1, '1900-01-01'))=@FECHA_MES));
	DECLARE @VENTAS_TOTALES DECIMAL(10,2)=(SELECT SUM(PAGO_TOT) FROM PEDIDOS WHERE DATENAME (MONTH, DATEADD(MONTH, MONTH(FECHA_PED)-1, '1900-01-01'))=@FECHA_MES);
    INSERT INTO FECHA_A�O_TEMP(MES,CANTIDAD,VENTAS_TOTALES) VALUES(@FECHA_MES,@CANTIDAD,@VENTAS_TOTALES);
    SET @contador = @contador + 1;
END
	SELECT * FROM FECHA_A�O_TEMP;
	DROP TABLE FECHA_A�O_TEMP;
END
GO

/*_________________________PROCEDIMIENTO ALMACENADO PARA LAS GRAFICAS POR MES_________________________________________________________________________*/
GO
CREATE OR ALTER PROCEDURE CICLO_MES(@FECHA DATETIME )
AS 
BEGIN
CREATE TABLE FECHA_TEMP_MES(
	FECHA DATE,
	CANTIDAD INT,
	VENTAS_TOTALES DECIMAL(10,2)
);
DECLARE @contador INT = 1;

 

DECLARE @FECHA_BUSQUEDA DATE=(SELECT CONVERT (DATE,@FECHA));
WHILE @contador < 53
BEGIN
	DECLARE @FECHA_CONVERTIDA DATE=(SELECT DATEADD(WEEK, @contador - DATEPART(WEEK, @FECHA_BUSQUEDA), CAST(@FECHA_BUSQUEDA AS DATE)))
	DECLARE @CANTIDAD INT=(SELECT COUNT(ID_PED) FROM PEDIDOS WHERE DATEADD (WEEK, DATEPART(WEEK,(FECHA_PED)-1),CAST(FECHA_PED AS DATE))=@FECHA_CONVERTIDA);
	DECLARE @VENTAS_TOTALES DECIMAL(10,2)=(SELECT SUM(PAGO_TOT) FROM PEDIDOS WHERE DATEADD (WEEK, DATEPART(WEEK,(FECHA_PED)-1),CAST(FECHA_PED AS DATE))=@FECHA_CONVERTIDA);
    INSERT INTO FECHA_TEMP_MES(FECHA,CANTIDAD,VENTAS_TOTALES) VALUES(@FECHA_CONVERTIDA,@CANTIDAD,@VENTAS_TOTALES)
    SET @contador = @contador + 1;
END
	SELECT * FROM FECHA_TEMP_MES;
	DROP TABLE FECHA_TEMP_MES;	
END
GO

/*_____________________________Funcion para obtener la fecha___________________________________*/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE   FUNCTION [dbo].[OBTENER_FECHA] ()
RETURNS DATETIME
AS
BEGIN
    --RETURN GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'Central Standard Time'
    --RETURN GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'Pacific Standard Time'
    RETURN CAST(CAST(GETUTCDATE() AS DATETIMEOFFSET) AT TIME ZONE 'CENTRAL STANDARD TIME (MEXICO)' AS DATETIME)
END
GO

